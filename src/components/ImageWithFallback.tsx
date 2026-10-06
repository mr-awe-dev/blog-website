import React, { useState } from "react";
import { motion } from "motion/react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
  zoomOnHover?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackIcon,
  zoomOnHover = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Jika src kosong atau error, tampilkan placeholder
  if (!src || hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        // will-change-transform memaksa GPU acceleration agar smooth
        className={`relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col items-center justify-center overflow-hidden will-change-transform ${className}`}
        whileHover={zoomOnHover ? { scale: 1.1 } : undefined}
        transition={
          zoomOnHover ? { duration: 0.7, ease: "easeOut" } : undefined
        }
      >
        {/* Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#7CB342 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Fallback Icon dengan efek parallax kecil saat zoom */}
        <motion.div
          className="relative z-10 text-green-400"
          animate={zoomOnHover ? { scale: 0.9 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {fallbackIcon || (
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </motion.div>

        <motion.span
          className="relative z-10 mt-2 text-xs font-medium text-green-600/60"
          animate={zoomOnHover ? { opacity: 0.5 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Image not available
        </motion.span>
      </motion.div>
    );
  }

  return (
    <>
      {/* Skeleton Loading State */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-100 animate-pulse ${className}`}
        />
      )}

      {/* Actual Image - Gunakan motion.img untuk animasi yang smooth */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} will-change-transform`}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
        whileHover={zoomOnHover ? { scale: 1.1 } : undefined}
        transition={{
          opacity: { duration: 0.5 },
          scale: zoomOnHover
            ? { duration: 0.7, ease: "easeOut" }
            : { duration: 0 },
        }}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
