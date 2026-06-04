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

export const projects: Project[] = [
  {
    slug: "vzkriseni",
    title: "Vzkříšení",
    summary: "Utopený telefon, kompletní záchrana dat.",
    tag: "Záchrana dat",
    overview: "Telefon po pádu do vody, dva servisy ho odepsaly jako neopravitelný.",
    challenge: "Klient nechtěl telefon — chtěl zpět fotky a rok zpráv, které nikde jinde neměl.",
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
  {
    slug: "protivaha",
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
  {
    slug: "tichy-stroj",
    title: "Tichý stroj",
    summary: "Rebuild a optimalizace pracovní stanice.",
    tag: "Optimalizace",
    overview: "Pětiletý notebook, který se sekal a hlučel při každém úkonu.",
    challenge: "Klient zvažoval nákup nového stroje, i když ten starý měl ještě potenciál.",
    approach: "Čištění, výměna teplovodivé pasty, upgrade úložiště a vyladění systému.",
    stack: ["Upgrade hardwaru", "Optimalizace systému", "Správa teplot"],
    role: "Hardwarový upgrade, čištění a vyladění systému.",
    result: "Tichý, rychlý stroj — bez nutnosti kupovat nový.",
    impact: "Klient ušetřil za nový stroj a získal tichý, svižný notebook na další roky.",
    metrics: [
      { v: "4×", l: "rychlejší start systému" },
      { v: "−18 °C", l: "nižší teploty pod zátěží" },
      { v: "0 Kč", l: "za nový notebook" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
