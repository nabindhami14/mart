import { useToken } from "@/contexts/access-token";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useToken.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/api/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/users/register", data);

export const createBook = async (data: FormData) =>
  api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// CATEGORIES
export const getCategories = async () => api.get("/api/categories");
export const getCategory = async (id: number) =>
  api.get(`/api/categories/${id}`);

// ORDERS
export const getOrders = async () => api.get("/api/orders");
export const getOrder = async (id: number) => api.get(`/api/orders/${id}`);

// PRODUCTS
export const getProducts = async () => api.get("/api/products");
export const getProduct = async (id: number) => api.get(`/api/products/${id}`);

// ADMIN OVERVIEW
export const getOverview = async () => api.get("/api/admins/overview");

export const IMAGE_URL = `http://localhost:4000/public`;
