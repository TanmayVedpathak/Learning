import { createHash } from "node:crypto";

import { getDb } from "@/lib/db";

import "server-only";

// Shared across app instances. Expired buckets are removed by MongoDB's TTL index.
export async function allowAuthAttempt(email: string, kind: "login" | "signup") {
    const windowMs = 15 * 60 * 1000;
    const bucket = Math.floor(Date.now() / windowMs);
    const key = createHash("sha256").update(`${kind}:${email}:${bucket}`).digest("hex");
    const collection = (await getDb()).collection<{
        _id: string;
        count: number;
        expiresAt: Date;
    }>("authAttempts");
    const result = await collection.findOneAndUpdate(
        { _id: key },
        {
            $inc: { count: 1 },
            $setOnInsert: { expiresAt: new Date((bucket + 1) * windowMs) },
        },
        { upsert: true, returnDocument: "after" },
    );
    return (result?.count ?? Infinity) <= (kind === "login" ? 10 : 5);
}
