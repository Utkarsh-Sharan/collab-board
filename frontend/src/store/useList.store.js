import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useListStore = create((set, get) => ({
  lists: [],
  renderList: false,
  isCreatingNewList: false,
  isLoading: false,

  reRenderList: () => {
    const currentState = get().renderList;
    set({ renderList: !currentState });
  },

  toggleNewListCreationModal: () => {
    const currentState = get().isCreatingNewList;
    set({ isCreatingNewList: !currentState });
  },

  getAllLists: async (boardId) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get(`/boards/${boardId}/lists`);
      
      set({ lists: res.data.data.lists });
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

  createList: async (boardId, data) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.post(`/boards/${boardId}/lists`, data);

      get().reRenderList();
      toast.success(res.data.message);
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

  deleteList: async (boardId, data) => {
    try {
      const res = await axiosInstance.delete(`/boards/${boardId}/lists`, {data});

      get().reRenderList();

      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  }
}));
