import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_BACKEND_URL ||
    "http://localhost:4000/api/vendors",
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
}) => api.post("/api/vendors", data);

export const vendorLogin = async (data: { email: string; password: string }) =>
  api.post("/api/vendor/login", data);

export const getVendorCategories = async (vendorId: number) =>
  api.get(`/${vendorId}/categories`);
export const getVendorsProducts = async (vendorId: number) =>
  api.get(`/${vendorId}/products`);

export const newCategory = async (data: { vendorId: string; name: string }) =>
  api.post(`/categories`, data);

export const newProduct = async ({
  vendorId,
  data,
}: {
  vendorId: string;
  data: FormData;
}) => api.post(`/${vendorId}/products`, data);
