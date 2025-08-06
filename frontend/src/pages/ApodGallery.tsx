import { useQuery } from '@tanstack/react-query';
import { getApod } from '../services/api';
import type { ApodResponse } from '../services/api';
import Card, { SkeletonCard } from '../components/Card';
import Lightbox from '../components/Lightbox';
import { useLightbox } from '../hooks/useLightbox';
import { motion } from 'framer-motion';

export default function ApodGallery() {
  const { data, isLoading, isError } = useQuery<ApodResponse>({
    queryKey: ['apod'],
    queryFn: getApod,
    retry: 0,
  });

  const lightbox = useLightbox();

  if (isLoading && !isError) {
    return <SkeletonCard className="max-w-3xl mx-auto" />;
  }

  if (isError || !data) {
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <div className="p-4 text-red-500 font-semibold">
          ⚠️ Failed to load APOD photos. Please try again later.
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
      <Card className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Date: {data.date}</p>
        {data.media_type === 'image' ? (
          <img
            src={data.url}
            alt={data.title}
            onClick={() => lightbox.openLightbox(data.url, data.title)}
            className="rounded-lg shadow-lg mb-6 w-full max-h-[600px] object-contain mx-auto cursor-zoom-in hover:opacity-90 transition"
          />
        ) : (
          <iframe
            title={data.title}
            src={data.url}
            className="w-full aspect-video mb-6 rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        )}
        <p className="text-gray-700 leading-relaxed text-left">{data.explanation}</p>
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