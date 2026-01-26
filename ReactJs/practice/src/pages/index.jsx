import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Form = lazy(() => import("./Form"));
const HookForm = lazy(() => import("./HookForm"));
const VirtualList = lazy(() => import("./VirtualList"));

const pageList = [
  {
    title: "Home",
    path: "/",
    component: Home,
  },
  {
    title: "Form",
    path: "/form",
    component: Form,
  },
  {
    title: "Hook Form",
    path: "/hook-form",
    component: HookForm,
  },
  {
    title: "Virtual List",
    path: "/virtual-list",
    component: VirtualList,
  },
];

export default pageList;
