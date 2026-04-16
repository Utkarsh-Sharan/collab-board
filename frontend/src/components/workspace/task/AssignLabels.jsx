import { X } from "lucide-react";
import { useState } from "react";

function AssignLabels({ onAssign }) {
  const maxLabels = 3;

  const [labels, setLabels] = useState([]);
  const [label, setLabel] = useState("");
  
  const handleLabelSubmit = () => {
    if (!label.trim() || labels.length === maxLabels) return;
    
    const newLabel = {
      id: Date.now(),
      name: label.trim(),
    };
    
    const newLabels = [...labels, newLabel]
    const labelNames = newLabels.map((label) => label.name);
    
    setLabels(newLabels);
    onAssign(labelNames);
    
    setLabel("");
  };
  
  const removeLabel = (id) => {
    const updatedLabels = labels.filter((label) => label.id !== id);
    const labelNames = updatedLabels.map((label) => label.name);
    
    setLabels(updatedLabels);
    onAssign(labelNames);
  };
  return (
    <div className="relative w-full mb-5">
      <div className="flex flex-wrap gap-2 mb-2">
        {labels?.map((label) => (
          <span
            key={label.id}
            className="flex items-center bg-teal-300 text-teal-800 px-2 py-1 rounded-full text-sm uppercase"
          >
            {label.name}

            <button onClick={() => removeLabel(label.id)} className="ml-1">
              <X size={17} />
            </button>
          </span>
        ))}
      </div>

      <label htmlFor="label" className="text-sm font-light">
        {"Assign labels (3 labels max)"}
      </label>
      <div className="w-full flex gap-2">
        <input
          type="text"
          name="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="px-5 py-2 border border-orange-100 rounded-md"
          placeholder={`${maxLabels - labels.length} left`}
          disabled={labels.length === maxLabels}
        />

        <button
          type="button"
          className="bg-teal-300 text-white px-2 py-1 rounded-md text-sm w-full"
          onClick={handleLabelSubmit}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default AssignLabels;
