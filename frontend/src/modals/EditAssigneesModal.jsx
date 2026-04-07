import { X } from "lucide-react";
import { useEffect, useState } from "react";
import AssignUsersDropdown from "../components/workspace/task/AssignUsersDropdown";
import toast from "react-hot-toast";

function EditAssigneesModal({ data }) {
  const [localAssignees, setLocalAssignees] = useState(data?.assignees);

  useEffect(() => {
    const onLoadHandler = async () => {
      if (data.isEditing) setLocalAssignees(data.assignees);
    };

    onLoadHandler();
  }, [data.isEditing, data.assignees]);

  const addAssignee = (assignee) => {
    setLocalAssignees((prev) => [...prev, assignee]);
  };

  const removeAssignee = (id) => {
    if(localAssignees.length === 1) {
      toast.error("Cannot remove last assignee!");
      return;
    }

    const updatedAssignees = localAssignees.filter(
      (assignee) => assignee.userId !== id,
    );

    setLocalAssignees(updatedAssignees);
  };

  const saveChanges = () => {
    data.updateField("assignees", localAssignees);
    data.endEdit("taskAssignees");
  }

  if (!data.isEditing) return null;

  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={() => data.endEdit("taskAssignees")}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={() => data.endEdit("taskAssignees")}
        >
          <X />
        </button>

        <h2 className="font-medium text-2xl mb-5">Manage Assignees</h2>

        <div className="max-h-60 overflow-y-auto space-y-2 mb-5">
          {localAssignees?.map((assignee) => (
            <div
              key={assignee.userId}
              className="flex justify-between items-center border border-gray-300 rounded-md px-2 py-1"
            >
              <div className="flex justify-center items-center gap-2">
                <img
                  src={assignee.avatar}
                  alt="assignee-profile"
                  className="w-10 rounded-full"
                />

                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="font-medium text-lg">{assignee.fullName}</p>

                  <p className="font-light uppercase text-sm">
                    {assignee.role}
                  </p>
                </div>
              </div>

              <button
                className="bg-red-400 px-2 py-1 text-white rounded-md"
                onClick={() => removeAssignee(assignee.userId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <AssignUsersDropdown onAssign={addAssignee} />

        <button
          className="w-full bg-orange-400 font-semibold rounded-md py-2 mt-5"
          onClick={saveChanges}
        >
          Save changes
        </button>
      </div>
    </article>
  );
}

export default EditAssigneesModal;
