export type Service = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  forWhom: string;
  proof: string[];
  included: string[];
  solves: string[];
  turnaround: string;
  deliverable: string;
  cta: string;
};

type ServiceContent = Omit<Service, "slug">;
type Locale = "cs" | "en";

/** Slug is locale-independent (Czech, drives the URL); copy is per-locale. */
const data: { slug: string; cs: ServiceContent; en: ServiceContent }[] = [
  {
    slug: "oprava-techniky",
    cs: {
      title: "Oprava a diagnostika elektroniky",
      headline: "Když to nenaběhne, nenastartuje a zlobí.",
      description: "Notebooky, konzole, disky a další elektronika. Nejdřív diagnóza, pak oprava, co vydrží.",
      forWhom: "Pro lidi, kterým řekli, že „už se to nevyplatí opravit“.",
      proof: ["Diagnostiku odečteme z ceny opravy", "Záruka na práci i díly", "Příběhy zachráněné techniky"],
      included: [
        "Kompletní diagnostika příčiny závady",
        "Čištění, výměna pasty a chlazení",
        "Výměna disků, RAM a vadných komponent",
        "Reinstalace a oživení systému",
      ],
      solves: [
        "Notebook, co se přehřívá, sekne nebo hučí",
        "Počítač, který nenaběhne nebo padá",
        "Pomalý systém po letech provozu",
        "Nahodilé chyby, které nikdo neumí najít",
      ],
      turnaround: "Diagnostika do 1-2 dnů, oprava podle dostupnosti dílů.",
      deliverable: "Oživené zařízení se zárukou a přehledem, co bylo špatně.",
      cta: "Objednat diagnostiku",
    },
    en: {
      title: "Electronics repair & diagnostics",
      headline: "When it won't boot, won't start, and won't behave.",
      description: "Laptops, consoles, drives and other electronics. Diagnosis first, then a repair that lasts.",
      forWhom: "For people who were told 'it's not worth repairing anymore'.",
      proof: ["Diagnostics deducted from the repair price", "Warranty on labour and parts", "Stories of rescued gear"],
      included: [
        "A full diagnosis of the root fault",
        "Cleaning, thermal-paste and cooling service",
        "Drive, RAM and faulty-component replacement",
        "Reinstall and system revival",
      ],
      solves: [
        "A laptop that overheats, stutters or roars",
        "A computer that won't boot or keeps crashing",
        "A system gone slow after years of use",
        "Intermittent faults no one can pin down",
      ],
      turnaround: "Diagnosis in 1-2 days, repair depending on parts availability.",
      deliverable: "A revived device with a warranty and a rundown of what was wrong.",
      cta: "Book a diagnosis",
    },
  },
  {
    slug: "weby-na-miru",
    cs: {
      title: "Weby na míru",
      headline: "Weby, co nevypadají jako všechny ostatní.",
      description: "Návrh a vývoj na míru. Rychlé, moderní, vaše. Bez šablon, bez balastu.",
      forWhom: "Pro značky a tvůrce, kteří chtějí web, co dává najevo, že to myslí vážně.",
      proof: ["Načtení pod 1 sekundu", "Skóre 90+ v Lighthouse", "Živé odkazy, ne mockupy"],
      included: [
        "Návrh designu a struktury na míru",
        "Vývoj na rychlém moderním stacku",
        "Optimalizace pro mobil a vyhledávače",
        "Předání a zaškolení, ať web zvládnete sami",
      ],
      solves: [
        "Pomalý web, který odrazuje návštěvníky",
        "Generická šablona, co vypadá jako konkurence",
        "Stránka, která nepřináší poptávky",
        "Web, který nejde rozumně upravovat",
      ],
      turnaround: "Menší web 2-3 týdny, větší podle rozsahu. Termín potvrdíme předem.",
      deliverable: "Hotový web, přístupy a krátké zaškolení, ať ho zvládnete sami.",
      cta: "Chci nabídku",
    },
    en: {
      title: "Custom websites",
      headline: "Websites that don't look like all the others.",
      description: "Bespoke design and build. Fast, modern, yours. No templates, no bloat.",
      forWhom: "For brands and creators who want a site that shows they mean business.",
      proof: ["Load time under 1 second", "Lighthouse score 90+", "Live links, not mockups"],
      included: [
        "Bespoke design and structure",
        "Development on a fast, modern stack",
        "Optimized for mobile and search",
        "Handover and training so you can run it yourself",
      ],
      solves: [
        "A slow site that turns visitors away",
        "A generic template that looks like the competition",
        "A page that doesn't bring in inquiries",
        "A site that's a pain to update",
      ],
      turnaround: "A small site in 2-3 weeks, larger ones by scope. We confirm the timeline upfront.",
      deliverable: "A finished site, access, and a short handover so you can run it yourself.",
      cta: "Get a quote",
    },
  },
  {
    slug: "oprava-telefonu",
    cs: {
      title: "Oprava telefonů",
      headline: "Prasklý, mrtvý, utopený? Vrátíme ho do hry.",
      description: "Displeje, baterie, konektory, voda. Poctivá diagnóza, rychlý termín, žádný upsell.",
      forWhom: "Pro každého, kdo radši opraví dobrý telefon, než aby splácel nový.",
      proof: ["Termín většinou do 48 hodin", "Kvalitní díly, ne nejlevnější náhražky", "Před / po u každé opravy"],
      included: [
        "Výměna displeje a skla",
        "Výměna baterie a nabíjecího konektoru",
        "Čištění po zatečení a oživení desky",
        "Záruka na díl i práci",
      ],
      solves: [
        "Prasklý nebo nereagující displej",
        "Telefon, co se nenabíjí nebo rychle vybíjí",
        "Zařízení po pádu do vody",
        "Nefunkční reproduktor, mikrofon nebo foťák",
      ],
      turnaround: "Většinou do 48 hodin. Déle jen u objednávkových dílů.",
      deliverable: "Funkční telefon se zárukou 6 měsíců a popisem, co se měnilo.",
      cta: "Chci cenu opravy",
    },
    en: {
      title: "Phone repair",
      headline: "Cracked, dead, water-damaged? We'll bring it back.",
      description: "Displays, batteries, connectors, water. Honest diagnosis, a fast slot, no upsell.",
      forWhom: "For anyone who'd rather fix a good phone than pay off a new one.",
      proof: ["Turnaround usually within 48 hours", "Quality parts, not the cheapest substitutes", "Before / after on every repair"],
      included: [
        "Display and glass replacement",
        "Battery and charging-port replacement",
        "Water-damage cleaning and board revival",
        "Warranty on parts and labour",
      ],
      solves: [
        "A cracked or unresponsive display",
        "A phone that won't charge or drains fast",
        "A device after a drop in water",
        "A dead speaker, microphone or camera",
      ],
      turnaround: "Usually within 48 hours. Longer only for order-in parts.",
      deliverable: "A working phone with a 6-month warranty and a note on what was changed.",
      cta: "Get a repair quote",
    },
  },
  {
    slug: "pokrocila-reseni",
    cs: {
      title: "Pokročilá řešení",
      headline: "Problém, který nikdo jiný nechtěl vzít.",
      description: "Záchrana dat, automatizace, integrace. Věci, co „prý nejdou“.",
      forWhom: "Pro každého s problémem, který je údajně neřešitelný.",
      proof: ["Case study složitých zakázek", "Přehled použitých nástrojů", "Řešení, ne výmluvy"],
      included: [
        "Záchrana a obnova ztracených dat",
        "Automatizace opakované práce",
        "Propojení a integrace nástrojů",
        "Konzultace u nestandardních zadání",
      ],
      solves: [
        "Ztracená data z disku nebo telefonu",
        "Ruční práce, která se dá zautomatizovat",
        "Systémy, které spolu odmítají mluvit",
        "Zadání, na které jinde řekli „to nejde“",
      ],
      turnaround: "Podle zadání. Odhad dostanete po úvodní konzultaci.",
      deliverable: "Vyřešený problém a popis, jak se k řešení došlo.",
      cta: "Popsat zadání",
    },
    en: {
      title: "Advanced solutions",
      headline: "The problem no one else would take on.",
      description: "Data recovery, automation, integrations. The things that 'supposedly can't be done'.",
      forWhom: "For anyone with a problem that's supposedly unsolvable.",
      proof: ["Case studies of complex jobs", "A rundown of the tools used", "Solutions, not excuses"],
      included: [
        "Rescue and recovery of lost data",
        "Automation of repetitive work",
        "Connecting and integrating tools",
        "Consulting on non-standard briefs",
      ],
      solves: [
        "Lost data from a drive or phone",
        "Manual work that could be automated",
        "Systems that refuse to talk to each other",
        "A brief others said 'can't be done'",
      ],
      turnaround: "Depends on the brief. You get an estimate after an initial consultation.",
      deliverable: "A solved problem and a write-up of how we got there.",
      cta: "Describe your brief",
    },
  },
  {
    slug: "optimalizace-a-podpora",
    cs: {
      title: "Optimalizace a podpora",
      headline: "Ať váš setup šlape rychle, čistě a potichu.",
      description: "Ladění výkonu, migrace, zálohy, optimalizace pracoviště i domácnosti.",
      forWhom: "Pro náročné uživatele a malé týmy, které technika spíš zdržuje.",
      proof: ["Měření před / po", "Přehled toho, co je v ceně", "Méně sekání, víc klidu"],
      included: [
        "Ladění výkonu a úklid systému",
        "Nastavení záloh, ať o nic nepřijdete",
        "Migrace dat a přechod na nový stroj",
        "Optimalizace sítě a pracoviště",
      ],
      solves: [
        "Pomalý a zaplevelený počítač",
        "Žádné nebo nespolehlivé zálohy",
        "Stěhování na nový stroj bez ztráty dat",
        "Setup, který spíš zdržuje než pomáhá",
      ],
      turnaround: "Většinou do několika dnů podle rozsahu.",
      deliverable: "Rychlejší a zálohovaný setup s krátkým návodem.",
      cta: "Optimalizovat setup",
    },
    en: {
      title: "Optimization & support",
      headline: "Keep your setup fast, clean and quiet.",
      description: "Performance tuning, migrations, backups, and workspace and home optimization.",
      forWhom: "For demanding users and small teams whose tech slows them down more than it helps.",
      proof: ["Before / after measurements", "A clear list of what's included", "Less lag, more calm"],
      included: [
        "Performance tuning and system cleanup",
        "Backup setup so you never lose anything",
        "Data migration and a move to a new machine",
        "Network and workspace optimization",
      ],
      solves: [
        "A slow, cluttered computer",
        "No backups, or unreliable ones",
        "Moving to a new machine without losing data",
        "A setup that gets in the way more than it helps",
      ],
      turnaround: "Usually within a few days, depending on scope.",
      deliverable: "A faster, backed-up setup with a short guide.",
      cta: "Optimize my setup",
    },
  },
];

export const serviceSlugs = data.map((s) => s.slug);

export function getServices(locale: string): Service[] {
  const l: Locale = locale === "en" ? "en" : "cs";
  return data.map((s) => ({ slug: s.slug, ...s[l] }));
}

export function getService(locale: string, slug: string): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug);
}
