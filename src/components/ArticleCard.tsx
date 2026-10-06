import React from "react";
import { motion } from "motion/react";
import ImageWithFallback from "./ImageWithFallback";

interface ArticleCardProps {
  image: string;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm"
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container */}
      <div className="overflow-hidden relative">
        <ImageWithFallback
          src={image}
          alt={title}
          // Hapus group-hover:scale-110 dari sini, kita handle via prop zoomOnHover
          className="w-full h-56 sm:h-64"
          style={{ objectFit: "cover" }}
          zoomOnHover={true} // <-- Aktifkan animasi zoom via Motion
          fallbackIcon={
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
          }
        />
      </div>

      {/* Content Container */}
      <div className="pt-4 sm:pt-5 pb-4 px-4 sm:px-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        <motion.a
          href="#"
          className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1.5 hover:text-primary"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Learn more
          <motion.span
            className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
