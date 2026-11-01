import type { Metadata } from "next";

import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = { title: "Sign in | Nextspace" };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
    const params = await searchParams;

    return <AuthPage mode="sign-in" error={typeof params.error === "string" ? params.error : undefined} registered={params.registered === "1"} />;
}
