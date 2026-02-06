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
  isRequestingPasswordReset: false,
  isResetPasswordMailSent: false,
  isResettingPassword: false,
  isPasswordReset: false,
  isChangingCurrentPassword: false,

  setActiveForm: (form) => set({ activeForm: form }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      set({ authUser: res.data.data });
    } catch (error) {
      const status = error.response?.status;

      if (status === 401) {
        try {
          await axiosInstance.post(
            "/auth/refresh-access-token",
          );

          const res = await axiosInstance.post("/auth/current-user");
          set({ authUser: res.data.data });
        } catch (error) {
          console.log("Refresh token failed!", error);

          set({ authUser: null });
        }
      } else {
        console.log("Error in auth checking!", error);

        set({ authUser: null });
      }
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

      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  requestPasswordReset: async (data) => {
    set({ isRequestingPasswordReset: true });

    try {
      await axiosInstance.post("/auth/forgot-password", data);

      set({ isResetPasswordMailSent: true });
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isRequestingPasswordReset: false });
    }
  },

  resetForgotPassword: async (resetToken, data) => {
    set({ isResettingPassword: true });

    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${resetToken}`,
        data,
      );

      set({ isPasswordReset: true });
      toast.success(res.data.message);
    } catch (error) {
      const backend = error.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isResettingPassword: false });
    }
  },

  changeCurrentPassword: async (data) => {
    
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
