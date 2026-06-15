import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { ActionsOnEntitiesEnum } from "../utils/constants.js";
import { useListStore } from "./useList.store.js";

export const useWorkspaceStore = create((set, get) => ({
  isUserSettingsVisible: false,
  isChangingPassword: false,
  isCreatingNewBoard: false,
  isLoading: false,
  isInvitingMembers: false,
  isVerified: false,
  isVerifying: false,
  isInviting: false,
  isManagingBoardTeam: false,
  isMakingDecision: false,
  isUpdatingBoardDetails: false,
  boards: [],
  currentBoard: null,
  targetEntity: {
    entityId: null,
    actionDescription: null,
    actionToPerform: null,
    newRole: "",
  },
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

  toggleBoardTeamModal: () => {
    const currentState = get().isManagingBoardTeam;
    set({ isManagingBoardTeam: !currentState });
  },

  toggleDecisionModal: () => {
    const currentState = get().isMakingDecision;
    set({ isMakingDecision: !currentState });
  },

  toggleBoardUpdationModal: () => {
    const currentState = get().isUpdatingBoardDetails;
    set({ isUpdatingBoardDetails: !currentState });
  },

  setCurrentBoard: (board) => set({ currentBoard: board }),

  setTargetEntity: (data) =>
    set({
      targetEntity: {
        entityId: data.entityId,
        actionDescription: data.actionDescription,
        action: data.action,
        newRole: data.newRole,
      },
    }),

  toggleRefreshBoards: () => {
    set({ refreshBoards: !get().refreshBoards });
  },

  performAction: (action) => {
    switch (action) {
      case ActionsOnEntitiesEnum.UPDATE_USER_ROLE: {
        const data = {
          memberId: get().targetEntity.entityId,
          newRole: get().targetEntity.newRole,
        };
        get().updateUserRole(data);
        break;
      }

      case ActionsOnEntitiesEnum.REMOVE_USER: {
        const data = { memberId: get().targetEntity.entityId };
        get().removeUser(data);
        break;
      }

      case ActionsOnEntitiesEnum.DELETE_BOARD:
        get().deleteBoard();
        break;
      
      case ActionsOnEntitiesEnum.DELETE_LIST: {
        const data = { listId: get().targetEntity.entityId.listId };
        const boardId = get().targetEntity.entityId.boardId;
        useListStore.getState().deleteList(boardId, data);
        break;
      }
    }
  },

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

      get().toggleRefreshBoards();

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

  updateBoard: async (data) => {
    try {
      const res = await axiosInstance.put(
        `/boards/${get().currentBoard._id}`,
        data,
      );

      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === get().currentBoard._id ? { ...board, ...data } : board,
        ),
      }));

      get().toggleBoardUpdationModal();

      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  },

  deleteBoard: async () => {
    try {
      const res = await axiosInstance.delete(
        `/boards/${get().currentBoard._id}`,
      );

      get().toggleRefreshBoards();
      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  },

  verifyUser: async (data) => {
    set({ isVerifying: true });

    try {
      await axiosInstance.post("/users/search", data);
      set({ isVerifying: false, isVerified: true });

      await get().inviteUser(data);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isVerifying: false });
    }
  },

  inviteUser: async (data) => {
    set({ isInviting: true });

    try {
      const res = await axiosInstance.post(
        `/boards/${get().currentBoard._id}/invite`,
        data,
      );
      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      set({ isVerified: false, isInviting: false });
    }
  },

  updateUserRole: async (data) => {
    try {
      const res = await axiosInstance.patch(
        `/boards/${get().currentBoard._id}/members/update-role`,
        data,
      );

      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  },

  removeUser: async (data) => {
    try {
      const res = await axiosInstance.delete(
        `/boards/${get().currentBoard._id}/members/remove-member`,
        { data },
      );

      set({
        currentBoard: {
          ...get().currentBoard,
          members: get().currentBoard.members.filter(
            (m) => m.userId !== data.memberId,
          ),
        },
      });

      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  },
}));
