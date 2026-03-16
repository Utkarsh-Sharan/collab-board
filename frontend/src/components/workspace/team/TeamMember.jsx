import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import {
  ActionDescriptionEnum,
  ActionsOnMembersEnum,
} from "../../../utils/constants.js";

function TeamMember({ member }) {
  const { toggleDecisionModal, setMemberToPerformActionUpon } =
    useWorkspaceStore();

  const handleRemove = () => {
    setMemberToPerformActionUpon({
      memberId: member.userId,
      actionDescription: ActionDescriptionEnum.REMOVE_USER,
      action: ActionsOnMembersEnum.REMOVE_USER,
    });
    
    toggleDecisionModal();
  }

  return (
    <article className="flex justify-between items-center border border-gray-300 rounded-md p-2">
      <div className="flex gap-2 justify-center items-center">
        <img
          src={member.avatar}
          alt="user avatar"
          className="w-10 rounded-full"
        />

        <div className="flex flex-col items-start justify-center">
          <p className="font-medium">{member.fullName}</p>
          <p className="font-light">{member.role}</p>
        </div>
      </div>

      <button
        className="p-1 bg-red-400 text-white rounded-md"
        onClick={handleRemove}
      >
        Remove
      </button>
    </article>
  );
}

export default TeamMember;
