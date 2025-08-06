import { createPortal } from 'react-dom';

export default function Lightbox({
  isOpen,
  src,
  alt,
  onClose,
}: {
  isOpen: boolean;
  src: string | null;
  alt?: string;
  onClose: () => void;
}) {
  if (!isOpen || !src) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
        aria-label="Close lightbox"
      >
        &times;
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-5xl max-h-[90vh] object-contain rounded-lg shadow-xl"
      />
    </div>,
    document.body
  );
}