import { redirect } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

export const postsLoader = async () => {
  const res = await fetch(`${BASE_URL}/posts`);

  if (!res.ok) {
    throw new Response("Failed to load posts", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return res.json();
};

export const postDetailsLoader = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Response("Post id is required", { status: 400 });
  }

  const res = await fetch(`${BASE_URL}/posts/${id}`);

  if (!res.ok) {
    throw new Response("Post not found", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return res.json();
};

export const createPostAction = async ({ request }) => {
  const formData = await request.formData();

  const title = String(formData.get("title") || "");
  const body = String(formData.get("body") || "");

  if (!title.trim()) {
    return { error: "Title is required" };
  }

  if (!body.trim()) {
    return { error: "Body is required" };
  }

  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Response("Failed to create post", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return redirect("/posts");
};

export const updatePostAction = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    throw new Response("Post id is required", { status: 400 });
  }

  const formData = await request.formData();

  const title = String(formData.get("title") || "");
  const body = String(formData.get("body") || "");

  if (!title.trim()) {
    return { error: "Title is required" };
  }

  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Response("Failed to update post", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return redirect(`/posts/${id}`);
};

export const deletePostAction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Response("Post id is required", { status: 400 });
  }

  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Response("Failed to delete post", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return redirect("/posts");
};
