import { X } from "lucide-react";
import { useState } from "react";
import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import { useListStore } from "../../../store/useList.store.js";

function AssignUsersDropdown({ localAssignees, handleSelect, showDropdown, setShowDropdown }) {
  const [query, setQuery] = useState("");

  const { currentBoard } = useWorkspaceStore();

  const members = currentBoard.members;

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(query.toLowerCase()) &&
      !localAssignees.some((a) => a.userId === m.userId)
  );

  return (
    <div className="relative w-full mb-5">
      <label htmlFor="assign" className="text-sm font-light">
        Assign members
      </label>
      <input
        type="text"
        name="assign"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-5 py-2 border border-orange-100 rounded-md"
        placeholder="Assign to..."
      />

      {showDropdown && filteredMembers.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-20 overflow-y-auto">
          {filteredMembers.map((member) => (
            <li
              key={member.userId}
              onClick={() => handleSelect(member)}
              className="px-3 py-2 cursor-pointer hover:bg-teal-100"
            >
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                  <img
                    src={member.avatar}
                    alt="user-profile"
                    className="w-10 rounded-full"
                  />

                  <p>{member.fullName}</p>
                </div>

                <p>{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignUsersDropdown;
