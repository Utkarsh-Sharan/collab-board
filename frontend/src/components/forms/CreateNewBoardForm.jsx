import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useWorkspaceStore } from "../../store/useWorkspace.store.js";

function CreateNewBoardForm() {
  const [newBoardFormData, setNewBoardFormData] = useState({
    title: "",
    description: "",
  });
  const {
      isLoading,
      createBoard,
    } = useWorkspaceStore();

  const handleChange = (e) => {
    setNewBoardFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createBoard(newBoardFormData);
    setNewBoardFormData({
      title: "",
      description: "",
    });
  };

  return (
    <form>
      <div className="mt-10">
        <label htmlFor="title" className="text-sm font-light">
          Title
        </label>
        <input
          type="text"
          placeholder="Give a title to your board"
          className="mb-5 w-full px-5 py-2 border border-orange-100 rounded-md"
          name="title"
          value={newBoardFormData.title}
          onChange={handleChange}
        />

        <label htmlFor="description" className="text-sm font-light">
          Description
        </label>
        <input
          type="text"
          placeholder="Add a description"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="description"
          value={newBoardFormData.description}
          onChange={handleChange}
        />

        <button
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <LoaderIcon className="w-full h-5 animate-spin" />
          ) : (
            "Create new board"
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateNewBoardForm;
