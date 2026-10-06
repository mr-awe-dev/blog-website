import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useImagePreloader } from "../hooks/useImagePreloader";
import ImageWithFallback from "./ImageWithFallback";

const slides = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=500&fit=crop",
    alt: "Sustainable farming crop rows",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=500&fit=crop",
    alt: "Green wheat field at sunset",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=500&fit=crop",
    alt: "Golden wheat harvest",
  },
];

const SLIDE_DURATION = 5000;

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const imagesLoaded = useImagePreloader(slides.map((s) => s.image));

  const goToNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused || isInitialLoad) return;

    setProgress(0);
    const progressStep = 50;
    const increment = (progressStep / SLIDE_DURATION) * 100;

    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, progressStep);

    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeSlide, isPaused, isInitialLoad, goToNextSlide]);

  useEffect(() => {
    if (imagesLoaded && isInitialLoad) {
      const timer = setTimeout(() => setIsInitialLoad(false), 500);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, isInitialLoad]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-8 lg:mb-10">
        <div className="lg:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: isInitialLoad ? 0 : 0.1,
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Sustainable Future
            <br />
            Insights
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: isInitialLoad ? 0.15 : 0.25,
          }}
          className="lg:w-1/2 flex flex-col justify-center"
        >
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-md">
            We share common trends and strategies for improving your rental
            making sure in high demand of service unique blocks, you can nd
            making sure you stay.
          </p>
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-3 sm:mt-4 text-primary text-xs sm:text-sm font-medium flex items-center gap-2"
          >
            Learn More
            <motion.svg
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Hero Image Slider */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
          delay: isInitialLoad ? 0.3 : 0.4,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-xl sm:rounded-2xl overflow-hidden"
      >
        <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] xl:h-[450px]">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={slides[activeSlide].image}
                alt={slides[activeSlide].alt}
                className="w-full h-full" // Hapus object-cover dari sini, biarkan wrapper yang handle
                style={{ objectFit: "cover" }} // Inline style agar tetap berlaku untuk img, tapi tidak merusak div fallback
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation Arrows - DIPERBAIKI: Hapus scale, gunakan hanya opacity/color untuk mencegah shifting */}
          <motion.button
            onClick={() => {
              setActiveSlide(
                (prev) => (prev - 1 + slides.length) % slides.length,
              );
              setProgress(0);
            }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white/60 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => {
              setActiveSlide((prev) => (prev + 1) % slides.length);
              setProgress(0);
            }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white/60 transition-colors duration-300"
            aria-label="Next slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
        {slides.map((slide, idx) => (
          <motion.button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            className="relative flex items-center justify-center"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                activeSlide === idx ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </motion.button>
        ))}

        {/* Play/Pause Button */}
        <motion.button
          onClick={() => setIsPaused(!isPaused)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="ml-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          )}
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
