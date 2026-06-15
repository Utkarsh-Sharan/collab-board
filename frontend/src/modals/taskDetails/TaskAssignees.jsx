import { Edit } from "lucide-react";
import EditAssigneesModal from "../EditAssigneesModal";
import { useAuthStore } from "../../store/useAuth.store";
import { useWorkspaceStore } from "../../store/useWorkspace.store";
import { useListStore } from "../../store/useList.store";

function TaskAssignees({ data }) {
  const {currentTask} = useListStore();

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
          {currentTask.assignedTo.length <= 2 ?
          currentTask.assignedTo.map((assignee, i) => (
            <img src={assignee.avatar}
              alt="user-profile"
              className={`${i === 0 ? "-z-10" : "z-10 absolute top-0 left-6"} w-8 h-8 rounded-full border border-white`}/>
          )) :
          <>
            {currentTask.assignedTo.map((assignee, i) => (
              <img src={assignee.avatar}
                alt="user-profile"
                className={`${i === 0 ? "-z-10" : "z-10 absolute top-0 left-6"} w-8 h-8 rounded-full border border-white`}/>
            ))}
            <div className="absolute top-0 left-12 z-20 w-8 h-8 rounded-full bg-gray-200 border border-white text-center text-lg">
              {currentTask.assignedTo.length <= 9 ?
              `+${currentTask.assignedTo.length - 2}` :
              "9+"}
            </div>
          </>
          }
        </div>
      </article>

      <EditAssigneesModal data={data} />
    </>
  );
}

export default TaskAssignees;
