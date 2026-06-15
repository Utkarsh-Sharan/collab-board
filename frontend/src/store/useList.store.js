import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useListStore = create((set, get) => ({
  currentListTitle: "",
  currentList: null,
  currentTask: null,
  lists: [],
  renderList: false,
  renderListCard: false,
  isCreatingNewList: false,
  isCreatingNewTask: false,
  isLoading: false,
  toggleTaskDetails: false,

  setCurrentListTitle: (title) => {
    set({ currentListTitle: title });
  },

  setCurrentList: (listId) => {
    set({ currentList: listId });
  },

  setCurrentTask: (task) => {
    set({ currentTask: task });
  },

  reRenderList: () => {
    const currentState = get().renderList;
    set({ renderList: !currentState });
  },

  reRenderListCard: () => {
    const currentState = get().renderListCard;
    set({ renderListCard: !currentState });
  },

  toggleNewListCreationModal: () => {
    const currentState = get().isCreatingNewList;
    set({ isCreatingNewList: !currentState });
  },

  toggleNewTaskCreationModal: () => {
    const currentState = get().isCreatingNewTask;
    set({ isCreatingNewTask: !currentState });
  },

  toggleTaskDetailsModal: () => {
    const currentState = get().toggleTaskDetails;
    set({ toggleTaskDetails: !currentState });
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
      const res = await axiosInstance.delete(`/boards/${boardId}/lists`, {
        data,
      });

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
  },

  createTask: async (boardId, data) => {
    try {
      const res = await axiosInstance.post(
        `boards/${boardId}/lists/tasks`,
        data,
      );

      get().toggleNewTaskCreationModal();
      get().reRenderListCard();

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

  updateTask: async (boardId, listId, data) => {
    try {
      const res = await axiosInstance.put(
        `/boards/${boardId}/lists/${listId}/tasks/${get().currentTask._id}`,
        data
      );

      get().toggleTaskDetailsModal();
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
  },
}));
