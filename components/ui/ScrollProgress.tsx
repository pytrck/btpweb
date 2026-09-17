"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100];

/**
 * Page-wide scroll progress: a thin vapor line pinned to the top that fills
 * left→right as you move through the document. Spring-smoothed so it glides
 * rather than tracking pixel-for-pixel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // How far down each page people actually get - the one number that says
  // whether anyone ever reaches the CTA. Reported against the raw progress, not
  // the spring, so a fast flick still records every threshold it passed.
  const pathname = usePathname();
  const seen = useRef(new Set<number>());
  useEffect(() => {
    seen.current.clear();
  }, [pathname]);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    for (const mark of MARKS) {
      if (progress * 100 >= mark && !seen.current.has(mark)) {
        seen.current.add(mark);
        track("scroll-depth", { percent: mark, path: pathname });
      }
    }
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-fracture"
    />
  );
}
