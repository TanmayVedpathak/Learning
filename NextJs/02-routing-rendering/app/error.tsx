"use client";
import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div id="error">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
