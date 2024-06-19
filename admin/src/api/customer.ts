import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const token = useToken.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const customerLogin = async (data: {
  email: string;
  password: string;
}) => api.post("/api/customers/auth/login", data);

export const customerRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/customers/auth/register", data);

// ORDERS
export const getVendors = async () => api.get("/api/vendors");
export const getVendor = async (vendorId: number) =>
  api.get(`/api/vendors/${vendorId}`);
