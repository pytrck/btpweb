"use client";

import { motion } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/motion";

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
        className="col-span-12 font-head text-h1 font-bold md:col-span-10"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={heroItem}
        className="col-span-12 text-lg text-muted md:col-span-7 md:col-start-5"
      >
        {subtitle}
      </motion.p>
    </motion.section>
  );
}
