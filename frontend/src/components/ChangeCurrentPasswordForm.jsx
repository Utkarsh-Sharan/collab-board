import { X } from "lucide-react";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";

function ChangeCurrentPasswordForm() {
  const { togglePasswordChangingWindow } = useWorkspaceStore();

  return (
    <div className="mt-10 p-2 relative flex flex-col items-center justify-center border border-orange-200 rounded-md">
      <h2 className="font-bold text-2xl">Change current password</h2>

      <div className=" mt-5 flex flex-col items-start justify-center w-full">
        <button
          className="absolute top-0 right-0 hover:bg-red-400 hover:text-white rounded-md"
          onClick={togglePasswordChangingWindow}
        >
          <X />
        </button>

        <form className="w-full">
          <h4 className="text-sm font-light">Old Password</h4>
          <input
            type="text"
            placeholder="Enter your old password"
            className="w-full px-5 py-2 border border-orange-100 rounded-md"
            name="oldPassword"
          />
          <h4 className="mt-3 text-sm font-light">New Password</h4>
          <input
            type="text"
            placeholder="Enter a new password"
            className="w-full px-5 py-2 border border-orange-100 rounded-md"
            name="newPassword"
          />

          <button className="mt-10 bg-orange-400 w-full rounded-md py-2">
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeCurrentPasswordForm;
