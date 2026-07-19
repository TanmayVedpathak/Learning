import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">404</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
