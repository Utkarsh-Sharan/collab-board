import { useWorkspaceStore } from "../../../store/useWorkspace.store.js";
import { ActionDescriptionEnum, ActionsOnEntitiesEnum } from "../../../utils/constants.js";

function BoardSettingsDropdown() {
  const {
    currentBoard,
    setTargetEntity,
    toggleDecisionModal,
  } = useWorkspaceStore();

  const handleDelete = async () => {
    setTargetEntity({
      entityId: currentBoard._id,
      actionDescription: ActionDescriptionEnum.DELETE_BOARD,
      action: ActionsOnEntitiesEnum.DELETE_BOARD,
    });
    
    toggleDecisionModal();
  };

  return (
    <>
      <article className="absolute z-10 shadow-lg right-0 top-10 w-40 border border-gray-200 bg-white rounded-lg text-left p-2">
        <button
          className="w-full rounded-md mt-3 py-1 hover:bg-gray-200"
          //   onClick={toggleBoardTeamModal}  TODO: Create favourites feature
        >
          Mark as favourite
        </button>

        <button
          className="w-full rounded-md mt-3 py-1 text-red-400 hover:bg-red-200"
          onClick={handleDelete}
        >
          Delete board
        </button>
      </article>
    </>
  );
}

export default BoardSettingsDropdown;
