import { createBrowserRouter } from "react-router-dom";

// LAYOUT
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

// PAGES
import Dashboard from "@/pages/dashboard";
import Billboards from "@/pages/dashboard/billboards";
import Categories from "@/pages/dashboard/categories";
import Orders from "@/pages/dashboard/orders";
import Products from "@/pages/dashboard/products";
import Settings from "@/pages/dashboard/settings";

// AUTH PAGES
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/billboards",
        element: <Billboards />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/settings",
        element: <Settings />,
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

export default router;
