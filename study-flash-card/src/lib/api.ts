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
        // Unauthorized, redirect to login or refresh token
        console.error("Unauthorized access - perhaps redirect to login?");
      } else if (error.response.status === 500) {
        console.error("Server error - please try again later.");
      }
    }
    return Promise.reject(error);
  },
);
