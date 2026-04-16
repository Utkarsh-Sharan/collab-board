import { Edit, X } from "lucide-react";
import { maxLabels } from "../../utils/constants.js";
import { useEffect, useState } from "react";

function TaskLabels({ data }) {
  const [localLabels, setLocalLabels] = useState(data.labels);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onLoadHandler = async () => {
      if (data.isEditing) setLocalLabels(data.labels);
    };

    onLoadHandler();
  }, [data.isEditing, data.labels]);

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  const isMaxLabels = () => maxLabels === localLabels.length;

  const addLabel = () => {
    if (!label.trim()) return;

    const newLabel = {
      id: `${label}-${Date.now()}`,
      value: label,
    };

    setLocalLabels((prev) => [...prev, newLabel]);
    setLabel("");
  };

  const removeLabel = (id) => {
    setLocalLabels((prev) => prev.filter((label) => label.id !== id));
  };

  const saveLabels = () => {
    data.updateField("labels", localLabels);
    data.endEdit("taskLabels");
  };

  return (
    <article className="relative">
      <div className="mb-3 flex justify-start items-center gap-2">
        <p className="text-sm text-gray-400">LABELS</p>

        <Edit
          size={17}
          className="text-teal-400 cursor-pointer text-sm"
          onClick={() => data.startEdit("taskLabels")}
        />

        {data.isEditing && (
          // This is a dropdown to edit labels
          <div className="absolute z-50 top-5 left-0 w-32 bg-white rounded-md shadow-md flex flex-col gap-1 justify-center items-start p-2">
            <X
              className="absolute right-1 top-1 w-4 h-4 bg-red-400 text-white rounded-md cursor-pointer"
              onClick={() => data.endEdit("taskLabels")}
            />

            <h4 className="mb-2 font-medium">Edit Labels:</h4>

            {localLabels?.map((label) => (
              <div
                key={label.id}
                className="w-full flex justify-center items-center gap-1"
              >
                <div className="w-full text-center border border-teal-400 bg-teal-100 text-teal-400 rounded-full font-semibold uppercase text-xs px-1">
                  {label.value}
                </div>

                <X
                  className="w-5 cursor-pointer"
                  onClick={() => removeLabel(label.id)}
                />
              </div>
            ))}

            <input
              type="text"
              value={label}
              autoFocus
              onChange={handleChange}
              className="w-full rounded-md px-2"
              placeholder={`${maxLabels - localLabels.length} left to add`}
              disabled={isMaxLabels()}
            />

            <div className="w-full flex flex-col gap-1 justify-center items-center">
              {/* This button will add labels */}
              <button
                className={`w-full mt-3 ${isMaxLabels() ? "bg-teal-700" : "bg-teal-400"}  rounded-full px-2`}
                disabled={isMaxLabels()}
                onClick={addLabel}
              >
                Add label
              </button>

              {/* This button will save changes to details data (coming from parent) */}
              <button
                className="w-full bg-orange-400 rounded-full px-2"
                onClick={saveLabels}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 justify-center items-start">
        {data.labels?.map((label) => (
          <div
            key={label.id}
            className="border border-orange-400 bg-orange-100 text-orange-400 rounded-full font-semibold uppercase text-xs px-1"
          >
            {label.value}
          </div>
        ))}
      </div>
    </article>
  );
}

export default TaskLabels;
