"use client";

import { useOptimistic } from "react";

import Image, { type ImageLoaderProps } from "next/image";

import { formatDate } from "@/lib/format";

import type { Post as PostType } from "@/types";

import LikeButton from "./LikeIcon";

import { togglePostLikeStatus } from "@/actions/actions";

type PostProps = {
  post: PostType;
  updatePost: (postId: number) => Promise<void>;
};

const imageLoader = (config: ImageLoaderProps): string => {
  const urlStart = config.src.split("upload/")[0];
  const urlEnd = config.src.split("upload/")[1];
  const transformation = `w_200,h_150,q_${config.quality}`;
  return `${urlStart}upload/${transformation}/${urlEnd}`;
};

function Post({ post, updatePost }: PostProps) {
  return (
    <article className="post">
      <div className="post-image">
        <Image loader={imageLoader} src={post.image} alt={post.title} fill quality={50} loading="eager" />
      </div>

      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on {formatDate(post.createdAt)}
            </p>
          </div>

          <form action={updatePost.bind(null, post.id)} className={post.isLiked ? "liked" : ""}>
            <LikeButton />
          </form>
        </header>

        <p>{post.content}</p>
      </div>
    </article>
  );
}

type PostsProps = {
  posts: PostType[];
};

export default function Posts({ posts }: PostsProps) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts: PostType[], updatePostId: number) => {
    const updatedPostIndex = prevPosts.findIndex((post) => post.id === updatePostId);

    if (updatedPostIndex === -1) {
      return prevPosts;
    }

    const updatedPost = { ...prevPosts[updatedPostIndex] };

    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = updatedPost.isLiked ? 0 : 1;

    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;

    return newPosts;
  });

  async function updatePost(postId: number): Promise<void> {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} updatePost={updatePost} />
        </li>
      ))}
    </ul>
  );
}
