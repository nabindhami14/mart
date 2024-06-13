import { createBrowserRouter } from "react-router-dom";

// CUSTOMER PAGE
import MainLayout from "@/layouts/main-layout";
import CategoriesPage from "@/pages/customer/category/categories";
import HomePage from "@/pages/customer/home";
import ProductsPage from "@/pages/customer/product/products";

// LAYOUT
import AuthLayout from "@/layouts/auth-layout";

// PAGES
import Dashboard from "@/pages/admin/dashboard";
import Billboards from "@/pages/admin/dashboard/billboards";
import Categories from "@/pages/admin/dashboard/categories";
import Orders from "@/pages/admin/dashboard/orders";
import Products from "@/pages/admin/dashboard/products";
import Settings from "@/pages/admin/dashboard/settings";

// AUTH PAGES

// VENDORS PAGE
import AdminAuthLayout from "@/layouts/admin-auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import VendorLayout from "@/layouts/vendor-layout";
import AdminLoginPage from "@/pages/admin/auth/login";
import AdminRegisterPage from "@/pages/admin/auth/register";
import CustomerLogin from "@/pages/customer/auth/login";
import CustomerRegister from "@/pages/customer/auth/register";
import CheckoutPage from "@/pages/customer/checkout";
import VendorsPage from "@/pages/customer/vendors/vendors";
import VendorsHomePage from "@/pages/vendor/vendors-home-page";
import VendorsOrdersPage from "@/pages/vendor/vendors-orders-page";
import VendorsProductPage from "@/pages/vendor/vendors-product-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <CustomerLogin />,
          },
          {
            path: "register",
            element: <CustomerRegister />,
          },
        ],
      },
    ],
  },

  // {
  //   path: "/auth",
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <LoginPage />,
  //     },
  //     {
  //       path: "register",
  //       element: <RegisterPage />,
  //     },
  //   ],
  // },

  {
    path: "admin",
    children: [
      {
        path: "auth",
        element: <AdminAuthLayout />,
        children: [
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "register",
            element: <AdminRegisterPage />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "billboards",
            element: <Billboards />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },

  {
    path: "/vendors",
    element: <VendorLayout />,
    children: [
      { path: "home", element: <VendorsHomePage /> },
      { path: "orders", element: <VendorsOrdersPage /> },
      { path: "products", element: <VendorsProductPage /> },
    ],
  },
]);

export default router;
