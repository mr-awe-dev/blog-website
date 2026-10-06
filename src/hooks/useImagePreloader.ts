import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls: string[]): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;

    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });
    };

    Promise.allSettled(imageUrls.map(preloadImage)).then(() => {
      if (mounted) {
        setIsLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [imageUrls]);

  return isLoaded;
};
