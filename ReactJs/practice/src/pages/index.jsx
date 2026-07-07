import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Form = lazy(() => import("./Form"));
const HookForm = lazy(() => import("./HookForm"));
const Callback = lazy(() => import("./Callback"));
const VirtualList = lazy(() => import("./VirtualList"));
const CreatePostPage = lazy(() => import("./CreatePostPage"));
const PostDetailsPage = lazy(() => import("./PostDetailsPage"));
const PostsPage = lazy(() => import("./PostsPage"));

export { Home, Form, HookForm, Callback, VirtualList, CreatePostPage, PostDetailsPage, PostsPage };
