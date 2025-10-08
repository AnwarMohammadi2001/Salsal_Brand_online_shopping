import axios from "axios";

// Create a centralized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // ✅ use Vite syntax
  headers: {
    "Content-Type": "application/json",
  },
});

// Register user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Fetch products example
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export default api;
