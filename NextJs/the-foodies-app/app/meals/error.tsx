"use client";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p style={{ color: "red" }}>{error.message || "An unexpected error occurred."}</p>
    </main>
  );
}
