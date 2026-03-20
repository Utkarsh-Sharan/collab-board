import { useState } from "react";
import { useWorkspaceStore } from "../../store/useWorkspace.store";

function UpdateBoardDetailsForm() {
  const [boardDetails, setBoardDetails] = useState({
    title: "",
    description: "",
  });

  const { updateBoard } = useWorkspaceStore();

  const handleChange = (e) => {
    setBoardDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    updateBoard(boardDetails);
  };

  return (
    <form>
      <div className="mt-10">
        <h1 className="text-3xl">Update Board Details</h1>
        <p className="text-orange-400 text-lg">
          Please enter the details to update your board.
        </p>
      </div>

      <div className="mt-10">
        <label htmlFor="title" className="text-sm font-light">
          Title
        </label>
        <input
          type="text"
          placeholder="Give a title"
          className="mb-5 w-full px-5 py-2 border border-orange-100 rounded-md"
          name="title"
          value={boardDetails.title}
          onChange={handleChange}
        />

        <label htmlFor="description" className="text-sm font-light">
          Description
        </label>
        <input
          type="text"
          placeholder="Give a description"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="description"
          value={boardDetails.description}
          onChange={handleChange}
        />

        <button
          type="button"
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
          onClick={handleSubmit}
        >
          Update board details
        </button>
      </div>
    </form>
  );
}

export default UpdateBoardDetailsForm;
