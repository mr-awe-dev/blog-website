import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  selector: string,
  animation: gsap.TweenVars,
  trigger?: string,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.from(el, {
          ...animation,
          scrollTrigger: {
            trigger: trigger ? ref.current?.querySelector(trigger) : el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [selector, animation, trigger]);

  return ref;
};
