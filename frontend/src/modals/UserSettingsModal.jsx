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
      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleUserSettings}
        >
          <X />
        </button>

        <div className="flex items-center justify-start gap-2 mt-5">
          <Settings className="w-10" />
          <h2 className="font-bold text-2xl">Settings</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-start mt-5">
          <img
            src={authUser.avatar.url}
            alt="avatar"
            className="w-1/5 rounded-full"
          />
          <div className="flex gap-2">
            <span className="inline-grid grid-cols-1 gap-2">
              <span className="text-sm sm:text-lg">Name:</span>
              <span className="text-sm sm:text-lg">User Name:</span>
              <span className="text-sm sm:text-lg">Email:</span>
            </span>
            <span className="inline-grid grid-cols-1 gap-2 text-center">
              <span className="text-sm sm:text-lg bg-white rounded-md px-2">
                {authUser.fullName}
              </span>
              <span className="text-sm sm:text-lg bg-white rounded-md px-2">
                {authUser.userName}
              </span>
              <span className="text-sm sm:text-lg bg-white rounded-md px-2">
                {authUser.email}
              </span>
            </span>
          </div>
        </div>

        <div>
          <button className="mt-10 bg-orange-400 w-full rounded-md py-2">
            Change Password
          </button>
          <button className="mt-5 bg-red-400 text-white w-full rounded-md py-2">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsModal;
