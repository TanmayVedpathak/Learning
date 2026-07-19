import Link from "next/link";

export default function BlogPage() {
  return (
    <div>
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Blog</h1>
      <ul>
        <li>
          <Link href="/blog/post/1">Post 1</Link>
        </li>
        <li>
          <Link href="/blog/post/2">Post 2</Link>
        </li>
        <li>
          <Link href="/blog/post/3">Post 3</Link>
        </li>
      </ul>
    </div>
  );
}
