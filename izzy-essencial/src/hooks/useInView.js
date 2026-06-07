import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible].
 * isVisible flips true once the element enters the viewport (fires once).
 * threshold: 0–1, how much of the element must be visible before triggering.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
