"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";

import { getApiErrorMessage } from "@/utils/api-error";

import { type SignInInput,signInSchema, successResponseSchema } from "@/schemas/auth";

export default function SignInPage() {
  const router = useRouter();
  const [user, setUser] = useState<SignInInput>({
    email: "",
    password: "",

  })
  const [loading, setLoading] = useState(false);

  const buttonDisabled =
    user.email.length === 0 ||
    user.password.length === 0;

  const onLogin = async () => {
    try {
      setLoading(true);
      const input = signInSchema.parse(user);
      const { data } = await axios.post<unknown>("/api/users/signin", input);
      const response = successResponseSchema.parse(data);
      toast.success(response.message);
      router.push("/profile");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        type="button"
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
      <Link href="/sign-up">Visit Signup page</Link>
    </div>
  )

}