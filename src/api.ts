import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://http://localhost:5173/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик запросов уже настроен в AuthContext, но можно оставить базовый
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;