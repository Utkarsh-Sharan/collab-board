import React from "react";
import { useListStore } from "../../../store/useList.store.js";

function TaskCard({ data, listTitle }) {
  const { setCurrentTask, setCurrentListTitle, toggleTaskDetailsModal } =
    useListStore();

    console.log(data);

  const dueDate = new Date(data.dueDate).toLocaleDateString("en-GB");
  const labels = data.labels.map((label, idx) => ({
    id: `${label}-${idx}`,
    value: label,
  }));

  const handleClick = () => {
    setCurrentListTitle(listTitle);
    setCurrentTask(data);
    
    toggleTaskDetailsModal();
  };

  return (
    <article
      className="flex flex-col gap-2 items-start justify-center bg-white shadow-md rounded-md p-3 cursor-pointer hover:bg-white/70"
      onClick={handleClick}
    >
      <div className="flex gap-2">
        {labels.length > 0 &&
          labels.map((label) => (
            <div
              key={label.id}
              className="border border-orange-400 bg-orange-200 text-orange-400 rounded-full font-semibold uppercase text-xs px-1"
            >
              {label.value}
            </div>
          ))}
      </div>

      <p className="text-lg">{data.title}</p>

      <div className="w-full flex justify-between items-center text-sm">
        <p>Due: {dueDate}</p>

        <div className="relative z-30">
          <img
            src={data.assignedTo[0].avatar}
            alt="user-profile"
            className={`${data.assignedTo.length > 1 && "absolute -z-10"} right-4 top-0 w-6 h-6 rounded-full`}
          />
          
          {data.assignedTo.length > 1 && 
          <div className="w-6 h-6 rounded-full bg-gray-200 text-center text-sm">
            {data.assignedTo.length <= 9 ? `+${data.assignedTo.length - 1}` : "9+"}
          </div>}
        </div>
      </div>
    </article>
  );
}

export default React.memo(TaskCard);
