import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useWorkspaceStore = create((set, get) => ({
  isUserSettingsVisible: false,
  isChangingPassword: false,
  isCreatingNewBoard: false,
  isLoading: false,
  isInvitingMembers: false,
  boards: [],
  currentBoard: null,
  refreshBoards: false,
  

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

  toggleMemberInvitationModal: () => {
    const currentState = get().isInvitingMembers;
    set({ isInvitingMembers: !currentState });
  },

  setCurrentBoard: (board) => set({ currentBoard: board }),

  getAllBoards: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get("/boards/");

      set({ boards: res.data.data.boards });
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  createBoard: async (data) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.post("/boards/", data);

      set({ refreshBoards: !get().refreshBoards });

      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isLoading: false, isCreatingNewBoard: false });
    }
  },
}));
