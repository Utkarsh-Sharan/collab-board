import { create } from "zustand";

export const useWorkspaceStore = create((set, get) => ({
  isUserSettingsVisible: false,

  toggleUserSettings: () => {
    const currentState = get().isUserSettingsVisible;
    set({ isUserSettingsVisible: !currentState });
  },
}));
