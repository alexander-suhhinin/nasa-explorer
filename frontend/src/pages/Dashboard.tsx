import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
    { title: 'Astronomy Picture of the Day', desc: 'Explore daily astronomy images with explanations from NASA.', to: '/apod' },
    { title: 'Mars Rover Photos', desc: "Browse photos captured by NASA's rovers on the Red Planet.", to: '/mars' },
    { title: 'Near-Earth Objects (NeoWs)', desc: 'Track near-Earth asteroids and check which are potentially hazardous.', to: '/neows' },
    { title: 'NeoWs 3D Visualization', desc: 'Interactive 3D view of near-Earth asteroids orbiting our planet.', to: '/3d-neows' },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.to}
          className="w-full h-full"
          initial="hidden"
          animate="visible"
          custom={i}
          variants={cardVariants}
        >
          <Card className="flex flex-col items-center text-center h-full transition transform hover:scale-[1.02] hover:shadow-xl cursor-pointer">
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm mb-4 px-2">{card.desc}</p>
            <Link
              to={card.to}
              className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Explore
            </Link>
          </Card>
        </motion.div>
      ))}

      {/* Future registration button */}
      <div className="md:col-span-3 flex justify-center mt-6">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition hidden">
          Register for more
        </button>
      </div>
    </motion.div>
  );
}