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
}) => api.post("/api/customers/login", data);

export const customerRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/api/customers/register", data);

// ORDERS
export const getVendors = async () => api.get("/api/vendors");
