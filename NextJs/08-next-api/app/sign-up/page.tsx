"use client";

import { useState } from "react";

import Link from "next/link";

import axios from "axios";
import { toast } from "react-hot-toast";

import { getApiErrorMessage } from "@/utils/api-error";

import { type SignUpInput,signUpSchema, userResponseSchema } from "@/schemas/auth";

export default function SignUpPage() {
  const [registered, setRegistered] = useState(false);

  const [user, setUser] = useState<SignUpInput>({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const buttonDisabled =
    user.email.length === 0 ||
    user.password.length === 0 ||
    user.username.length === 0;

  const onSignup = async () => {
    try {
      setLoading(true);
      const input = signUpSchema.parse(user);
      const { data } = await axios.post<unknown>("/api/users/signup", input);
      const response = userResponseSchema.parse(data);

      toast.success(response.message);

      setRegistered(true);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1>Check your email</h1>
        <p role="status">Open the verification link in your email before signing in. The link expires in one hour.</p>
        <Link href="/sign-in">Continue to sign in</Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>

      <hr />

      <label htmlFor="username">Username</label>

      <input
        className="mb-4 rounded-lg border border-gray-300 p-2 text-white focus:border-gray-600 focus:outline-none"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) =>
          setUser((prevUser) => ({
            ...prevUser,
            username: e.target.value,
          }))
        }
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>

      <input
        className="mb-4 rounded-lg border border-gray-300 p-2 text-white focus:border-gray-600 focus:outline-none"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) =>
          setUser((prevUser) => ({
            ...prevUser,
            email: e.target.value,
          }))
        }
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>

      <input
        className="mb-4 rounded-lg border border-gray-300 p-2 text-white focus:border-gray-600 focus:outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser((prevUser) => ({
            ...prevUser,
            password: e.target.value,
          }))
        }
        placeholder="Password"
      />

      <button
        type="button"
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating account..."
          : buttonDisabled
            ? "No signup"
            : "Signup"}
      </button>

      <Link href="/sign-in">Visit login page</Link>
    </div>
  );
}