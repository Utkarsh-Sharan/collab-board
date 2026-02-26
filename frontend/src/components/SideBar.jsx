import { ClipboardList, ListChecks, Menu, Settings, Star } from "lucide-react";
import icon from "../assets/collab-board-icon.png";
import { useAuthStore } from "../store/useAuth.store.js";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";
import { useState } from "react";

function SideBar() {
  const { authUser, logout } = useAuthStore();
  const { toggleUserSettings } = useWorkspaceStore();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <aside className="hidden md:block h-full w-72 p-3 bg-white border-r-2">
        <div className="h-full w-full flex flex-col items-center justify-between">
          <div className="w-full px-3 flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <img src={icon} alt="app-image" className="w-12 rounded-md" />
              <h3 className="text-2xl font-semibold">CollabBoard</h3>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <button className="transition-colors duration-200 hover:bg-teal-200 hover:text-teal-800 rounded-md w-full p-2 flex gap-2">
                <ClipboardList />
                Workspace
              </button>
              <button className="transition-colors duration-200 hover:bg-teal-200 hover:text-teal-800 rounded-md w-full p-2 flex gap-2">
                <ListChecks />
                My Tasks
              </button>
              <button className="transition-colors duration-200 hover:bg-teal-200 hover:text-teal-800 rounded-md w-full p-2 flex gap-2">
                <Star />
                Starred
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2">
            <article className="p-2 flex items-center justify-between border border-orange-400 rounded-md w-full">
              <div className="flex items-center justify-center gap-2">
                <img
                  src={authUser.avatar.url}
                  alt="user-profile-image"
                  className="w-10 rounded-full"
                />

                <div className="flex flex-col items-start justify-center">
                  <h6>{authUser.fullName}</h6>
                  <p>{authUser.userName}</p>
                </div>
              </div>

              <button onClick={toggleUserSettings}>
                <Settings className="hover:bg-teal-200 hover:text-white rounded-md" />
              </button>
            </article>

            <button
              className="bg-orange-400 w-full rounded-md py-2 text-lg font-semibold"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile View */}
      <nav className="md:hidden fixed w-full flex justify-between items-center p-5 bg-white border-b-2">
        <div className="flex items-center gap-2">
          <img src={icon} alt="app-image" className="w-10 rounded-md" />
          <h3 className="text-xl font-semibold">CollabBoard</h3>
        </div>

        <button onClick={() => setIsNavbarVisible(!isNavbarVisible)}>
          <Menu />
        </button>

        {isNavbarVisible && (
          <aside className="fixed z-50 top-20 left-0 w-full p-3 bg-white">
            <div className="h-full w-full flex flex-col items-center justify-between">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <button className="bg-teal-400 rounded-md w-full p-2 flex justify-center gap-2">
                  <ClipboardList />
                  Workspace
                </button>
                <button className="bg-teal-400 rounded-md w-full p-2 flex justify-center gap-2">
                  <ListChecks />
                  My Tasks
                </button>
                <button className="bg-teal-400 rounded-md w-full p-2 flex justify-center gap-2">
                  <Star />
                  Starred
                </button>
              </div>

              <div className="mt-5 w-full flex flex-col items-center justify-center gap-2">
                <article className="p-2 flex items-center justify-between border border-orange-400 rounded-md w-full">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={authUser.avatar.url}
                      alt="user-profile-image"
                      className="w-10 rounded-full"
                    />

                    <div className="flex flex-col items-start justify-center">
                      <h6>{authUser.fullName}</h6>
                      <p>{authUser.userName}</p>
                    </div>
                  </div>

                  <button onClick={toggleUserSettings}>
                    <Settings className="hover:bg-teal-200 hover:text-white rounded-md" />
                  </button>
                </article>

                <button
                  className="bg-orange-400 w-full rounded-md py-2 text-lg font-semibold"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </aside>
        )}
      </nav>
    </>
  );
}

export default SideBar;
