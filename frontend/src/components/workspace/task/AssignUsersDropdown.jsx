import { X } from "lucide-react";
import { useState } from "react";
import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";

function AssignUsersDropdown({ onAssign }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [assignees, setAssignees] = useState([]);

  const { currentBoard } = useWorkspaceStore();

  const members = currentBoard.members;

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(query.toLowerCase()) &&
      !assignees.some((a) => a._id === m._id),
  );

  const handleSelect = (member) => {
    const newAssignees = [...assignees, member];
    const newAssigneeIds = newAssignees.map(user => user.userId);

    setAssignees(newAssignees);
    onAssign(newAssigneeIds);

    setQuery("");
    setShowDropdown(false);
  };

  const removeAssignee = (id) => {
    const updatedAssignees = assignees.filter((m) => m._id !== id);
    const updatedAssigneeIds = updatedAssignees.map((user) => user.userId);

    setAssignees(updatedAssignees);
    onAssign(updatedAssigneeIds);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="flex flex-wrap gap-2 mb-2">
        {assignees.map((a) => (
          <span
            key={a._id}
            className="flex items-center bg-teal-300 text-teal-800 px-2 py-1 rounded-full text-sm"
          >
            {a.fullName}
            <button onClick={() => removeAssignee(a._id)} className="ml-1">
              <X size={17} />
            </button>
          </span>
        ))}
      </div>

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
              key={member._id}
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
