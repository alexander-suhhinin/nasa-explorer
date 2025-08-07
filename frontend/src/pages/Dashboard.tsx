import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { RocketLaunchIcon, CameraIcon, GlobeAltIcon, CubeTransparentIcon, SparklesIcon } from '@heroicons/react/24/outline';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function Dashboard() {
  const cards = [
    {
      title: 'Astronomy Picture of the Day',
      desc: 'Explore daily astronomy images with explanations from NASA.',
      to: '/apod',
      size: 'col-span-1 sm:col-span-2',
      icon: <RocketLaunchIcon className="w-10 h-10 text-blue-600 mb-4" />,
      image: '/previews/apod.jpg',
    },
    {
      title: 'Mars Rover Photos',
      desc: "Browse photos captured by NASA's rovers on the Red Planet.",
      to: '/mars',
      size: 'col-span-1',
      icon: <CameraIcon className="w-10 h-10 text-red-600 mb-4" />,
      image: '/previews/mars.jpg',
    },
    {
      title: 'Near-Earth Objects (NeoWs)',
      desc: 'Track near-Earth asteroids and check which are potentially hazardous.',
      to: '/neows',
      size: 'col-span-1',
      icon: <GlobeAltIcon className="w-10 h-10 text-yellow-600 mb-4" />,
      image: '/previews/neows.jpg',
    },
    {
      title: 'NeoWs 3D Visualization',
      desc: 'Interactive 3D view of near-Earth asteroids orbiting our planet.',
      to: '/3d-neows',
      size: 'col-span-1 sm:col-span-2',
      icon: <CubeTransparentIcon className="w-10 h-10 text-purple-600 mb-4" />,
      image: '/previews/3d.jpg',
    },
    {
      title: 'Coming Soon',
      desc: 'More exciting NASA features on the way!',
      to: '#',
      size: 'col-span-1 sm:col-span-2',
      icon: <SparklesIcon className="w-10 h-10 text-gray-500 mb-4" />,
      image: '/previews/coming-soon.jpg',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.to}
          className={`${card.size} w-full flex flex-col`}
          initial="hidden"
          animate="visible"
          custom={i}
          variants={cardVariants}
        >
          <Card
            className="flex flex-col items-center text-center transition transform hover:scale-[1.02] hover:shadow-xl cursor-pointer h-full"
          >
            {card.image && (
              <img src={card.image} alt={card.title} className="w-full h-32 sm:h-40 object-cover rounded-lg" />
            )}
            <div className="w-full flex flex-row items-start mt-2 px-2">
              <span className="w-10 h-10 flex-none mr-2">
                {card.icon}
              </span>
              <h2 className="text-lg sm:text-xl font-bold mb-2 flex-1 text-left">{card.title}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4 px-2">{card.desc}</p>
            <Link to={card.to} className="mt-auto">
              <motion.button
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Explore
              </motion.button>
            </Link>
          </Card>
        </motion.div>
      ))}

      {/* Future registration button */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center mt-6">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition hidden">
          Register for more
        </button>
      </div>
    </motion.div>
  );
}