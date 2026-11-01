import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { compare } from "bcryptjs";

import { configuredProviders } from "@/lib/auth-config";
import { getUsers } from "@/lib/db";
import { allowAuthAttempt } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

const oauth = configuredProviders();

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: { signIn: "/sign-in", error: "/sign-in" },
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    providers: [
        ...(oauth.google ? [Google] : []),
        ...(oauth.github ? [GitHub] : []),
        Credentials({
            credentials: { email: { type: "email" }, password: { type: "password" } },
            async authorize(credentials) {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;
                if (!(await allowAuthAttempt(email, "login"))) return null;

                const user = await (await getUsers()).findOne({ email });
                if (!user) return null;

                const valid = await compare(password, user.passwordHash);
                if (!valid) return null;

                return {
                    id: user._id.toHexString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, account }) {
            if (user) token.sub = user.id;
            if (account) token.provider = account.provider;
            return token;
        },
        session({ session, token }) {
            if (session.user && token.sub) session.user.id = token.sub;
            session.provider = typeof token.provider === "string" ? token.provider : undefined;
            return session;
        },
    },
});
