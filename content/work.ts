export type Project = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  overview: string;
  challenge: string;
  approach: string;
  stack: string[];
  role: string;
  result: string;
  impact: string;
  metrics: { v: string; l: string }[];
};

type ProjectContent = Omit<Project, "slug">;
type Locale = "cs" | "en";

/** Slug is locale-independent (drives the URL); copy is per-locale. */
const data: { slug: string; cs: ProjectContent; en: ProjectContent }[] = [
  {
    slug: "vzkriseni",
    cs: {
      title: "Vzkříšení",
      summary: "Utopený telefon, kompletní záchrana dat.",
      tag: "Záchrana dat",
      overview: "Telefon po pádu do vody, dva servisy ho odepsaly jako neopravitelný.",
      challenge: "Klient nechtěl telefon - chtěl zpět fotky a rok zpráv, které nikde jinde neměl.",
      approach: "Rozebrání na úroveň desky, čištění, výměna poškozených komponent a kontrolované obnovení.",
      stack: ["Mikropájení", "Obnova dat", "Diagnostika na úrovni desky"],
      role: "Diagnostika na úrovni desky, čištění a obnova dat.",
      result: "Zachráněny všechny fotky i kompletní historie zpráv.",
      impact: "Klient nepřišel o jediný snímek ani zprávu. Telefon navíc zůstal plně funkční.",
      metrics: [
        { v: "100 %", l: "obnovených dat" },
        { v: "2", l: "servisy ho předtím odepsaly" },
        { v: "3 dny", l: "od příjmu po předání" },
      ],
    },
    en: {
      title: "Resurrection",
      summary: "A water-damaged phone, a full data rescue.",
      tag: "Data recovery",
      overview: "A phone after a drop in water; two shops had written it off as unrepairable.",
      challenge: "The client didn't want the phone - they wanted back their photos and a year of messages they had nowhere else.",
      approach: "Strip-down to board level, cleaning, replacement of damaged components, and a controlled recovery.",
      stack: ["Microsoldering", "Data recovery", "Board-level diagnostics"],
      role: "Board-level diagnostics, cleaning and data recovery.",
      result: "Every photo and the full message history recovered.",
      impact: "The client lost not a single photo or message, and the phone stayed fully working too.",
      metrics: [
        { v: "100 %", l: "data recovered" },
        { v: "2", l: "shops had written it off" },
        { v: "3 days", l: "from intake to handover" },
      ],
    },
  },
  {
    slug: "protivaha",
    cs: {
      title: "Protiváha",
      summary: "Web na míru pro lokálního tvůrce.",
      tag: "Web",
      overview: "Náhrada generické šablony za web stavěný od základu.",
      challenge: "Původní web byl pomalý, vypadal jako tisíc dalších a nepřinášel poptávky.",
      approach: "Nový návrh, vlastní vývoj a důraz na rychlost a jasné CTA.",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      role: "Návrh, vývoj a optimalizace celého webu.",
      result: "Načtení pod 1 sekundu a nárůst příchozích poptávek.",
      impact: "Rychlejší web a jasná struktura přinesly víc poptávek bez placené reklamy.",
      metrics: [
        { v: "0,8 s", l: "doba načtení" },
        { v: "98", l: "skóre Lighthouse" },
        { v: "+40 %", l: "příchozích poptávek" },
      ],
    },
    en: {
      title: "Counterweight",
      summary: "A custom website for a local creator.",
      tag: "Web",
      overview: "Replacing a generic template with a site built from scratch.",
      challenge: "The old site was slow, looked like a thousand others, and brought in no inquiries.",
      approach: "A new design, custom development, and a focus on speed and clear CTAs.",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      role: "Design, development and optimization of the whole site.",
      result: "Sub-1-second load times and a rise in incoming inquiries.",
      impact: "A faster site and a clear structure brought more inquiries, with no paid ads.",
      metrics: [
        { v: "0.8 s", l: "load time" },
        { v: "98", l: "Lighthouse score" },
        { v: "+40 %", l: "incoming inquiries" },
      ],
    },
  },
  {
    slug: "tichy-stroj",
    cs: {
      title: "Tichý stroj",
      summary: "Rebuild a optimalizace pracovní stanice.",
      tag: "Optimalizace",
      overview: "Pětiletý notebook, který se sekal a hlučel při každém úkonu.",
      challenge: "Klient zvažoval nákup nového stroje, i když ten starý měl ještě potenciál.",
      approach: "Čištění, výměna teplovodivé pasty, upgrade úložiště a vyladění systému.",
      stack: ["Upgrade hardwaru", "Optimalizace systému", "Správa teplot"],
      role: "Hardwarový upgrade, čištění a vyladění systému.",
      result: "Tichý, rychlý stroj - bez nutnosti kupovat nový.",
      impact: "Klient ušetřil za nový stroj a získal tichý, svižný notebook na další roky.",
      metrics: [
        { v: "4×", l: "rychlejší start systému" },
        { v: "−18 °C", l: "nižší teploty pod zátěží" },
        { v: "0 Kč", l: "za nový notebook" },
      ],
    },
    en: {
      title: "Quiet Machine",
      summary: "A rebuild and optimization of a workstation.",
      tag: "Optimization",
      overview: "A five-year-old laptop that stuttered and roared at every task.",
      challenge: "The client was weighing a new machine, even though the old one still had potential.",
      approach: "Cleaning, thermal-paste replacement, a storage upgrade, and system tuning.",
      stack: ["Hardware upgrade", "System optimization", "Thermal management"],
      role: "Hardware upgrade, cleaning and system tuning.",
      result: "A quiet, fast machine, with no need to buy a new one.",
      impact: "The client saved the cost of a new machine and got a quiet, snappy laptop for years to come.",
      metrics: [
        { v: "4×", l: "faster system start" },
        { v: "−18 °C", l: "lower temps under load" },
        { v: "0 Kč", l: "spent on a new laptop" },
      ],
    },
  },
];

export const projectSlugs = data.map((p) => p.slug);

export function getProjects(locale: string): Project[] {
  const l: Locale = locale === "en" ? "en" : "cs";
  return data.map((p) => ({ slug: p.slug, ...p[l] }));
}

export function getProject(locale: string, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}
