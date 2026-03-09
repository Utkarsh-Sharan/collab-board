import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import TeamMember from "./TeamMember";

function TeamDropdown({ board }) {
  const { toggleMemberInvitationModal } = useWorkspaceStore();

  return (
    <>
      <article className="absolute z-10 shadow-lg left-0 top-10 w-60 border border-gray-200 light-background rounded-lg text-left p-2">
        <h3 className="text-xl font-semibold mb-3">Board Members</h3>

        <div className="max-h-28 overflow-y-auto space-y-2">
          {board.members.length &&
            board.members.map((member) => (
              <TeamMember key={member.userId} member={member} />
            ))}
        </div>

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
