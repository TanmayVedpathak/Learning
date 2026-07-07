import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";

import { Home, Form, HookForm, Callback, VirtualList, PostsPage, PostDetailsPage, CreatePostPage } from "./pages";
import { MainLayout, ErrorBoundary, Loader } from "./components";

import { postsLoader, postDetailsLoader, createPostAction, updatePostAction, deletePostAction } from "./api/postsApi";
import pageList from "./constants";

import "./App.css";

const InitialLoaderLayout = () => {
  return (
    <div>
      <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <h1>React App</h1>

        <nav style={{ display: "flex", gap: "12px" }}>
          {pageList.map((page) => (
            <NavLink key={page.title} to={page.path}>
              {page.title}
            </NavLink>
          ))}
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        <Loader />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "hook-form",
        element: <HookForm />,
      },
      {
        path: "useCallback-hook",
        element: <Callback />,
      },
      {
        path: "virtual-list",
        element: <VirtualList />,
      },
      {
        path: "posts",
        element: <PostsPage />,
        loader: postsLoader,
      },
      {
        path: "posts/create",
        element: <CreatePostPage />,
        action: createPostAction,
      },
      {
        path: "posts/:id",
        element: <PostDetailsPage />,
        loader: postDetailsLoader,
        action: updatePostAction,
      },
      {
        path: "posts/:id/delete",
        action: deletePostAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} fallbackElement={<InitialLoaderLayout />} />;
};

export default App;
