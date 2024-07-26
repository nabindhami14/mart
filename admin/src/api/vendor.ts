import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerVendor = async (data: {
  name: string;
  email: string;
  password: string;
  title: string;
  description: string;
  phone: string;
  location: string;
}) => api.post("/api/vendors/auth/register", data);

export const vendorLogin = async (data: { email: string; password: string }) =>
  api.post("/api/vendors/auth/login", data);

export const getVendorCategories = async (vendorId: number) =>
  api.get(`/api/vendors/${vendorId}/categories`);
export const getVendorsProducts = async (vendorId: number) =>
  api.get(`/api/vendors/${vendorId}/products`);
export const getVendorOrders = async (vendorId: number) =>
  api.get(`/api/vendors/${vendorId}/orders`);

export const newCategory = async (data: { vendorId: string; name: string }) =>
  api.post(`/api/categories`, data);

export const newProduct = async (data: FormData) =>
  api.post(`/api/products`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
