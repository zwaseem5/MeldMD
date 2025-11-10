import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/** Wrap v into [min,max) without visible jumps. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export type ScrollVelocityTextProps = {
  text: string;
  className?: string;          // classes applied to the text spans
  baseVelocity?: number;       // px per second, negative = left
  gap?: number;                // px gap between copies
  separator?: string | React.ReactNode;
  pauseOnHover?: boolean;
};

const ScrollVelocityText: React.FC<ScrollVelocityTextProps> = ({
  text,
  className,
  baseVelocity = -100, // tune speed here
  gap = 40,
  separator,
  pauseOnHover = true,
}) => {
  const laneRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);

  // --- measure the rendered width (once fonts/layout are ready) ---
  const measure = () => {
    const el = stripRef.current;
    if (!el) return;
    // Prefer getBoundingClientRect for fractional px accuracy.
    const w = el.getBoundingClientRect().width || el.scrollWidth || 0;
    setContentWidth(Math.ceil(w)); // store integer to avoid sub-pixel drift
  };

  // Measure after mount + whenever resized. Works SSR-safe.
  useEffect(() => {
    measure();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;

    if (ro && stripRef.current) ro.observe(stripRef.current);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // Re-measure when fonts are ready (if supported)
    // Cast to any to avoid TS DOM typing complaints across browsers.
    const fontsReady =
      typeof (document as any).fonts?.ready === "object"
        ? (document as any).fonts.ready
        : null;
    fontsReady?.then(() => measure());

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  // --- scroll reactivity ---
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 400,
    damping: 50,
    mass: 0.8,
  });

  // Convert scroll px/ms → modest factor; clamp extremes for stability.
  const velocityFactor = useTransform(smoothVelocity, (v) =>
    Math.max(-4, Math.min(4, v / 1000))
  );

  // Our animated x (in **pixels**)
  const baseX = useMotionValue(0);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [hovered, setHovered] = useState(false);

  // Advance each frame
  useAnimationFrame((_, deltaMs) => {
    if (prefersReducedMotion || (pauseOnHover && hovered) || !contentWidth) return;

    const dt = deltaMs / 1000; // ms → s
    const vf = velocityFactor.get();
    const moveBy = (baseVelocity + baseVelocity * vf) * dt; // px
    baseX.set(baseX.get() + moveBy);
  });

  // Wrap from -totalWidth .. 0 for perfect loop
  const totalWidth = contentWidth + gap; // one copy + trailing gap
  const x = useTransform(baseX, (v) =>
    totalWidth > 0 ? `${wrap(-totalWidth, 0, v)}px` : "0px"
  );

  // One copy of the strip (text + optional separator)
  const Strip = ({ withRef = false }: { withRef?: boolean }) => (
    <div
      ref={withRef ? stripRef : undefined}
      className="inline-flex items-center"
      style={{ columnGap: gap }}
    >
      <span className={className}>{text}</span>
      {separator != null ? <span className={className}>{separator}</span> : null}
    </div>
  );

  return (
    <div
      ref={laneRef}
      className="relative overflow-hidden select-none"
      onMouseEnter={() => pauseOnHover && setHovered(true)}
      onMouseLeave={() => pauseOnHover && setHovered(false)}
      aria-label={typeof text === "string" ? text : undefined}
    >
      {/* Two back-to-back copies scrolling together; no jump on wrap */}
      <motion.div
        className="flex will-change-transform"
        style={{ x }}
        aria-hidden
      >
        <div className="shrink-0">
          <Strip withRef />
        </div>
        <div className="shrink-0" style={{ marginLeft: gap }}>
          <Strip />
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollVelocityText;


