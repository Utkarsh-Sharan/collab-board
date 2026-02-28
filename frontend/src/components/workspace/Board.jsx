import { Loader, Plus } from "lucide-react";
import BoardCard from "./BoardCard.jsx";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

function Board() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onLoadHandler = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/boards/");

        setBoards(res.data.data.boards);
      } catch (error) {
        const backend = error.response?.data;
        const message =
          (backend?.errors && Object.values(backend.errors)[0]) ||
          backend?.message ||
          "Something went wrong!";

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    onLoadHandler();
  }, []);

  const createNewBoard = () => {
    //Add board creation logic
    console.log("Clicked");
  };

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

        {isLoading ? (
          <Loader className="h-5 animate-spin" />
        ) : (
          boards.map((board) => {
            return (
              <BoardCard
                key={board._id}
                title={board.title}
                desc={board.description}
              />
            );
          })
        )}
      </section>
    </>
  );
}

export default Board;
