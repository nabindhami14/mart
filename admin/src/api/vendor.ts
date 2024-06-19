import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_BACKEND_URL ||
    "http://localhost:4000/api/vendors",
  headers: {
    "Content-Type": "application/json",
  },
});

export const vendorLogin = async (data: { email: string; password: string }) =>
  api.post("/api/vendor/login", data);

export const getVendorCategories = async (vendorId: number) =>
  api.get(`/${vendorId}/categories`);
export const getVendorsProducts = async (vendorId: number) =>
  api.get(`/${vendorId}/products`);
