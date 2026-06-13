import { Edit } from "lucide-react";
import EditAssigneesModal from "../EditAssigneesModal";
import { useAuthStore } from "../../store/useAuth.store";
import { useWorkspaceStore } from "../../store/useWorkspace.store";

function TaskAssignees({ data }) {
  return (
    <>
      <article>
        <div className="mb-3 flex justify-start items-center gap-2">
          <p className="text-sm text-gray-400">ASSIGNEES</p>

          {!data.isViewer && 
          <Edit
            size={17}
            className="text-teal-400 cursor-pointer text-sm"
            onClick={() => data.startEdit("taskAssignees")}
          />}
        </div>

        <div className="relative z-30">
          <img
            src="/collab-board-icon.png"
            alt="user-profile"
            className="-z-10 w-8 h-8 rounded-full border border-white"
          />

          <img
            src="/collab-board-icon.png"
            alt="user-profile"
            className="absolute top-0 left-6 z-10 w-8 h-8 rounded-full border border-white"
          />

          <div className="absolute top-0 left-12 z-20 w-8 h-8 rounded-full bg-gray-200 border border-white text-center text-lg">
            9
          </div>
        </div>
      </article>

      <EditAssigneesModal data={data} />
    </>
  );
}

export default TaskAssignees;
