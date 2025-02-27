import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImagePreview = ({ src, alt, className = 'w-16 h-16 rounded-lg' }: ImagePreviewProps) => {
  const [error, setError] = useState(false);
  
  // Reset error state when src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {!error ? (
        <img
          key={src} // Add key to force remount when src changes
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <ExclamationTriangleIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}; 