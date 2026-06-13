import { Edit } from "lucide-react";
import { useAuthStore } from "../../store/useAuth.store";
import { useWorkspaceStore } from "../../store/useWorkspace.store";

function TaskTitle({ data }) {
  return (
    <article className="mb-3 flex justify-start items-center gap-2">
      {data.isEditing ? (
        <input
          type="text"
          value={data.currentTitle}
          autoFocus
          onChange={(e) => data.updateField("title", e.target.value)}
          onBlur={() => data.endEdit("taskTitle")}
          className="font-medium rounded-md px-2"
        />
      ) : (
        <h1 className="font-medium text-2xl">{data.currentTitle}</h1>
      )}

      {!data?.isViewer && 
      <Edit
        className="text-teal-400 cursor-pointer"
        onClick={() => data.startEdit("taskTitle")}
      />}
    </article>
  );
}

export default TaskTitle;
