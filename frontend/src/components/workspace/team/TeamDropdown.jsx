import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";

function TeamDropdown() {
  const { toggleMemberInvitationModal, toggleBoardTeamModal } =
    useWorkspaceStore();

  return (
    <>
      <article className="absolute z-10 shadow-lg right-0 top-10 w-60 border border-gray-200 light-background rounded-lg text-left p-2">
        <h3 className="text-xl font-semibold mb-3">Team Settings</h3>

        <button
          className="w-full bg-orange-400 rounded-md mt-3 py-1"
          onClick={toggleBoardTeamModal}
        >
          Manage team
        </button>

        <button
          className="w-full bg-orange-400 rounded-md mt-3 py-1"
          onClick={toggleMemberInvitationModal}
        >
          Invite users
        </button>
      </article>
    </>
  );
}

export default TeamDropdown;
