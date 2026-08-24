"use client";

import { motion } from "framer-motion";
import { heroContainer, heroItem, DUR, EASE } from "@/lib/motion";

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.section
      variants={heroContainer}
      initial="hidden"
      animate="show"
      className="container-x grid grid-cols-12 gap-y-6 pb-12 pt-section"
    >
      <motion.h1
        variants={heroItem}
        className="col-span-12 font-head text-h1 font-bold text-balance text-accent-from md:col-span-10"
      >
        {title}
      </motion.h1>
      {/* vapor seam draws under the title - the hero's fracture, echoed on every
          inner page so the header never reads as a bare template title. */}
      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: { scaleX: 1, opacity: 0.85, transition: { duration: DUR.seam, ease: EASE, delay: 0.1 } },
        }}
        className="col-span-12 h-px origin-left bg-fracture md:col-span-4"
      />
      <motion.p
        variants={heroItem}
        className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5"
      >
        {subtitle}
      </motion.p>
    </motion.section>
  );
}
