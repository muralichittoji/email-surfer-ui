import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between md:justify-start">
      {/* Hamburger (Mobile Only) */}
      <button
        className="md:hidden mr-2"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-bold">EmailSurfer</h1>
    </header>
  );
}
