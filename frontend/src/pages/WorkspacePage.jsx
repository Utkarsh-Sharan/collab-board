import { useAuthStore } from "../store/useAuth.store.js";

function WorkspacePage() {
  const { logout } = useAuthStore();

  return (
    <>
      <button
        className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
}

export default WorkspacePage;
