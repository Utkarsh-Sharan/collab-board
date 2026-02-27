import { ClipboardList, Star } from "lucide-react";

function BoardCard() {
  return (
    <article className="flex flex-col justify-between items-start gap-5 border border-orange-200 rounded-2xl bg-white p-5">
      <div>
        <div className="w-full flex justify-between items-start mb-5">
          <ClipboardList size={55} />
          <Star />
        </div>

        <h5 className="font-medium text-2xl">Product Launch Q4</h5>

        <p className="text-gray-400">
          Coordination for the upcoming major release...
        </p>
      </div>

      <div className="w-full flex justify-between items-center border-t-2 pt-2">
        <p>Hi</p>

        <button className="rounded-md bg-teal-400 px-3 py-1 text-white">
          View
        </button>
      </div>
    </article>
  );
}

export default BoardCard;
