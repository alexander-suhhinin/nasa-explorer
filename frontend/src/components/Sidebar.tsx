// frontend/src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CameraIcon, TableCellsIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/apod', label: 'APOD', icon: HomeIcon },
    { to: '/mars', label: 'Mars Rover', icon: CameraIcon },
    { to: '/neows', label: 'NeoWs', icon: TableCellsIcon },
    { to: '/3d-neows', label: 'NeoWs 3D', icon: GlobeAltIcon },
  ];

  return (
    <aside className="w-56 bg-white border-r flex flex-col h-full md:h-screen">
      {/* Logo - now a link to Dashboard */}
      <Link
        to="/"
        className="h-16 flex items-center px-6 border-b text-xl font-bold hover:text-blue-600 transition-colors"
      >
          <img
            src="/logo/nasa-logo.svg"
            alt="NASA Logo"
            className="h-10 w-auto"
          />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-4">
        {links.map((link) => {
          const active = location.pathname.startsWith(link.to);
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-6 py-2 rounded-r-full transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Optional spacer for footer alignment */}
      <div className="flex-1" />
    </aside>
  );
}