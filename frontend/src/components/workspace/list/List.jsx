import { Plus } from "lucide-react";

function List() {
  return (
    <section className="flex flex-col items-center">
      <article className="max-w-md flex flex-col sm:flex-row justify-center items-center text-center gap-5 border border-dashed border-teal-400 rounded-2xl bg-white/50 p-5 cursor-pointer hover:bg-white">
        <div className="bg-orange-100 text-orange-400 w-16 h-16 rounded-full p-5">
          <Plus />
        </div>

        <h5 className="font-medium text-2xl">Create New List</h5>
      </article>

      <section className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <h1>Hello</h1>
      </section>
    </section>
  );
}

export default List;
