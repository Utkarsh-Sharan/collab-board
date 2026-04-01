import { ChevronDown, ChevronUp, Loader, Plus } from "lucide-react";
import ListCard from "./ListCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../store/useList.store";
import CreateNewListModal from "../../../modals/CreateNewListModal";
import DecisionModal from "../../../modals/DecisionModal";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../lib/axios";
import { useWorkspaceStore } from "../../../store/useWorkspace.store";
import TeamDropdown from "../team/TeamDropdown";
import CreateNewTaskModal from "../../../modals/CreateNewTaskModal";
import TaskDetailsModal from "../../../modals/TaskDetailsModal";

function List() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [teamDropdown, setTeamDropdown] = useState(false);

  const { setCurrentBoard } = useWorkspaceStore();

  const {
    isLoading,
    lists,
    getAllLists,
    renderList,
    toggleNewListCreationModal,
  } = useListStore();

  useEffect(() => {
    const onLoadHandler = async () => {
      try {
        const res = await axiosInstance.get(`/boards/${boardId}`);

        setBoard(res.data.data.board);
        setCurrentBoard(res.data.data.board);
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
  }, []);

  useEffect(() => {
    getAllLists(boardId);
  }, [renderList]);

  return (
    <>
      <section className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold text-xl text-orange-400">
              Board: <span className="text-black">{board?.title}</span>
            </p>

            <p className="font-semibold text-base text-orange-400">
              About:{" "}
              <span className="font-normal text-black">
                {board?.description}
              </span>
            </p>
          </div>

          <div className="relative">
            <button
              className={`flex gap-2 rounded-md hover:bg-gray-200 p-1 bg-white`}
              onClick={() => setTeamDropdown(!teamDropdown)}
            >
              <span>Team</span>

              {teamDropdown ? <ChevronUp /> : <ChevronDown />}
            </button>

            {teamDropdown && <TeamDropdown />}
          </div>
        </div>

        <article
          className="mt-5 max-w-md flex flex-col sm:flex-row justify-center items-center text-center gap-5 border border-dashed border-teal-400 rounded-2xl bg-white/50 p-5 cursor-pointer hover:bg-white"
          onClick={toggleNewListCreationModal}
        >
          <div className="bg-orange-100 text-orange-400 w-16 h-16 rounded-full p-5">
            <Plus />
          </div>
          <h5 className="font-medium text-2xl">Create New List</h5>
        </article>

        {isLoading ? (
          <Loader className="mt-5 animate-spin" />
        ) : lists?.length > 0 ? (
          <section className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lists.map((list) => (
              <ListCard key={list._id} listId={list._id} title={list.title} />
            ))}
          </section>
        ) : (
          <div className="mt-10 text-3xl text-gray-400">
            No lists made yet...
          </div>
        )}
      </section>

      <CreateNewListModal />
      <CreateNewTaskModal />
      <DecisionModal />
      <TaskDetailsModal />
    </>
  );
}

export default List;
