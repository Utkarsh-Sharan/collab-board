import { ChevronDown, ChevronUp, ClipboardList, Star } from "lucide-react";
import TeamDropdown from "./team/TeamDropdown";

function BoardCard({board, isDropdownActive, onToggle}) {
  return (
    <article className="flex flex-col justify-between items-start gap-5 border border-orange-200 rounded-2xl bg-white p-5">
      <div className="w-full">
        <div className="w-full flex justify-between items-start mb-5">
          <ClipboardList size={55} />
          <Star />
        </div>

        <h5 className="font-medium text-2xl">{board.title}</h5>

        <p className="line-clamp-2 text-gray-400">
          {board.description ? board.description : "No description..."}
        </p>
      </div>

      <div className="relative w-full flex justify-between items-center border-t-2 pt-2">
        <button
          className={`flex gap-2 rounded-md ${isDropdownActive && "bg-gray-200"} hover:bg-gray-200 px-1 py-1`}
          onClick={onToggle}
        >
          <span>Team</span>

          {isDropdownActive ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isDropdownActive && <TeamDropdown members={board.members} />}

        <button className="rounded-md bg-teal-400 px-2 py-1 text-white">
          View Board
        </button>
      </div>
    </article>
  );
}

export default BoardCard;
