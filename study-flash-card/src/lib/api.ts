import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Clear invalid token and redirect to login
        localStorage.removeItem("authToken");
        console.error("Unauthorized access - redirecting to login");

        // Only redirect if we're not already on login/signup pages
        const currentPath = window.location.pathname;
        if (
          !currentPath.includes("/login") &&
          !currentPath.includes("/signup")
        ) {
          window.location.href = "/login";
        }
      } else if (error.response.status === 500) {
        console.error("Server error - please try again later.");
      }
    }
    return Promise.reject(error);
  },
);
