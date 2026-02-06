import { create } from "zustand";

export const useWorkspaceStore = create((set, get) => ({
  isUserSettingsVisible: false,
  isChangingPassword: false,

  toggleUserSettings: () => {
    const currentState = get().isUserSettingsVisible;
    set({ isUserSettingsVisible: !currentState });
  },

  togglePasswordChangingWindow: () => {
    const currentState = get().isChangingPassword;
    set({ isChangingPassword: !currentState });
  },
}));
