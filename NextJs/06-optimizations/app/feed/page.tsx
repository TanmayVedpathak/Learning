import Posts from "@/components/Posts";

import { getPosts } from "@/lib/posts";

export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts?.length || 0;

  return {
    title: `Browser all our ${numberOfPosts} posts`,
    description: "Browser all posts",
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
