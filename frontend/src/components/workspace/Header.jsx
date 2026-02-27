import { Search } from "lucide-react";

function Header() {
  return (
    <nav className="border-b-2 h-20 flex justify-center items-center">
      <input
        type="text"
        className="w-3/4 md:w-1/3 h-1/2 px-3 rounded-lg border border-gray-300"
        placeholder="Search workspace..."
      />
    </nav>
  );
}

export default Header;
