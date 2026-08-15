"use client";

import { useActionState } from "react";

import { createPost, CreatePostState } from "@/actions/actions";

const initialState: CreatePostState = {
  message: "",
};

export default function NewPostForm() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  return (
    <>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image File</label>
          <input type="file" accept="image/png, image/jpeg" id="image" name="image" />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        <p className="form-actions">
          {isPending ? (
            <>
              <span>Creating Post</span>
            </>
          ) : (
            <>
              <button type="reset">Reset</button>
              <button>Create Post</button>
            </>
          )}
        </p>
        {state.message && <p>{state.message}</p>}
      </form>
    </>
  );
}
