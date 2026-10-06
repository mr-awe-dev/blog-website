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
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#C5E17A] to-[#7CB342] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14c3.5 0 6.7-1.3 9.1-3.4l-2.8-2.8C22.4 27.5 20.3 28.4 18 28.4c-5.7 0-10.4-4.7-10.4-10.4S12.3 7.6 18 7.6c2.8 0 5.3 1.1 7.2 2.9l2.8-2.8C25.4 5.3 21.9 4 18 4z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#7CB342]">Agrob</span>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C5E17A] to-[#7CB342] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
