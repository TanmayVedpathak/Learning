"use client";

import { useActionState } from "react";

import Image from "next/image";
import Link from "next/link";

import { auth, type AuthFormState } from "@/actions/auth-actions";

type AuthMode = "login" | "signup";

const initialState: AuthFormState = {
  message: "",
};

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [formState, formAction, isPending] = useActionState(auth.bind(null, mode), initialState);

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src="/images/auth-icon.jpg" alt="A lock icon" width={100} height={100} />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" defaultValue={formState.enteredValues?.email || ""} />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>

      {formState.message && <p>{formState.message}</p>}

      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <ul id="form-errors">
          {Object.entries(formState.errors).map(([key, message]) => (
            <li key={key}>{message}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit" disabled={isPending}>
          {isPending ? (mode === "login" ? "Logging" : "Creating account...") : mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && <Link href="/?mode=signup">Create an account.</Link>}

        {mode === "signup" && <Link href="/?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}
