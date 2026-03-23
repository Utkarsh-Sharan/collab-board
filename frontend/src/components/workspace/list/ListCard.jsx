import { PenBox, Plus, Trash2 } from "lucide-react";

function ListCard() {
  return (
    <article className="flex flex-col gap-5 bg-teal-200 rounded-md px-2 py-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <p className="font-medium">&lt;list-title&gt;</p>
          <p className="text-teal-500 bg-white/60 rounded-full text-center px-2">
            1
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button>
            <PenBox
              className="text-teal-500 bg-white/60 p-1 rounded-md"
              size={25}
            />
          </button>
          <button>
            <Trash2
              className="text-red-300 bg-white/60 p-1 rounded-md"
              size={25}
            />
          </button>
        </div>
      </div>

      {/* Add tasks here */}

      <button className="w-1/2 flex justify-start items-center gap-1 text-teal-700 cursor-pointer">
        <Plus size={20} />

        <p className="text-base">Add a task</p>
      </button>
    </article>
  );
}

export default ListCard;
