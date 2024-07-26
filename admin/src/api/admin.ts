import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_BACKEND_URL ||
    "http://localhost:4000/api/admins",
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminLogin = async (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getAllVendors = async () => api.get("/vendors");

export const verifyVendor = async (vendorId: number) =>
  api.patch(`/vendors/verify/${vendorId}`);
