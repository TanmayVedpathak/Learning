import { Form, Link, useActionData, useLoaderData } from "react-router-dom";

const PostDetailsPage = () => {
  const post = useLoaderData();
  const actionData = useActionData();

  return (
    <div>
      <Link to="/posts">Back to Posts</Link>

      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <hr />

      <h3>Update Post</h3>

      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}

      <Form method="patch">
        <div>
          <input name="title" defaultValue={post.title} placeholder="Title" />
        </div>

        <div>
          <textarea name="body" defaultValue={post.body} placeholder="Body" />
        </div>

        <button type="submit">Update</button>
      </Form>

      <Form
        method="delete"
        action={`/posts/${post.id}/delete`}
        onSubmit={(e) => {
          const confirmed = confirm("Are you sure?");
          if (!confirmed) e.preventDefault();
        }}
      >
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};

export default PostDetailsPage;
