"use client";

import { useActionState, useState } from "react";

import Link from "next/link";

import { login, signup } from "@/app/actions/auth";

import type { AuthFormState } from "@/lib/validation";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
    const isSignup = mode === "sign-up";
    const [state, action, pending] = useActionState<AuthFormState, FormData>(isSignup ? signup : login, {});
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const passwordRules = [
        { label: "8 or more characters", met: password.length >= 8 },
        { label: "At least one letter", met: /[a-zA-Z]/.test(password) },
        { label: "At least one number", met: /[0-9]/.test(password) },
        {
            label: "No more than 72 bytes",
            met: password.length > 0 && new TextEncoder().encode(password).length <= 72,
        },
    ];

    function errors(field: keyof NonNullable<AuthFormState["errors"]>) {
        return state.errors?.[field]?.length ? (
            <p className="field-error" id={`${field}-error`}>
                {state.errors[field]?.[0]}
            </p>
        ) : null;
    }

    return (
        <form action={action} className="credential-form" aria-busy={pending}>
            <fieldset disabled={pending}>
                {isSignup && (
                    <div className="field">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            placeholder="Alex Morgan"
                            required
                            minLength={2}
                            maxLength={60}
                            aria-invalid={Boolean(state.errors?.name)}
                            aria-describedby={state.errors?.name ? "name-error" : undefined}
                        />
                        {errors("name")}
                    </div>
                )}
                <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        maxLength={254}
                        aria-invalid={Boolean(state.errors?.email)}
                        aria-describedby={state.errors?.email ? "email-error" : undefined}
                    />
                    {errors("email")}
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete={isSignup ? "new-password" : "current-password"}
                            placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                            required
                            minLength={isSignup ? 8 : 1}
                            maxLength={72}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            aria-invalid={Boolean(state.errors?.password)}
                            aria-describedby={isSignup ? `password-help${state.errors?.password ? " password-error" : ""}` : state.errors?.password ? "password-error" : undefined}
                        />
                        <button className="visibility-button" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {isSignup && (
                        <ul className="password-rules" id="password-help">
                            {passwordRules.map((rule) => (
                                <li key={rule.label} data-met={rule.met}>
                                    <span aria-hidden="true">{rule.met ? "✓" : "○"}</span>
                                    <span className="sr-only">{rule.met ? "Met: " : "Required: "}</span>
                                    {rule.label}
                                </li>
                            ))}
                        </ul>
                    )}
                    {errors("password")}
                </div>
                {isSignup && (
                    <div className="field">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            required
                            maxLength={72}
                            aria-invalid={Boolean(state.errors?.confirmPassword)}
                            aria-describedby={state.errors?.confirmPassword ? "confirmPassword-error" : undefined}
                        />
                        {errors("confirmPassword")}
                    </div>
                )}
                <div aria-live="polite" aria-atomic="true">
                    {state.message && (
                        <p className="notice error" role="alert">
                            {state.message}
                        </p>
                    )}
                </div>
                <button className="primary-button" type="submit" disabled={pending}>
                    {pending ? (isSignup ? "Creating account…" : "Signing in…") : isSignup ? "Create account" : "Sign in"}
                    <span aria-hidden="true">→</span>
                </button>
            </fieldset>
            <p className="switch-mode">
                {isSignup ? "Already have an account?" : "New here?"} <Link href={isSignup ? "/sign-in" : "/sign-up"}>{isSignup ? "Sign in" : "Create an account"}</Link>
            </p>
        </form>
    );
}
