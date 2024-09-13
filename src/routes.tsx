import { AuthLayout, MainLayout, NotFound } from "@/components";
import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "@/features/auth";
import { TaskList } from "@/features/task";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <TaskList />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
