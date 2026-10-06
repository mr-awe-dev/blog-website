import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ImageWithFallback from "./ImageWithFallback";

interface AccordionItemProps {
  title: string;
  content?: string;
  image?: string;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  image,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div className="border-b border-gray-200" initial={false}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left px-2 rounded-lg"
      >
        <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-shrink-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && content && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            {/* pt-2 ditambahkan agar ada jarak dari garis border atas */}
            <div className="pb-5 sm:pb-6 flex flex-col md:flex-row gap-4 sm:gap-6 px-2 pt-2">
              {/* Kolom Teks */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05,
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="md:w-2/3"
              >
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {content}
                </p>
              </motion.div>

              {/* Kolom Gambar */}
              {image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="w-full md:w-1/3"
                >
                  {/* Wrapper overflow-hidden SANGAT PENTING agar zoom tidak merusak rounded corner */}
                  <div className="overflow-hidden rounded-lg shadow-sm">
                    <ImageWithFallback
                      src={image}
                      alt={title}
                      // Tinggi ditingkatkan: h-48 (mobile), h-56 (desktop) agar lebih user-friendly
                      className="w-full h-48 sm:h-56 md:h-48 lg:h-56"
                      style={{ objectFit: "cover" }}
                      zoomOnHover={true}
                      fallbackIcon={
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-400"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      }
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccordionItem;
