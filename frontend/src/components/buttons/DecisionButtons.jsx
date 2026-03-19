function DecisionButtons({onYes, onNo}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-5">
      <button
        className="bg-teal-500 text-white rounded-md w-1/2 py-2 text-xl"
        onClick={onYes}
      >
        Yes
      </button>
      <button
        className="bg-red-400 text-white rounded-md w-1/2 py-2 text-xl"
        onClick={onNo}
      >
        No
      </button>
    </div>
  );
}

export default DecisionButtons