import { useListStore } from "../store/useList.store.js";
import CreateNewListForm from "../components/forms/CreateNewListForm.jsx";
import { X } from "lucide-react";

function CreateNewListModal() {
  const { isCreatingNewList, toggleNewListCreationModal } = useListStore();

  if (!isCreatingNewList) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleNewListCreationModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <button
          className="absolute top-2 right-2 hover:bg-red-400 hover:text-white rounded-md"
          onClick={toggleNewListCreationModal}
        >
          <X />
        </button>

        <CreateNewListForm />
      </div>
    </div>
  );
}

export default CreateNewListModal;
