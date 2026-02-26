import SideBar from "../components/SideBar.jsx";
import Workspace from "../components/workspace/Workspace.jsx";
import UserSettingsModal from "../modals/UserSettingsModal.jsx";

function WorkspacePage() {
  return (
    <>
      <section className="h-full flex">
        <SideBar />
        <Workspace />
      </section>

      <UserSettingsModal />
    </>
  );
}

export default WorkspacePage;
