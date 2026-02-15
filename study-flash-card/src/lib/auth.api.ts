import { api } from "./api";

const BASE_URL = "/auth";

const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post(`${BASE_URL}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  signUp: async (email: string, password: string) => {
    try {
      const response = await api.post(`${BASE_URL}/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get(`${BASE_URL}/me`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      throw error;
    }
  },
};

export default authApi;
