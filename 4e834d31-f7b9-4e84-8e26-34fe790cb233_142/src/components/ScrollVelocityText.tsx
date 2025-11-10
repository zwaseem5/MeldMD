import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useScroll,
} from "framer-motion";

/** Wrap v into [min, max) without jumps. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export type ScrollVelocityTextProps = {
  /** Text that repeats across the marquee. */
  text: string;
  /** Tailwind/utility classes applied to the text spans. */
  className?: string;
  /** Base speed in px/second. Negative = left, positive = right. */
  baseVelocity?: number;
  /** Space (px) between copies. */
  gap?: number;
  /** Optional separator between copies (e.g., "•"). */
  separator?: string | React.ReactNode;
  /** Pause animation while hovering. */
  pauseOnHover?: boolean;
};

const ScrollVelocityText: React.FC<ScrollVelocityTextProps> = ({
  text,
  className,
  baseVelocity = -90, // px/s; tune to taste
  gap = 40,
  separator,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Scroll reactivity
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 400, damping: 50, mass: 0.8 });

  // Convert scroll px/ms → small factor, clamp extremes
  const velocityFactor = useTransform(smoothVelocity, (v) =>
    Math.max(-4, Math.min(4, v / 1000))
  );

  // Motion value in **pixels**
  const baseX = useMotionValue(0);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [hovered, setHovered] = useState(false);

  // Measure rendered width once fonts/layout are ready
  const measure = () => {
    if (!stripRef.current) return;
    // stripRef is a single copy of the content (text + optional separator)
    const w = stripRef.current.getBoundingClientRect().width;
    setContentWidth(Math.ceil(w + gap)); // include desired gap
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    // Re-measure on resize and when fonts load (prevents tiny loops)
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    if (document.fonts && "ready" in document.fonts) {
      (document.fonts as any).ready?.then(() => measure());
    }
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Drive per-frame motion
  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (pauseOnHover && hovered) return;
    if (!contentWidth) return;

    const dt = delta / 1000; // ms → s
    const vf = velocityFactor.get();
    const moveBy = (baseVelocity + baseVelocity * vf) * dt; // px
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap between -contentWidth..0 so two copies butt perfectly
  const x = useTransform(baseX, (v) =>
    contentWidth ? `${wrap(-contentWidth, 0, v)}px` : "0px"
  );

  // The inner "strip" content rendered once. We’ll clone it twice.
  const StripOnce = () => (
    <div
      className="inline-flex items-center"
      // gap via style to ensure exact pixel math
      style={{ gap }}
      ref={stripRef}
    >
      <span className={className}>{text}</span>
      {separator != null ? <span className={className}>{separator}</span> : null}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      onMouseEnter={() => pauseOnHover && setHovered(true)}
      onMouseLeave={() => pauseOnHover && setHovered(false)}
      aria-label={typeof text === "string" ? text : undefined}
    >
      {/* The moving lane with two back-to-back copies ensures continuity */}
      <motion.div
        className="flex will-change-transform"
        style={{ x }}
        aria-hidden
      >
        {/* First copy */}
        <div className="shrink-0">
          <StripOnce />
        </div>
        {/* Second copy (no ref; same width as first) */}
        <div className="shrink-0" style={{ marginLeft: gap }}>
          <div className="inline-flex items-center" style={{ gap }}>
            <span className={className}>{text}</span>
            {separator != null ? <span className={className}>{separator}</span> : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollVelocityText;

