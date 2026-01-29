import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

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

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors || backend.errors.length > 0) {
        const firstError = Object.values(backend.errors[0])[0];
        toast.error(firstError);
      } else {
        toast.error(backend.message || "Something went wrong!");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
