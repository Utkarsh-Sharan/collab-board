import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  EllipsisVertical,
} from "lucide-react";
import TeamDropdown from "../team/TeamDropdown";
import BoardSettingsDropdown from "./BoardSettingsDropdown";

function BoardCard({
  board,
  isTeamDropdownActive,
  isSettingsDropdownActive,
  toggleTeamDropdown,
  toggleSettingsDropdown,
}) {
  return (
    <article className="flex flex-col justify-between items-start gap-5 border border-orange-200 rounded-2xl bg-white p-5">
      <div className="w-full">
        <div className="relative w-full flex justify-between items-center mb-5">
          <ClipboardList size={55} />
          <EllipsisVertical
            className={`cursor-pointer ${isSettingsDropdownActive && "bg-gray-200"} hover:bg-gray-200 rounded-md`}
            onClick={toggleSettingsDropdown}
          />

          {isSettingsDropdownActive && <BoardSettingsDropdown />}
        </div>

        <h5 className="font-medium text-2xl">{board.title}</h5>

        <p className="line-clamp-2 text-gray-400">
          {board.description ? board.description : "No description..."}
        </p>
      </div>

      <div className="relative w-full flex justify-between items-center border-t-2 pt-2">
        <button
          className={`flex gap-2 rounded-md ${isTeamDropdownActive && "bg-gray-200"} hover:bg-gray-200 p-1`}
          onClick={toggleTeamDropdown}
        >
          <span>Team</span>

          {isTeamDropdownActive ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isTeamDropdownActive && <TeamDropdown />}

        <button className="rounded-md bg-teal-400 px-2 py-1 text-white">
          View Board
        </button>
      </div>
    </article>
  );
}

export default BoardCard;
