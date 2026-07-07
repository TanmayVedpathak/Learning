import { Form, Link, useLoaderData } from "react-router-dom";

const PostsPage = () => {
  const posts = useLoaderData();

  return (
    <div>
      <h2>Posts</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "16px" }}>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>

            <p>{post.body}</p>

            <Form
              method="delete"
              action={`/posts/${post.id}/delete`}
              onSubmit={(e) => {
                const confirmed = confirm("Are you sure you want to delete this post?");
                if (!confirmed) e.preventDefault();
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
