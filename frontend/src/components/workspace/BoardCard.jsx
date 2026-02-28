import { ClipboardList, Star } from "lucide-react";

function BoardCard({title, desc}) {
  return (
    <article className="flex flex-col justify-between items-start gap-5 border border-orange-200 rounded-2xl bg-white p-5">
      <div className="w-full">
        <div className="w-full flex justify-between items-start mb-5">
          <ClipboardList size={55} />
          <Star />
        </div>

        <h5 className="font-medium text-2xl">{title}</h5>

        <p className="line-clamp-2 text-gray-400">
          {desc ? desc : "No description..."}
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
