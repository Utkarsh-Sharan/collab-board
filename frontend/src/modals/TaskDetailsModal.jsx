import { CalendarClock, Edit, List, LucideListTodo, X } from "lucide-react";
import { useListStore } from "../store/useList.store.js";
import { useEffect, useState } from "react";
import TaskTitle from "./taskDetails/TaskTitle.jsx";
import TaskDescription from "./taskDetails/TaskDescription.jsx";
import TaskLabels from "./taskDetails/TaskLabels.jsx";
import TaskAssignees from "./taskDetails/TaskAssignees.jsx";
import { useAuthStore } from "../store/useAuth.store.js";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";

function TaskDetailsModal() {
  const {
    toggleTaskDetails,
    toggleTaskDetailsModal,
    currentListTitle,
    currentTask,
    currentList,
    updateTask,
  } = useListStore();
  const {authUser} = useAuthStore();
  const {currentBoard} = useWorkspaceStore();

  const member = currentBoard?.members.find((member) => member.userId === authUser._id);
  const isViewer = member?.role === "Viewer";

  const dueDate = new Date(currentTask?.dueDate).toLocaleDateString("en-GB");
  const labels = currentTask?.labels?.map((label, idx) => ({
    id: `${label}-${idx}`,
    value: label,
  }));

  const [isEditing, setIsEditing] = useState({
    taskTitle: false,
    taskLabels: false,
    taskAssignees: false,
  });
  const [details, setDetails] = useState({
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    labels: labels || [],
    assignedTo: currentTask?.assignedTo || [],
  });

  const updateField = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const endEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    updateTask(currentTask.boardId, currentTask.listId, details);
  }

  useEffect(() => {
    const onLoadHandler = async () => {
      if (currentTask) {
        setDetails({
          title: currentTask.title,
          description: currentTask.description,
          labels: labels,
          assignedTo: currentTask.assignedTo,
        });
      }
    };

    onLoadHandler();
  }, [currentTask]);

  if (!toggleTaskDetails) return null;

  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleTaskDetailsModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleTaskDetailsModal}
        >
          <X />
        </button>

        {/* List title */}
        <div className="flex justify-start items-center gap-2 mb-5 text-orange-400">
          <List />

          <h5 className="uppercase font-light text-base">{currentListTitle}</h5>
        </div>

        {/* Task title */}
        <TaskTitle data={{
            isEditing: isEditing.taskTitle,
            isViewer: isViewer,
            currentTitle: details.title,
            startEdit: startEdit,
            endEdit: endEdit,
            updateField: updateField,
          }}
        />

        <hr className="mb-3" />

        {/* Labels, assignees and due date */}
        <div className="flex justify-start items-start gap-10 mb-5">
          {/* Labels */}
          <TaskLabels data={{
              isEditing: isEditing.taskLabels,
              isViewer: isViewer,
              labels: details.labels,
              startEdit: startEdit,
              endEdit: endEdit,
              updateField: updateField,
            }}
          />

          {/* Assignees */}
          <TaskAssignees data={{
            isEditing: isEditing.taskAssignees,
            isViewer: isViewer,
            assignedTo: details.assignedTo,
            startEdit: startEdit,
            endEdit: endEdit,
            updateField: updateField,
          }} />

          {/* Due date */}
          <div>
            <p className="text-sm text-gray-400 mb-2">DUE DATE</p>

            <div className="flex justify-start items-center gap-2 border border-orange-400 bg-orange-100 text-orange-400 rounded-full font-semibold uppercase text-sm px-2 py-1">
              <CalendarClock size={20} />

              {dueDate}
            </div>
          </div>
        </div>

        {/* Description */}
        <TaskDescription
          data={{
            currentDescription: details.description,
            isViewer: isViewer,
            startEdit: startEdit,
            endEdit: endEdit,
            updateField: updateField,
          }}
        />

        {member.role !== "Viewer" &&
        <button 
          className="w-full bg-orange-400 font-semibold rounded-md py-2 mt-5"
          onClick={handleSubmit}
        >
          Save Changes
        </button>}
      </div>
    </article>
  );
}

export default TaskDetailsModal;
