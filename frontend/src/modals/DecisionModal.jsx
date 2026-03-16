import DecisionButtons from "../components/buttons/DecisionButtons.jsx";
import { useWorkspaceStore } from "../store/useWorkspace.store.js";

function DecisionModal() {
  const {
    isMakingDecision,
    toggleDecisionModal,
    memberToPerformActionUpon,
    performAction,
  } = useWorkspaceStore();

  const handleAction = () => {
    performAction(memberToPerformActionUpon.action);
    toggleDecisionModal();
  }

  if(!isMakingDecision) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={toggleDecisionModal}
      />

      <div className="light-background relative z-10 rounded-xl shadow-lg p-6 w-11/12 md:max-w-md">
        <p className="font-light text-xl mb-5">{memberToPerformActionUpon.actionDescription}</p>

        <DecisionButtons onYes={handleAction} onNo={toggleDecisionModal} />
      </div>
    </div>
  );
}

export default DecisionModal