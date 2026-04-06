import { CalendarClock, Edit, List, LucideListTodo, X } from "lucide-react";
import { useListStore } from "../store/useList.store.js";
import { useEffect, useState } from "react";
import TaskTitle from "./taskDetails/TaskTitle.jsx";
import TaskDescription from "./taskDetails/TaskDescription.jsx";
import TaskLabels from "./taskDetails/TaskLabels.jsx";

function TaskDetailsModal() {
  const {
    toggleTaskDetails,
    toggleTaskDetailsModal,
    currentListTitle,
    currentTask,
  } = useListStore();

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
    assignees: currentTask?.assignees || [],
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

  useEffect(() => {
    const onLoadHandler = async () => {
      if (currentTask) {
        setDetails({
          title: currentTask.title,
          description: currentTask.description,
          labels: labels,
          assignees: currentTask.assignees,
        });
      }
    };

    onLoadHandler();
  }, [currentTask]);

  if (!toggleTaskDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
        <TaskTitle
          data={{
            isEditing: isEditing.taskTitle,
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
          <TaskLabels
            data={{
              isEditing: isEditing.taskLabels,
              labels: details.labels,
              startEdit: startEdit,
              endEdit: endEdit,
              updateField: updateField,
            }}
          />

          {/* Assignees */}
          {/* <div>
            <div className="mb-3 flex justify-start items-center gap-2">
              <p className="text-sm text-gray-400">ASSIGNEES</p>

              <Edit
                size={17}
                className="text-teal-400 cursor-pointer text-sm"
              />
            </div>

            <div className="relative z-30">
              <img
                src="/collab-board-icon.png"
                alt="user-profile"
                className="-z-10 w-8 h-8 rounded-full border border-white"
              />

              <img
                src="/collab-board-icon.png"
                alt="user-profile"
                className="absolute top-0 left-6 z-10 w-8 h-8 rounded-full border border-white"
              />

              <div className="absolute top-0 left-12 z-20 w-8 h-8 rounded-full bg-gray-200 border border-white text-center text-lg">
                9
              </div>
            </div>
          </div> */}

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
            startEdit: startEdit,
            endEdit: endEdit,
            updateField: updateField,
          }}
        />
      </div>
    </div>
  );
}

export default TaskDetailsModal;
