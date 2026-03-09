import { useState } from "react";
import { useWorkspaceStore } from "../../store/useWorkspace.store.js";

function MemberInvitationFormContainer() {
  const { isLoading, currentBoard } = useWorkspaceStore();
  const [memberFormData, setMemberFormData] = useState({
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setMemberFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    //TODO
  };

  return (
    <form>
      <div className="mt-10">
        <h1 className="text-3xl">Invite Members</h1>
        <p className="text-orange-400 text-lg">
          Invite minds that move ideas forward.
        </p>
      </div>

      <hr />

      <h5>Board name: {currentBoard.title}</h5>

      <div className="mt-10 flex justify-center items-center gap-2 max-h-28 overflow-y-auto">
        <div>
          <label htmlFor="email" className="text-sm font-light">
            Email
          </label>
          <input
            type="text"
            placeholder="Email of the user to invite"
            className="w-full px-3 py-1 border border-orange-100 rounded-md"
            name="email"
            value={memberFormData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="role" className="text-sm font-light">
            {"Role (optional)"}
          </label>
          <select
            className="w-full px-3 py-1 border border-orange-100 rounded-md"
            name="role"
            id="role"
            value={memberFormData.role}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>

        {/* <button className="p-1 mt-6 bg-red-400 text-white rounded-md">
        Remove
      </button> */}
      </div>

      <button
        className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <LoaderIcon className="w-full h-5 animate-spin" />
        ) : (
          "Verify user"
        )}
      </button>
    </form>
  );
}

export default MemberInvitationFormContainer;
