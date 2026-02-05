import { useAuthStore } from "../store/useAuth.store.js";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";
import { Settings, X } from "lucide-react";

function UserSettingsModal() {
  const { authUser } = useAuthStore();
  const { isUserSettingsVisible, toggleUserSettings } = useWorkspaceStore();

  if (!isUserSettingsVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay: Clicking on this area closes user settings */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleUserSettings}
      />

      {/* Modal: Main area for user settings */}
      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 max-w-md">
        <button className="absolute top-2 right-2" onClick={toggleUserSettings}>
          <X />
        </button>

        <div>
          <h2> <Settings className="w-10" /> User Settings</h2>
          <h2>Name: {authUser.fullName}</h2>
          <h4>User Name: {authUser.userName}</h4>
          <h4>Email: {authUser.email}</h4>
        </div>

        <div>
          <button className="mt-5 bg-orange-400 w-full rounded-md">
            Change Password
          </button>
          <button className="mt-5 bg-red-400 text-white w-full rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsModal;
