interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        {/* Burger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>

        <div className="font-bold text-gray-800 text-lg">NASA Explorer</div>

        {/* Simple Nav Links */}
        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="/apod" className="hover:text-blue-600 transition-colors">APOD</a>
          <a href="/mars" className="hover:text-blue-600 transition-colors">Mars Rover</a>
          <a href="/neows" className="hover:text-blue-600 transition-colors">NeoWs</a>
          <a href="/3d-neows" className="hover:text-blue-600 transition-colors">NeoWs-3D</a>
        </nav>
      </div>

      {/* User avatar placeholder */}
      <div className="relative group">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer shadow">
          <span className="text-white text-sm font-bold">U</span>
        </div>
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition">
          <div className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-50">Profile (soon)</div>
          <div className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-50">Settings (soon)</div>
          <div className="px-4 py-2 text-gray-400 text-sm cursor-not-allowed">Logout</div>
        </div>
      </div>
    </header>
  );
}