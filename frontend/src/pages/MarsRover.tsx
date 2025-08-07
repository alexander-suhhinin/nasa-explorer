import { useQuery } from '@tanstack/react-query';
import { getMarsPhotos } from '../services/api';
import { useState } from 'react';
import type { MarsPhoto } from '../services/api';
import Card, { SkeletonCard } from '../components/Card';
import Lightbox from '../components/Lightbox';
import { useLightbox } from '../hooks/useLightbox';
import { motion } from 'framer-motion';

export default function MarsRover() {
  const [sol, setSol] = useState<number>(1000);
  const lightbox = useLightbox();

  const { data, isLoading, isError } = useQuery<MarsPhoto[]>({
    queryKey: ['mars', sol],
    queryFn: () => getMarsPhotos({ sol }),
    retry: 0,
  });

  if (isLoading && !isError) {
    return <SkeletonCard className="max-w-3xl mx-auto" />;
  }

  if (isError || !data) {
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <div className="p-4 text-red-500 font-semibold">
          ⚠️ Failed to load Mars photos. Please try again later.
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
    <Card className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mars Rover Photos (Sol {sol})</h1>
      <div className="mb-4 flex gap-2 items-center">
        <label className="text-sm">Change Sol:</label>
        <input
          type="number"
          value={sol}
          onChange={(e) => setSol(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>
      {data.length === 0 ? (
        <div className="text-gray-500">No photos found for this sol.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.map((photo) => (
            <div
              key={photo.id}
              className="border rounded shadow hover:shadow-lg transition bg-white cursor-pointer"
              onClick={() => lightbox.openLightbox(photo.img_src, `Sol ${photo.sol} - ${photo.camera}`)}
            >
              <img
                src={photo.img_src}
                alt={`Sol ${photo.sol}`}
                className="w-full h-40 object-cover rounded-t"
              />
              <div className="p-2 text-xs text-gray-700">
                <p><strong>Camera:</strong> {photo.camera}</p>
                <p><strong>Date:</strong> {photo.earth_date}</p>
                <p><strong>Rover:</strong> {photo.rover}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
    <Lightbox
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        alt={lightbox.alt}
        onClose={lightbox.closeLightbox}
      />
    </motion.div>
  );
}
