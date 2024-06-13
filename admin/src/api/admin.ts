import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminLogin = async (data: { email: string; password: string }) =>
  api.post("/api/customers/login", data);

export const adminRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/customers/register", data);
