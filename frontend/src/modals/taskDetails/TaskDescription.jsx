import { LucideListTodo } from "lucide-react";
import { useAuthStore } from "../../store/useAuth.store";
import { useWorkspaceStore } from "../../store/useWorkspace.store";

function TaskDescription({ data }) {
  return (
    <article>
      <div className="mb-2 flex justify-start items-center gap-2">
        <LucideListTodo />

        <p className="font-semibold">Description</p>
      </div>

      {!data.isViewer ?
      <textarea
        value={data.currentDescription}
        onChange={(e) => data.updateField("description", e.target.value)}
        onFocus={() => data.startEdit("taskDescription")}
        onBlur={() => data.endEdit("taskDescription")}
        className="w-full h-40 rounded-lg bg-gray-200 focus:bg-white min-h-10 max-h-40 overflow-y-auto py-2 pl-2 pr-5"
      /> :
      <p>{data.currentDescription}</p>}
    </article>
  );
}

export default TaskDescription;
