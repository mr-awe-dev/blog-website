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
      // GLASSMORPHISM UPGRADE: Dibikin terpisah antara gambar dan konten
      className="flex flex-col gap-3 sm:gap-4 group cursor-pointer relative"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container */}
      <div className="glass rounded-2xl overflow-hidden relative group-hover:glass-strong transition-all duration-300 shadow-sm z-10">
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
      <div className="glass rounded-2xl p-4 sm:p-5 relative z-10 group-hover:glass-strong transition-all duration-300 shadow-sm flex flex-col justify-between h-full">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        <motion.a
          href="#"
          className="text-xs sm:text-sm text-primary font-semibold flex items-center gap-1.5 group/link"
          whileHover={{ x: 4 }}
        >
          Learn more
          <motion.span
            className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center group-hover/link:bg-primary transition-colors duration-300"
            whileHover={{ rotate: 45 }}
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
