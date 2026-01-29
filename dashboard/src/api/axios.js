import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  withCredentials: true,
});

// ✅ DO NOT redirect inside interceptor (prevents blinking loop)
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
