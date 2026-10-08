import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Menambahkan sedikit variasi agar terlihat lebih natural
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          // PERBAIKAN: Menambahkan dark mode support pada background preloader
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl"
        >
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Logo (Sama persis dengan Header, disesuaikan ukurannya untuk preloader) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14c3.5 0 6.7-1.3 9.1-3.4l-2.8-2.8C22.4 27.5 20.3 28.4 18 28.4c-5.7 0-10.4-4.7-10.4-10.4S12.3 7.6 18 7.6c2.8 0 5.3 1.1 7.2 2.9l2.8-2.8C25.4 5.3 21.9 4 18 4z"
                    fill="currentColor"
                    className="text-primary"
                  />
                  <path
                    d="M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.7 0 3.2-.7 4.2-1.8V18h-4.2v-2h6.2v6.2c1.3-1.4 2-3.3 2-5.4 0-3.9-3.1-7-7-7h-1.2z"
                    fill="currentColor"
                    className="text-primary-dark"
                  />
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                Agrob
              </span>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Optional: Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              Loading resources...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
