// Custom easing curves yang lebih natural
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1], // easeOutQuart
  bouncy: [0.34, 1.56, 0.64, 1], // spring-like
  snappy: [0.2, 0.8, 0.2, 1], // snappy ease
  gentle: [0.4, 0, 0.2, 1], // material standard
};

// Reduced motion detection
export const useReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
};

// Stagger helper
export const createStagger = (base: number = 0.08, start: number = 0) => {
  return (index: number) => start + index * base;
};
