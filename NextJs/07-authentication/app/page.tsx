import { redirect } from "next/navigation";

import AuthForm from "@/components/AuthForm";

import { verifyAuth } from "@/lib/auth";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const result = await verifyAuth();

  if (result.user) {
    redirect("/training");
  }
  const filters = await searchParams;
  const mode = filters.mode || "signup";
  const formMode = mode === "login" ? "login" : "signup";

  return (
    <>
      <AuthForm key={formMode} mode={formMode} />
    </>
  );
}
