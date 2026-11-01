import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { NextRequest } from "next/server.js";

const root = fileURLToPath(new URL("../", import.meta.url));

// Compile the real TypeScript modules in memory, replacing external services only.
function loadTs(filename, mocks = {}, cache = new Map()) {
    const absolute = path.resolve(root, filename);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const loadedModule = { exports: {} };
    cache.set(absolute, loadedModule);
    const nativeRequire = createRequire(absolute);
    const localRequire = (id) => {
        if (Object.hasOwn(mocks, id)) return mocks[id];
        if (id.startsWith("@/")) return loadTs(id.slice(2) + ".ts", mocks, cache);
        return nativeRequire(id);
    };
    const { outputText } = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    });
    new Function("require", "module", "exports", outputText)(localRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
}

function verificationRequest(body) {
    return new NextRequest("http://localhost/api/users/verifyemail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: typeof body === "string" ? body : JSON.stringify(body),
    });
}

test("verification page remains accessible with and without a session cookie", () => {
    const { proxy } = loadTs("proxy.ts");
    for (const cookie of ["", "token=existing-session"]) {
        const response = proxy(new NextRequest("http://localhost/verifyemail?token=abc", { headers: { cookie } }));
        assert.equal(response.headers.get("location"), null);
        assert.equal(response.headers.get("x-middleware-next"), "1");
    }
});

test("route guard uses the actual auth paths and protects nested profiles", () => {
    const { proxy, config } = loadTs("proxy.ts");
    assert.ok(config.matcher.includes("/profile/:path*"));
    assert.equal(proxy(new NextRequest("http://localhost/profile/123")).headers.get("location"), "http://localhost/sign-in");
    for (const pathname of ["/sign-in", "/sign-up"]) {
        assert.equal(proxy(new NextRequest("http://localhost" + pathname)).headers.get("location"), null);
        assert.equal(proxy(new NextRequest("http://localhost" + pathname, {
            headers: { cookie: "token=session" },
        })).headers.get("location"), "http://localhost/");
    }
});

test("missing, empty, non-string tokens and malformed JSON return 400 without database access", async () => {
    let databaseCalls = 0;
    const { POST } = loadTs("app/api/users/verifyemail/route.ts", {
        "@/dbConfig/dbConfig": { connectDB: async () => { databaseCalls++; } },
        "@/app/models/userModel": {},
    });
    for (const body of [{}, { token: "" }, { token: { $ne: null } }, "{broken"]) {
        const response = await POST(verificationRequest(body));
        assert.equal(response.status, 400);
        const data = await response.json();
        assert.equal(data.success, false);
        assert.equal(typeof data.error, "string");
    }
    assert.equal(databaseCalls, 0);
});

test("valid verification atomically marks the user verified and consumes the token", async () => {
    let connected = false;
    let consumed = false;
    const { POST } = loadTs("app/api/users/verifyemail/route.ts", {
        "@/dbConfig/dbConfig": { connectDB: async () => { connected = true; } },
        "@/app/models/userModel": {
            findOneAndUpdate: async (filter, update) => {
                assert.ok(connected);
                assert.equal(filter.verifyToken, "valid-token");
                assert.ok(filter.verifyTokenExpiry.$gt instanceof Date);
                assert.deepEqual(update, {
                    $set: { isVerified: true },
                    $unset: { verifyToken: "", verifyTokenExpiry: "" },
                });
                if (consumed) return null;
                consumed = true;
                return { isVerified: true };
            },
        },
    });
    const response = await POST(verificationRequest({ token: "valid-token" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true, message: "Email verified successfully" });
    assert.equal((await POST(verificationRequest({ token: "valid-token" }))).status, 400);
});

test("expired or unknown verification links return a useful 400 response", async () => {
    const { POST } = loadTs("app/api/users/verifyemail/route.ts", {
        "@/dbConfig/dbConfig": { connectDB: async () => {} },
        "@/app/models/userModel": { findOneAndUpdate: async () => null },
    });
    const response = await POST(verificationRequest({ token: "expired-token" }));
    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /invalid or has expired/);
});

test("response schemas reject malformed responses and strip private user fields", () => {
    const { successResponseSchema, userResponseSchema, signInSchema } = loadTs("schemas/auth.ts");
    assert.equal(successResponseSchema.safeParse({ success: "true", message: "ok" }).success, false);
    assert.equal(signInSchema.parse({ email: " User@Example.com ", password: "secret" }).email, "user@example.com");
    const response = userResponseSchema.parse({
        success: true,
        message: "ok",
        data: { _id: "123", username: "user", email: "user@example.com", isVerified: false, isAdmin: false, password: "secret", verifyToken: "private" },
    });
    assert.equal("password" in response.data, false);
    assert.equal("verifyToken" in response.data, false);
});

test("unverified users cannot sign in or receive a session cookie", async () => {
    const { POST } = loadTs("app/api/users/signin/route.ts", {
        "@/dbConfig/dbConfig": { connectDB: async () => {} },
        "@/app/models/userModel": { findOne: async () => ({ password: "hash", isVerified: false }) },
        bcryptjs: { compare: async () => true },
    });
    const response = await POST(verificationRequest({ email: "user@example.com", password: "secret" }));
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.match((await response.json()).error, /verify your email/);
});

test("mailer encodes verification tokens, uses a numeric SMTP port and propagates delivery errors", async () => {
    const previous = { DOMAIN: process.env.DOMAIN, SMTP_PORT: process.env.SMTP_PORT };
    process.env.DOMAIN = "http://localhost:3000";
    process.env.SMTP_PORT = "587";
    let mail;
    const { sendEmail } = loadTs("utils/mailer.ts", {
        bcryptjs: { hash: async () => "$2b$10$token/with+special?characters" },
        "@/app/models/userModel": { findByIdAndUpdate: async () => ({}) },
        nodemailer: { createTransport: (options) => {
            assert.equal(options.port, 587);
            return { sendMail: async (message) => {
                mail = message;
                throw new Error("SMTP delivery failed");
            } };
        } },
    });
    try {
        await assert.rejects(sendEmail({ email: "user@example.com", emailType: "VERIFY", userId: "123" }), /SMTP delivery failed/);
        const url = new URL(mail.text.split(": ").at(-1));
        assert.equal(url.pathname, "/verifyemail");
        assert.equal(url.searchParams.get("token"), "$2b$10$token/with+special?characters");
    } finally {
        for (const [key, value] of Object.entries(previous)) {
            if (value === undefined) delete process.env[key]; else process.env[key] = value;
        }
    }
});
