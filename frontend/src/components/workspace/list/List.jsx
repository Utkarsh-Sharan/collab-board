import { Plus } from "lucide-react";
import ListCard from "./ListCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../store/useList.store";
import CreateNewListModal from "../../../modals/CreateNewListModal";

function List() {
  const { boardId } = useParams();

  const { lists, getAllLists, renderList, toggleNewListCreationModal } =
    useListStore();

  useEffect(() => {
    getAllLists(boardId);
  }, [renderList]);

  return (
    <>
      <CreateNewListModal />
      <section className="flex flex-col items-center">
        <article
          className="max-w-md flex flex-col sm:flex-row justify-center items-center text-center gap-5 border border-dashed border-teal-400 rounded-2xl bg-white/50 p-5 cursor-pointer hover:bg-white"
          onClick={toggleNewListCreationModal}
        >
          <div className="bg-orange-100 text-orange-400 w-16 h-16 rounded-full p-5">
            <Plus />
          </div>

          <h5 className="font-medium text-2xl">Create New List</h5>
        </article>

        {lists?.length > 0 ? (
          <section className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lists.map((list) => (
              <ListCard key={list._id} title={list.title} />
            ))}
          </section>
        ) : (
          <div className="mt-10 text-3xl text-gray-400">
            No lists made yet...
          </div>
        )}
      </section>
    </>
  );
}

export default List;
