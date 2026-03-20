import SideBar from "../components/SideBar.jsx";
import Workspace from "../components/workspace/Workspace.jsx";
import BoardTeamModal from "../modals/BoardTeamModal.jsx";
import CreateNewBoardModal from "../modals/CreateNewBoardModal.jsx";
import DecisionModal from "../modals/DecisionModal.jsx";
import InviteMemberModal from "../modals/InviteMemberModal.jsx";
import UpdateBoardDetailsModal from "../modals/UpdateBoardDetailsModal.jsx";
import UserSettingsModal from "../modals/UserSettingsModal.jsx";

function WorkspacePage() {
  return (
    <>
      <section className="h-full flex">
        <SideBar />
        <Workspace />
      </section>

      <UserSettingsModal />
      <CreateNewBoardModal />
      <InviteMemberModal />
      <BoardTeamModal />
      <DecisionModal />
      <UpdateBoardDetailsModal />
    </>
  );
}

export default WorkspacePage;
