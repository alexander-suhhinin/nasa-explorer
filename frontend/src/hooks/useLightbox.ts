import React from 'react';

export function useLightbox() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [src, setSrc] = React.useState<string | null>(null);
    const [alt, setAlt] = React.useState<string>('');

    const openLightbox = (src: string, altText = '') => {
      setSrc(src);
      setAlt(altText);
      setIsOpen(true);
    };

    const closeLightbox = () => {
      setIsOpen(false);
      setSrc(null);
      setAlt('');
    };

    return {
      isOpen,
      src,
      alt,
      openLightbox,
      closeLightbox,
    };
  }