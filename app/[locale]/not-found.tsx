"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <section className="container-x flex min-h-[78vh] flex-col justify-center py-section">
      <p className="label text-accent-from">CHYBA 404 - YOU BROKE THE PATTERN!</p>

      {/* Signature moment: the "404" with a vapor crack slicing through it. */}
      <div className="relative mt-6 w-fit">
        <h1 className="font-head text-[clamp(5rem,22vw,16rem)] font-bold leading-none tracking-tight">
          4<span className="vapor-text">0</span>4
        </h1>
        {/* initial states stay identical on server and client (SSR can't know
            the reduced-motion preference) - reduce collapses the transitions
            to an instant resolve instead. */}
        <motion.div
          aria-hidden
          className="absolute left-[-4%] top-1/2 h-px w-[108%] origin-left vapor-center"
          style={{ rotate: -9 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.9 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.9, ease: EASE, delay: 0.15 }}
        />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 bg-accent-from"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduce ? { duration: 0.01 } : { duration: 0.3, ease: "easeOut", delay: 0.75 }
          }
        />
      </div>

      <h2 className="mt-8 font-head text-h2 font-bold">Tady se vzor rozbil.</h2>
      <p className="mt-4 max-w-md text-lg text-muted">
        Tahle adresa neexistuje nebo se přesunula. Vraťte se do vzoru - odsud se
        dostanete dál.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/">Zpět domů</Button>
        <Button href="/sluzby" variant="ghost">
          Služby
        </Button>
        <Button href="/kontakt" variant="ghost">
          Kontakt
        </Button>
      </div>
    </section>
  );
}
