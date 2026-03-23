import { Plus } from "lucide-react";

function ListCard() {
  return (
    <article className="flex flex-col gap-5 bg-teal-200 rounded-md px-2 py-4">
      <div className="flex justify-start items-center gap-4">
        <p className="font-medium">&lt;list-title&gt;</p>

        <p className="rounded-full bg-teal-100 text-teal-500 text-center px-2">
          1
        </p>
      </div>

      <div className="w-full flex justify-start items-center gap-1 text-teal-700">
        <Plus size={20} />

        <p className="text-base">Add a task</p>
      </div>
    </article>
  );
}

export default ListCard;
