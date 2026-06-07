import { useInView } from "../../hooks/useInView.js";

/**
 * Wraps children in a div that adds the `in-view` class when scrolled into view.
 * animation: "fade-up" | "fade-in" | "scale-in" | "slide-left"
 * delay: CSS delay string e.g. "150ms"
 */
export default function Reveal({
  children,
  animation = "fade-up",
  delay = "0ms",
  className = "",
  threshold = 0.1,
  as: Tag = "div",
}) {
  const [ref, visible] = useInView(threshold);

  return (
    <Tag
      ref={ref}
      className={`anim-${animation} ${visible ? "in-view" : ""} ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </Tag>
  );
}
