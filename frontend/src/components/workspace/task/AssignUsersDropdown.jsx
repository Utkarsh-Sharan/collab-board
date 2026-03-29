import { X } from "lucide-react";
import { useState } from "react";

const members = [
  { id: 1, name: "Utkarsh" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Sam" },
  { id: 4, name: "Priya" },
];

function AssignUsersDropdown() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [assignees, setAssignees] = useState([]);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) &&
      !assignees.some((a) => a.id === m.id),
  );

  const handleSelect = (member) => {
    const newAssignees = [...assignees, member];
    setAssignees(newAssignees);

    setQuery("");
    setShowDropdown(false);
  };

  const removeAssignee = (id) => {
    const newAssignees = assignees.filter((m) => m.id !== id);
    setAssignees(newAssignees);
  };

  return (
    <div className="relative w-full mb-5">
      <div className="flex flex-wrap gap-2 mb-2">
        {assignees.map((a) => (
          <span
            key={a.id}
            className="flex items-center bg-teal-300 text-teal-800 px-2 py-1 rounded-full text-sm"
          >
            {a.name}
            <button
              onClick={() => removeAssignee(a.id)}
              className="ml-1"
            >
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
              key={member.id}
              onClick={() => handleSelect(member)}
              className="px-3 py-2 cursor-pointer hover:bg-teal-100"
            >
              {member.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignUsersDropdown;
