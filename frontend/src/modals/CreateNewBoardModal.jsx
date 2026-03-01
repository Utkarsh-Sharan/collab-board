import { useState } from "react";
import { useWorkspaceStore } from "../store/useWorkspace.store";
import { LoaderIcon, X } from "lucide-react";

function CreateNewBoardModal() {
  const [newBoardFormData, setNewBoardFormData] = useState({
    title: "",
    description: "",
  });
  const {
    isLoading,
    isCreatingNewBoard,
    toggleNewBoardCreationModal,
    createBoard,
  } = useWorkspaceStore();

  if (!isCreatingNewBoard) return null;

  const handleChange = (e) => {
    setNewBoardFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createBoard(newBoardFormData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleNewBoardCreationModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleNewBoardCreationModal}
        >
          <X />
        </button>
        <div className="mt-10">
          <h1 className="text-3xl">Create A Board</h1>
          <p className="text-orange-400 text-lg">
            Create with clarity, collaborate with confidence.
          </p>
        </div>

        <form>
          <div className="mt-10">
            <h4 className="text-sm font-light">Title</h4>
            <input
              type="text"
              placeholder="Give a title to your board"
              className="w-full px-5 py-2 border border-orange-100 rounded-md"
              name="title"
              value={newBoardFormData.title}
              onChange={handleChange}
            />

            <h4 className="mt-5 text-sm font-light">Description</h4>
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
      </div>
    </div>
  );
}

export default CreateNewBoardModal;
