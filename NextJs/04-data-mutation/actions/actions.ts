"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";

import type { StorePostInput } from "@/types";

export type CreatePostState = {
  message: string;
};

const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${key} is required`);
  }

  return value;
};

const getFileValue = (formData: FormData, key: string): File => {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    throw new Error(`${key} is required`);
  }

  return value;
};

export async function createPost(prevState: CreatePostState, formData: FormData): Promise<CreatePostState> {
  try {
    const image = getFileValue(formData, "image");

    const imageUrl = await uploadImage(image);

    const post: StorePostInput = {
      imageUrl,
      title: getStringValue(formData, "title"),
      content: getStringValue(formData, "content"),
      userId: 1,
    };

    await storePost(post);
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong while creating the post.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
