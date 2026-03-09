import { Loader, Plus } from "lucide-react";
import BoardCard from "./BoardCard.jsx";
import { useWorkspaceStore } from "../../store/useWorkspace.store.js";
import { useEffect, useState } from "react";

function Board() {
  const [activeDropdownBoardId, setActiveDropdownBoardId] = useState(null);

  const {
    isLoading,
    refreshBoards,
    boards,
    setCurrentBoard,
    toggleNewBoardCreationModal,
  } = useWorkspaceStore();

  const getAllBoards = useWorkspaceStore((state) => state.getAllBoards);

  const handleDropdownToggle = (board) => {
    setCurrentBoard(board);
    setActiveDropdownBoardId((prev) => prev === board._id ? null : board._id)
  }

  useEffect(() => {
    getAllBoards();
  }, [refreshBoards, getAllBoards]);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <article
          className="flex flex-col justify-center items-center text-center gap-5 border border-dashed border-teal-400 rounded-2xl bg-white/50 py-14 cursor-pointer hover:bg-white"
          onClick={toggleNewBoardCreationModal}
        >
          <div className="bg-orange-100 text-orange-400 w-16 h-16 rounded-full p-5">
            <Plus />
          </div>

          <h5 className="font-medium text-2xl">Create New Board</h5>
          <p className="text-gray-400">
            Launch you board, lead the collaboration
          </p>
        </article>

        {isLoading ? (
          <Loader className="h-5 animate-spin" />
        ) : (
          boards?.length && boards?.map((board) => {
            return (
              <BoardCard
                key={board._id}
                board={board}
                isDropdownActive={activeDropdownBoardId === board._id}
                onToggle={() => handleDropdownToggle(board)}
              />
            );
          })
        )}
      </section>
    </>
  );
}

export default Board;
