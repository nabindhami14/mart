import { createBrowserRouter } from "react-router-dom";

// CUSTOMER PAGES
import MainLayout from "@/layouts/main-layout";
import HomePage from "@/pages/customer/home";
import ProductsPage from "@/pages/customer/product/products";
import CategoriesPage from "@/pages/customer/category/categories";
import CategoryPage from "@/pages/customer/category/category";
import VendorPage from "@/pages/customer/vendors/vendor";
import VendorsPage from "@/pages/customer/vendors/vendors";
import NewVendor from "@/pages/customer/vendors/new-vendor";
import VendorLogin from "@/pages/customer/vendors/vendor-login";
import CheckoutPage from "@/pages/customer/checkout";
import CustomerLogin from "@/pages/customer/auth/login";
import CustomerRegister from "@/pages/customer/auth/register";

// AUTH LAYOUT
import AuthLayout from "@/layouts/auth-layout";

// ADMIN PAGES
import AdminLayout from "@/layouts/admin-layout";
import Dashboard from "@/pages/admin/dashboard";
import AdminVendorsPage from "@/pages/admin/dashboard/billboards";
import AdminLoginPage from "@/pages/admin/auth/login";

// VENDOR LAYOUT
import VendorLayout from "@/layouts/vendor-layout";
import VendorsHomePage from "@/pages/vendor/vendors-home-page";
import VendorsOrdersPage from "@/pages/vendor/vendors-orders-page";
import VendorsCategoriesPage from "@/pages/vendor/vendors-categories-page";
import VendorsNewCategoryPage from "@/pages/vendor/vendors-new-category";
import VendorsNewProductPage from "@/pages/vendor/vendors-new-product";
import VendorsProductsPage from "@/pages/vendor/vendors-products-page";
import VendorsSettingsPAge from "@/pages/vendor/vendors-settings-page";

// ADMIN AUTH LAYOUT
import AdminAuthLayout from "@/layouts/admin-auth-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "vendors/new", element: <NewVendor /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/:categoryId", element: <CategoryPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <CustomerLogin /> },
          { path: "register", element: <CustomerRegister /> },
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
          { path: "login", element: <AdminLoginPage /> },
        ],
      },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          { path: "home", element: <Dashboard /> },
          { path: "vendors", element: <AdminVendorsPage /> },
        ],
      },
    ],
  },
  {
    path: "vendors",
    children: [
      {
        path: "auth",
        element: <AdminAuthLayout />,
        children: [{ path: "login", element: <VendorLogin /> }],
      },

      {
        path: ":vendorId",
        children: [
          {
            path: "dashboard",
            element: <VendorLayout />,
            children: [
              { path: "home", element: <VendorsHomePage /> },
              { path: "orders", element: <VendorsOrdersPage /> },
              { path: "products", element: <VendorsProductsPage /> },
              { path: "products/new", element: <VendorsNewProductPage /> },
              { path: "categories", element: <VendorsCategoriesPage /> },
              { path: "categories/new", element: <VendorsNewCategoryPage /> },
              { path: "settings", element: <VendorsSettingsPAge /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
