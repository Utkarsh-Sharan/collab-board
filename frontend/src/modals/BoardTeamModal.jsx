import { X } from "lucide-react";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";
import TeamMember from "../components/workspace/team/TeamMember.jsx";

function BoardTeamModal() {
  const { currentBoard, isManagingBoardTeam, toggleBoardTeamModal } =
    useWorkspaceStore();

  if (!isManagingBoardTeam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleBoardTeamModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleBoardTeamModal}
        >
          <X />
        </button>

        <div className="mt-10">
          <h1 className="text-3xl">Manage Your Team</h1>
          <p className="text-orange-400 text-lg">
            Guide your team, refine your vision.
          </p>
        </div>

        <div className="max-h-28 overflow-y-auto space-y-2 mt-10">
          {currentBoard?.members?.map((member) => (
              <TeamMember key={member.userId} member={member} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default BoardTeamModal;
