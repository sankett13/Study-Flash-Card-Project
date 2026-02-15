import { create } from "zustand";
import authApi from "./auth.api";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authApi.login(email, password);
      set({ user: data.user, token: data.token, loading: false });
    } catch (error) {
      set({ error: "Login failed", loading: false });
    }
  },

  logout: () => {
    authApi.logout();
    set({ user: null, token: null });
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await authApi.signUp(email, password);
      set({ loading: false });
    } catch (error) {
      set({ error: "Registration failed", loading: false });
    }
  },

  loadUser: async () => {
    set({ loading: true, error: null });
    try {
      const data = await authApi.getMe();
      console.log("User data loaded:", data);
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: "Failed to load user", loading: false });
    }
  },
}));
