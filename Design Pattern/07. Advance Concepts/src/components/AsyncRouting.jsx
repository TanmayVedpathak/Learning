import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoute } from "./main";
import { booksRoute } from "./books";
import Club from "./club";
import Nav from "./nav";

const router = createBrowserRouter([
  {
    element: <Nav />,
    children: [
      { index: true, ...mainRoute },
      { path: "/books", ...booksRoute },
      { path: "/club", element: <Club /> },
    ],
  },
]);

const AsyncRouting = () => {
  return <RouterProvider router={router} />;
};

export default AsyncRouting;
