"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/content/services";
import { site } from "@/content/site";
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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const field =
    "w-full border border-line bg-transparent px-4 py-3 text-paper outline-none transition-colors duration-300 focus:border-accent-from";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const data = new FormData(form);
    data.append("access_key", site.web3formsKey);
    data.append("subject", `Nová poptávka - ${site.name}`);
    data.append("from_name", site.name);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {/* honeypot - bots auto-fill this; web3forms rejects any submission where it's set */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
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
        disabled={status === "sending"}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: EASE }}
        className="btp-focus btn-paper group relative inline-flex items-center gap-2 overflow-hidden rounded px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        <span className="relative z-10">{status === "sending" ? t("sending") : t("submit")}</span>
        <span className="relative z-10 text-accent-from transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </motion.button>

      <p className="text-sm text-muted">{t("note")}</p>

      <AnimatePresence>
        {status === "sent" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="status"
            className="text-sm text-accent-from"
          >
            {t("success")}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="alert"
            className="text-sm text-muted"
          >
            {t("error")}{" "}
            <a className="text-accent-from underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
