import { createBrowserRouter } from "react-router-dom";

// CUSTOMER PAGES
import MainLayout from "@/layouts/main-layout";
import CustomerLogin from "@/pages/customer/auth/login";
import CustomerRegister from "@/pages/customer/auth/register";
import ShippingPage from "@/pages/customer/shipping";
import CategoriesPage from "@/pages/customer/category/categories";
import CategoryPage from "@/pages/customer/category/category";
import CheckoutPage from "@/pages/customer/checkout";
import HomePage from "@/pages/customer/home";
import ProductsPage from "@/pages/customer/product/products";
import NewVendor from "@/pages/customer/vendors/new-vendor";
import VendorLogin from "@/pages/customer/vendors/vendor-login";
import VendorsPage from "@/pages/customer/vendors/vendors";

// AUTH LAYOUT
import AuthLayout from "@/layouts/auth-layout";

// ADMIN PAGES
import AdminLayout from "@/layouts/admin-layout";
import AdminLoginPage from "@/pages/admin/auth/login";
import Dashboard from "@/pages/admin/dashboard";
import AdminVendorsPage from "@/pages/admin/dashboard/vendors";
import AdminOrdersPage from "@/pages/admin/dashboard/orders";

// VENDOR LAYOUT
import VendorLayout from "@/layouts/vendor-layout";
import VendorPage from "@/pages/customer/vendors/vendor";
import VendorsCategoriesPage from "@/pages/vendor/vendors-categories-page";
import VendorsHomePage from "@/pages/vendor/vendors-home-page";
import VendorsNewCategoryPage from "@/pages/vendor/vendors-new-category";
import VendorsNewProductPage from "@/pages/vendor/vendors-new-product";
import VendorsOrdersPage from "@/pages/vendor/vendors-orders-page";
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
      {
        path: "vendors",
        children: [
          { path: "", element: <VendorsPage /> },
          { path: "new", element: <NewVendor /> },
          { path: ":vendorId", element: <VendorPage /> },
        ],
      },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/:categoryId", element: <CategoryPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "shipping", element: <ShippingPage /> },
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
        children: [{ path: "login", element: <AdminLoginPage /> }],
      },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          { path: "home", element: <Dashboard /> },
          { path: "vendors", element: <AdminVendorsPage /> },
          { path: "orders", element: <AdminOrdersPage /> },
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
