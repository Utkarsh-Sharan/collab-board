import React from "react";

function TaskCard() {
  return (
    <article className="flex flex-col gap-2 items-start justify-center bg-white shadow-md rounded-md p-3 cursor-pointer hover:bg-white/70">
      <div className="border border-orange-400 bg-orange-200 text-orange-400 rounded-md font-semibold uppercase text-sm px-1">
        Urgent
      </div>

      <p className="text-lg">This is an example title.</p>

      <div className="w-full flex justify-between items-center">
        <p>Deadline</p>

        <div className="relative z-30">
          <img
            src="/collab-board-icon.png"
            alt="user-profile"
            className="absolute -z-10 right-4 top-0 w-6 h-6 rounded-full"
          />

          <div className="w-6 h-6 rounded-full bg-gray-300 text-center">
            9+
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(TaskCard);
