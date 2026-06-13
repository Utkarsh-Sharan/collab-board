import { LoaderIcon, X } from "lucide-react";
import { useState } from "react";
import { useListStore } from "../../store/useList.store.js";
import AssignUsersDropdown from "../workspace/task/AssignUsersDropdown.jsx";
import AssignLabels from "../workspace/task/AssignLabels.jsx";
import { useWorkspaceStore } from "../../store/useWorkspace.store.js";

function CreateNewTaskForm() {
  const [newTaskFormData, setNewTaskFormData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: null,
    labels: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [localAssignees, setLocalAssignees] = useState([]);

  const { currentList, isLoading, createTask } = useListStore();
  const { currentBoard } = useWorkspaceStore();

  const handleUserAssignment = (user) => {
    setNewTaskFormData((prev) => ({ ...prev, assignedTo: user }));
    setLocalAssignees((prev) => [...prev, user]);
    setShowDropdown(false);
  };
  
  const removeAssignee = (id) => {
    const updatedAssignees = localAssignees.filter(
      (assignee) => assignee.userId !== id,
    );

    setLocalAssignees(updatedAssignees);
  };

  const handleLabelAssignment = (labels) => {
    setNewTaskFormData((prev) => ({ ...prev, labels: labels }));
  };

  const handleChange = (e) => {
    setNewTaskFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const data = { listId: currentList, ...newTaskFormData };

    createTask(currentBoard._id, data);
    setNewTaskFormData({
      title: "",
      description: "",
      assignedTo: [],
      dueDate: null,
      labels: [],
    });
  };

  return (
    <form>
      <div className="mt-10">
        <h1 className="text-3xl">Create A Task</h1>
        <p className="text-orange-400 text-lg">
          Break down goals, build up results.
        </p>
      </div>

      <div className="mt-10">
        <label htmlFor="title" className="text-sm font-light">
          Title
        </label>
        <input
          type="text"
          placeholder="Give a title to your list"
          className="mb-5 w-full px-5 py-2 border border-orange-100 rounded-md"
          name="title"
          value={newTaskFormData.title}
          onChange={handleChange}
        />

        <label htmlFor="description" className="text-sm font-light">
          Description
        </label>
        <input
          type="text"
          placeholder="Describe your list"
          className="mb-5 w-full px-5 py-2 border border-orange-100 rounded-md"
          name="description"
          value={newTaskFormData.description}
          onChange={handleChange}
        />

        <article className="flex justify-start items-center gap-1">
          {localAssignees.length > 0 &&
          localAssignees.map((assignee) => (
            <div 
              key={assignee.userId} 
              className="text-teal-700 bg-teal-300 rounded-full px-2 inline-flex justify-center
              items-center gap-1"
            >
              <p>{assignee.fullName}</p>
              <X onClick={() => removeAssignee(assignee.userId)} />
            </div>
          ))}
        </article>

        <AssignUsersDropdown 
          localAssignees={localAssignees}
          handleSelect={handleUserAssignment}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />

        <label htmlFor="dueDate" className="text-sm font-light block">
          Due date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          onChange={handleChange}
          className="mb-5 w-full px-5 py-2 border border-orange-100 rounded-md"
        />

        <AssignLabels onAssign={handleLabelAssignment} />

        <button
          type="button"
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <LoaderIcon className="w-full h-5 animate-spin" />
          ) : (
            "Create new task"
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateNewTaskForm;
