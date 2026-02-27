import Board from "./Board.jsx";
import Header from "./Header.jsx";

function Workspace() {
  return (
    <section className="w-full pt-20 md:pt-0">
      <Header />
      <section className="px-6 py-7">
        <header className="mb-10">
          <h1 className="font-semibold text-4xl">Your Workspace</h1>
          <h5 className="font-light text-lg text-gray-400">
            Manage your teams, boards, lists and tasks.
          </h5>
        </header>

        <Board />
      </section>
    </section>
  );
}

export default Workspace;
