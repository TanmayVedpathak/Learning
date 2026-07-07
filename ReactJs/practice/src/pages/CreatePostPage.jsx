import { Form, useActionData } from "react-router-dom";

const CreatePostPage = () => {
  const actionData = useActionData();

  return (
    <div>
      <h2>Create Post</h2>

      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}

      <Form method="post">
        <div>
          <input name="title" placeholder="Title" />
        </div>

        <div>
          <textarea name="body" placeholder="Body" />
        </div>

        <button type="submit">Create</button>
      </Form>
    </div>
  );
};

export default CreatePostPage;
