import { create } from "zustand";
import { backend_url } from "./keyStore";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backend_url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.savedUser) {
        set({ user: data.savedUser });
        return true;
      } else {
        set({ error: data.message || "Signup failed" });
        return false;
      }
    } catch (err) {
      set({ error: err.message || "Signup error" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backend_url}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        set({
          user: data.user,
          isAuthenticated: true,
          isAdmin: data.user.role === "admin",
        });
        return true; // ✅ return success
      } else {
        set({ error: data.message || "Login failed" });
        return false;
      }
    } catch (err) {
      set({ error: err.message || "Error logging in" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (otp) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backend_url}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        set({ message: data.message });
        return true;
      } else {
        set({ error: data.message || "OTP verification failed" });
        return false;
      }
    } catch (err) {
      set({ error: err.message || "OTP verification error" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null, isLoading: true });

    try {
      const res = await fetch(`${backend_url}/check-auth`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.user) {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isCheckingAuth: false,
          isLoading: false,
        });
        return false;
      }

      set({
        user: data.user,
        isAuthenticated: true,
        isAdmin: data.user.role === "admin",
        isCheckingAuth: false,
        isLoading: false,
      });

      return true;
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isCheckingAuth: false,
        isLoading: false,
      });
      return false;
    }
  },
  logout: async () => {
    set({ isLoading: true });

    try {
      const res = await fetch(`${backend_url}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          error: null,
        });
        return true;
      } else {
        const data = await res.json();
        set({ error: data.message || "Logout failed" });
        return false;
      }
    } catch (err) {
      set({ error: err.message || "Error during logout" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
