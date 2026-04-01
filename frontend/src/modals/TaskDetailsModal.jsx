import { CalendarClock, List, LucideListTodo, X } from "lucide-react";
import { useListStore } from "../store/useList.store.js";
import { useEffect, useState } from "react";

function TaskDetailsModal() {
  const {
    toggleTaskDetails,
    toggleTaskDetailsModal,
    currentListTitle,
    currentTask,
  } = useListStore();

  const [description, setDescription] = useState(currentTask?.description);

  const dueDate = new Date(currentTask?.dueDate).toLocaleDateString("en-GB");
  const labels = currentTask?.labels?.map((label, idx) => ({
    id: `${label}-${idx}`,
    value: label,
  }));

  const handleChange = (e) => {
    setDescription(e.target.value);
  }

  useEffect(() => {
    const onLoadHandler = async () => {
      currentTask?.description
        ? setDescription(currentTask.description)
        : setDescription("Add a description...");
    };

    onLoadHandler();
  }, [currentTask])

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

        <div className="flex justify-start items-center gap-2 mb-5 text-teal-500">
          <List />

          <h5 className="uppercase font-light text-base">{currentListTitle}</h5>
        </div>

        <h1 className="font-medium text-2xl mb-3">{currentTask.title}</h1>

        <hr className="mb-3" />

        <div className="flex justify-start items-start gap-10 mb-5">
          <div>
            <p className="mb-2 text-sm text-gray-400">LABELS</p>

            <div className="flex flex-col gap-1 justify-center items-start">
              {labels?.map((label) => (
                <div
                  key={label.id}
                  className="border border-teal-400 bg-teal-200 text-teal-400 rounded-full font-semibold uppercase text-sm px-1"
                >
                  {label.value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">ASSIGNEES</p>

            <div className="relative z-30">
              <img
                src="/collab-board-icon.png"
                alt="user-profile"
                className="-z-10 w-6 h-6 rounded-full"
              />

              <div className="absolute top-0 left-4 w-6 h-6 rounded-full bg-gray-200 text-center text-sm">
                9+
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">DUE DATE</p>

            <div className="flex justify-start items-center gap-2 border border-teal-400 bg-teal-200 text-teal-400 rounded-full font-semibold uppercase text-sm px-2 py-1">
              <CalendarClock />

              {dueDate}
            </div>
          </div>
        </div>

        <div className="mb-2 flex justify-start items-center gap-2">
          <LucideListTodo />

          <p className="font-semibold">Description</p>
        </div>

        <div className="relative">
          <textarea
            name="description"
            className="w-full h-40 rounded-lg bg-gray-200 focus:bg-white max-h-40 overflow-y-auto py-2 pl-2 pr-10"
            value={description}
            onChange={handleChange}
          />

          <button className="absolute right-4 bottom-2 text-teal-500 cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
