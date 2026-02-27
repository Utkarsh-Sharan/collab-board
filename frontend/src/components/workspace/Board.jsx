import { ClipboardList, Plus, Star } from "lucide-react";
import BoardCard from "./BoardCard";

function Board() {
  const createNewBoard = () => {
    //Add board creation logic
    console.log("Clicked");
  };

  return (
    <>
      <section className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <article
          className="flex flex-col justify-center items-center text-center gap-5 border border-dashed border-teal-400 rounded-2xl bg-white/60 py-14"
          onClick={createNewBoard}
        >
          <div className="bg-orange-100 text-orange-400 w-16 h-16 rounded-full p-5">
            <Plus />
          </div>

          <h5 className="font-medium text-2xl">Create New Board</h5>
          <p className="text-gray-400">
            Launch you board, lead the collaboration
          </p>
        </article>

        <BoardCard />
      </section>
    </>
  );
}

export default Board;
