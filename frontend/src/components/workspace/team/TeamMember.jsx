import { useState } from "react";
import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import {
  ActionDescriptionEnum,
  ActionsOnEntitiesEnum,
} from "../../../utils/constants.js";

function TeamMember({ member }) {
  const [newRole, setNewRole] = useState("");

  const { toggleDecisionModal, setTargetEntity } = useWorkspaceStore();

  const handleMemberRoleUpdate = (e) => {
    const selectedRole = e.target.value;
    setNewRole(selectedRole);

    setTargetEntity({
      entityId: member.userId,
      actionDescription: ActionDescriptionEnum.UPDATE_USER_ROLE,
      action: ActionsOnEntitiesEnum.UPDATE_USER_ROLE,
      newRole: selectedRole,
    });

    toggleDecisionModal();
  };

  const handleRemove = () => {
    setTargetEntity({
      entityId: member.userId,
      actionDescription: ActionDescriptionEnum.REMOVE_USER,
      action: ActionsOnEntitiesEnum.REMOVE_USER,
    });

    toggleDecisionModal();
  };

  return (
    <article className="flex justify-between items-center border border-orange-400 rounded-md p-2">
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

      <div className="flex justify-center items-center gap-2">
        <select
          className="w-full px-3 py-1 border border-orange-200 rounded-md"
          name="role"
          value={newRole}
          onChange={handleMemberRoleUpdate}
        >
          <option value="" disabled>
            Update role
          </option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        <button
          className="p-1 bg-red-400 text-white rounded-md"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default TeamMember;
