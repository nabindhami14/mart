import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const vendorLogin = async (data: { email: string; password: string }) =>
  api.post("/api/vendor/login", data);
