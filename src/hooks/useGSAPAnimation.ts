import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useGSAPAnimation = (
  animation: gsap.TweenVars,
  delay: number = 0,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animation,
        delay,
      });
    }, ref);

    return () => ctx.revert();
  }, [animation, delay]);

  return ref;
};
