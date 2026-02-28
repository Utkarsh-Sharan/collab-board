import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useWorkspaceStore = create((set, get) => ({
  isUserSettingsVisible: false,
  isChangingPassword: false,
  isCreatingNewBoard: false,
  isLoading: false,

  toggleUserSettings: () => {
    const currentState = get().isUserSettingsVisible;
    set({ isUserSettingsVisible: !currentState });
  },

  togglePasswordChangingWindow: () => {
    const currentState = get().isChangingPassword;
    set({ isChangingPassword: !currentState });
  },

  toggleNewBoardCreationModal: () => {
    const currentState = get().isCreatingNewBoard;
    set({ isCreatingNewBoard: !currentState });
  },

  createBoard: async (data) => {
    set({isLoading: true});

    try {
      const res = await axiosInstance.post("/boards/", data);

      console.log(res);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({isLoading: false});
      set({ isCreatingNewBoard: false });
    }
  }
}));
