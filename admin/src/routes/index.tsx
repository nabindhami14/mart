import { createBrowserRouter } from "react-router-dom";

// CUSTOMER PAGE
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/customer/home";
import ProductsPage from "@/pages/customer/product/products";

// LAYOUT
import AuthLayout from "@/layouts/auth-layout";

// PAGES
import Dashboard from "@/pages/admin/dashboard";

// AUTH PAGES

// VENDORS PAGE
import AdminAuthLayout from "@/layouts/admin-auth-layout";
import VendorLayout from "@/layouts/vendor-layout";
import AdminLoginPage from "@/pages/admin/auth/login";
import AdminRegisterPage from "@/pages/admin/auth/register";
import CustomerLogin from "@/pages/customer/auth/login";
import CustomerRegister from "@/pages/customer/auth/register";
import CheckoutPage from "@/pages/customer/checkout";
import VendorsHomePage from "@/pages/vendor/vendors-home-page";
import VendorsOrdersPage from "@/pages/vendor/vendors-orders-page";

import AdminLayout from "@/layouts/admin-layout";
import AdminVendorsPage from "@/pages/admin/dashboard/billboards";
import CategoriesPage from "@/pages/customer/category/categories";
import CategoryPage from "@/pages/customer/category/category";
import VendorPage from "@/pages/customer/vendors/vendor";
import VendorsPage from "@/pages/customer/vendors/vendors";
import VendorsCategoriesPage from "@/pages/vendor/vendors-categories-page";
import VendorsProductsPage from "@/pages/vendor/vendors-products-page";
import VendorsSettingsPAge from "@/pages/vendor/vendors-settings-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "vendors/:vendorId", element: <VendorPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/:categoryId", element: <CategoryPage /> },
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
        element: <AdminLayout />,
        children: [
          {
            path: "home",
            element: <Dashboard />,
          },
          {
            path: "vendors",
            element: <AdminVendorsPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/vendors/:vendorId",
    element: <VendorLayout />,
    children: [
      { path: "home", element: <VendorsHomePage /> },
      { path: "orders", element: <VendorsOrdersPage /> },
      { path: "products", element: <VendorsProductsPage /> },
      { path: "categories", element: <VendorsCategoriesPage /> },
      { path: "settings", element: <VendorsSettingsPAge /> },
    ],
  },
]);

export default router;
