import UpdateBoardDetailsForm from "../components/forms/UpdateBoardDetailsForm";
import { useWorkspaceStore } from "../store/useWorkspace.store";
import { X } from "lucide-react";

function UpdateBoardDetailsModal() {
  const { isUpdatingBoardDetails, toggleBoardUpdationModal } =
    useWorkspaceStore();

  if (!isUpdatingBoardDetails) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleBoardUpdationModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleBoardUpdationModal}
        >
          <X />
        </button>

        <UpdateBoardDetailsForm />
      </div>
    </div>
  );
}

export default UpdateBoardDetailsModal;
