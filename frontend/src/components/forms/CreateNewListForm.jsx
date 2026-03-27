import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useListStore } from "../../store/useList.store";
import { useParams } from "react-router-dom";

function CreateNewListForm() {
  const [newListFormData, setNewListFormData] = useState({
    title: "",
  });
  const { boardId } = useParams();

  const { isLoading, createList, toggleNewListCreationModal } = useListStore();

  const handleChange = (e) => {
    setNewListFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createList(boardId, newListFormData);
    setNewListFormData({
      title: "",
    });

    toggleNewListCreationModal();
  };

  return (
    <form>
      <div className="mt-10">
        <h1 className="text-3xl">Create A List</h1>
        <p className="text-orange-400 text-lg">
          Organize with ease, achieve with focus.
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
          value={newListFormData.title}
          onChange={handleChange}
        />

        <button
          type="button"
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <LoaderIcon className="w-full h-5 animate-spin" />
          ) : (
            "Create new list"
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateNewListForm;
