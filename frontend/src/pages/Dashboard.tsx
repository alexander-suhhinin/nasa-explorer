

import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* APOD Card */}
      <Card className="flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold mb-2">Astronomy Picture of the Day</h2>
        <p className="text-gray-600 text-sm mb-4 px-2">
          Explore daily astronomy images with explanations from NASA.
        </p>
        <Link
          to="/apod"
          className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore
        </Link>
      </Card>

      {/* Mars Rover Card */}
      <Card className="flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold mb-2">Mars Rover Photos</h2>
        <p className="text-gray-600 text-sm mb-4 px-2">
          Browse photos captured by NASA's rovers on the Red Planet.
        </p>
        <Link
          to="/mars"
          className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore
        </Link>
      </Card>

      {/* NeoWs Card */}
      <Card className="flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold mb-2">Near-Earth Objects (NeoWs)</h2>
        <p className="text-gray-600 text-sm mb-4 px-2">
          Track near-Earth asteroids and check which are potentially hazardous.
        </p>
        <Link
          to="/neows"
          className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore
        </Link>
      </Card>

      {/* Future registration button */}
      <div className="md:col-span-3 flex justify-center mt-6">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition hidden">
          Register for more
        </button>
      </div>
    </div>
  );
}