"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/content/services";
import { EASE } from "@/lib/motion";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="label mb-2 block transition-colors duration-300 group-focus-within:text-accent-from">
        {label}
      </span>
      <div className="relative">
        {children}
        {/* vapor underline snaps in on focus */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-fracture transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
      </div>
    </label>
  );
}

export function ContactForm() {
  const t = useTranslations("form");
  const [sent, setSent] = useState(false);

  const field =
    "w-full border border-line bg-transparent px-4 py-3 text-paper outline-none transition-colors duration-300 focus:border-accent-from";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Field label={t("name")}>
        <input name="name" required className={field} />
      </Field>
      <Field label={t("contact")}>
        <input name="contact" required className={field} />
      </Field>
      <Field label={t("type")}>
        <select name="type" className={field} defaultValue={services[0].title}>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-ink">
              {s.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t("message")}>
        <textarea name="message" rows={4} className={field} />
      </Field>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: EASE }}
        className="btp-focus group relative inline-flex items-center gap-2 overflow-hidden rounded border border-paper bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-transparent hover:text-paper"
      >
        <span className="relative z-10">{t("submit")}</span>
        <span className="relative z-10 text-accent-from transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </motion.button>

      <p className="text-sm text-muted">{t("note")}</p>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-sm text-accent-from"
          >
            Odesláno. Ozveme se do 24 hodin.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
