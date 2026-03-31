import { PenBox, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../../../lib/axios.js";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import {
  ActionDescriptionEnum,
  ActionsOnEntitiesEnum,
} from "../../../utils/constants.js";
import TaskCard from "../task/TaskCard.jsx";
import { useListStore } from "../../../store/useList.store.js";
import { useEffect } from "react";

function ListCard({ listId, title }) {
  const [newTitle, setNewTitle] = useState(title);
  const [prevTitle, setPrevTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { boardId } = useParams();

  const { setTargetEntity, toggleDecisionModal } = useWorkspaceStore();
  const { setCurrentList, toggleNewTaskCreationModal, renderListCard } =
    useListStore();

  const updateListTitle = async () => {
    try {
      const res = await axiosInstance.put(`/boards/${boardId}/lists`, {
        listId: listId,
        title: newTitle,
      });

      setPrevTitle(newTitle);
      toast.success(res.data.message);
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    }
  };

  const deleteList = () => {
    setTargetEntity({
      entityId: { boardId: boardId, listId: listId },
      actionDescription: ActionDescriptionEnum.DELETE_LIST,
      action: ActionsOnEntitiesEnum.DELETE_LIST,
    });

    toggleDecisionModal();
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = async () => {
    setIsEditingTitle(false);

    if (newTitle === prevTitle) return;
    updateListTitle();
  };

  const handleClick = () => {
    setCurrentList(listId);
    toggleNewTaskCreationModal();
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      const data = { listId: listId };

      try {
        const res = await axiosInstance.post(
          `/boards/${boardId}/lists/tasks/all`,
          data,
        );

        setTasks(res.data.data.tasks);
      } catch (error) {
        const backend = error?.response?.data;
        const message =
          (backend?.errors && Object.values(backend.errors)[0]) ||
          backend?.message ||
          "Something went wrong!";

        toast.error(message);
      }
    };

    onLoadHandler();
  }, [renderListCard]);

  return (
    <article className="flex flex-col gap-5 bg-teal-200 rounded-md px-2 py-4">
      <div className="flex justify-between items-center px-2">
        <div className="flex justify-start items-center gap-2">
          {isEditingTitle ? (
            <input
              type="text"
              value={newTitle}
              autoFocus
              onChange={handleChange}
              onBlur={handleBlur}
              className="font-medium rounded-md px-2 w-24"
            />
          ) : (
            <p className="font-medium">{newTitle}</p>
          )}

          <p className="text-teal-500 bg-white/60 rounded-full text-center px-2">
            1
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button onClick={() => setIsEditingTitle(true)}>
            <PenBox
              className="text-teal-500 bg-white/60 p-1 rounded-md"
              size={25}
            />
          </button>
          <button onClick={deleteList}>
            <Trash2
              className="text-red-300 bg-white/60 p-1 rounded-md"
              size={25}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {tasks?.length > 0 ? (
          tasks?.map((task) => <TaskCard key={task._id} data={task} />)
        ) : (
          <p className="text-gray-400 px-2 text-lg">No tasks added yet...</p>
        )}
      </div>

      <button className="w-1/2 flex justify-start items-center gap-1 text-teal-700 cursor-pointer">
        <Plus size={20} />

        <p className="text-base" onClick={handleClick}>
          Add a task
        </p>
      </button>
    </article>
  );
}

export default ListCard;
