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
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth checking!", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
