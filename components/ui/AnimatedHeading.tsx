"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Headline whose words rise and brighten in sequence, scroll-linked. Each word
 * has its own staggered window inside the heading's scroll pass, so the line
 * "writes itself" as it enters and dims as it leaves. Renders a plain string as
 * real text (one node per word) so it stays selectable and accessible.
 */
export function AnimatedHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => {
        const start = (i / words.length) * 0.6;
        const end = start + 0.4;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </h2>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, range, [reduce ? 0 : "0.5em", "0em"]);
  const opacity = useTransform(progress, range, [reduce ? 1 : 0.12, 1]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span style={{ y, opacity }} className="inline-block">
        {children}
        {" "}
      </motion.span>
    </span>
  );
}
