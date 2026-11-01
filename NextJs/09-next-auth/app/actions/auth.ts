"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { hash } from "bcryptjs";
import { MongoServerError, ObjectId } from "mongodb";

import { configuredProviders } from "@/lib/auth-config";
import { getUsers } from "@/lib/db";
import { allowAuthAttempt } from "@/lib/rate-limit";
import { type AuthFormState, loginSchema, signupSchema } from "@/lib/validation";

import { signIn, signOut } from "@/auth";

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const parsed = loginSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

    try {
        await signIn("credentials", { ...parsed.data, redirectTo: "/dashboard" });
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                message: error.type === "CredentialsSignin" ? "Email or password is incorrect, or too many attempts. Please try again later." : "Sign-in is unavailable right now. Please try again shortly.",
            };
        }
        throw error; // Includes Next.js's successful redirect.
    }

    return {};
}

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const parsed = signupSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

    const { name, email, password } = parsed.data;

    try {
        if (!(await allowAuthAttempt(email, "signup"))) {
            return {
                message: "Too many sign-up attempts. Please try again in 15 minutes.",
            };
        }
        const users = await getUsers();
        const passwordHash = await hash(password, 12);
        await users.insertOne({
            _id: new ObjectId(),
            name,
            email,
            passwordHash,
            createdAt: new Date(),
        });
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return {
                message: "Unable to create an account with these details. Try signing in.",
            };
        }
        return {
            message: "Account creation is unavailable right now. Please try again shortly.",
        };
    }
    redirect("/sign-in?registered=1");
}

export async function socialLogin(formData: FormData) {
    const provider = formData.get("provider");

    if (provider !== "google" && provider !== "github") return;

    if (!configuredProviders()[provider]) redirect("/sign-in?error=Configuration");

    try {
        await signIn(provider, { redirectTo: "/dashboard" });
    } catch (error) {
        if (error instanceof AuthError) redirect("/sign-in?error=OAuthSignin");
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: "/sign-in" });
}
