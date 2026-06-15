import { useState } from "react";

function MemberInvitationForm() {
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

  return (
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
  );
}

export default MemberInvitationForm;
