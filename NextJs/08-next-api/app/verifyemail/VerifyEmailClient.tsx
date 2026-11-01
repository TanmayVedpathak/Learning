"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import axios from "axios";

import { getApiErrorMessage } from "@/utils/api-error";

import { type SuccessResponse,successResponseSchema } from "@/schemas/auth";

type VerificationState =
    | { token: string; status: "success" }
    | { token: string; status: "error"; message: string };

export default function VerifyEmailClient() {
    const token = useSearchParams().get("token");
    const [state, setState] = useState<VerificationState | null>(null);
    const inFlight = useRef<{ token: string; promise: Promise<SuccessResponse> } | null>(null);

    useEffect(() => {
        if (!token) return;
        let active = true;
        // Reuse the request when Strict Mode replays the effect in development.
        if (inFlight.current?.token !== token) {
            inFlight.current = {
                token,
                promise: axios.post<unknown>("/api/users/verifyemail", { token })
                    .then(({ data }) => successResponseSchema.parse(data)),
            };
        }
        void inFlight.current.promise.then(
            () => { if (active) setState({ token, status: "success" }); },
            (error: unknown) => {
                if (active) setState({ token, status: "error", message: getApiErrorMessage(error) });
            },
        );
        return () => { active = false; };
    }, [token]);

    const currentState = state?.token === token ? state : null;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <h1 className="text-4xl">Verify Email</h1>
            {!token && <p role="alert">Verification token not found. Open the link from your email.</p>}
            {token && !currentState && <p role="status">Verifying email...</p>}
            {currentState?.status === "success" && (
                <div role="status">
                    <h2 className="text-2xl">Email verified successfully</h2>
                    <Link href="/sign-in">Continue to sign in</Link>
                </div>
            )}
            {currentState?.status === "error" && <p role="alert">{currentState.message}</p>}
        </div>
    );
}
