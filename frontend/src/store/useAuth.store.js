import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  activeForm: "login/signup",
  activeTab: "login",
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isResettingPassword: false,

  setActiveForm: (form) => set({ activeForm: form }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      set({ authUser: res.data.data });
    } catch (error) {
      console.log("Error in auth checking!", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.data.createdUser });
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.data.user });
      toast.success("Logged in successfully!");
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      console.log(backend);
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  forgotPassword: async (data) => {
    set({ isResettingPassword: true });

    try {
      await axiosInstance.post("/auth/forgot-password");

      toast.success("Email sent successfully!");
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      console.log(backend);
      toast.error(message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  },
}));
