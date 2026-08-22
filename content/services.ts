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

export const services: Service[] = [
  {
    slug: "oprava-telefonu",
    title: "Oprava telefonů",
    headline: "Prasklý, mrtvý, utopený? Vrátíme ho do hry.",
    description:
      "Displeje, baterie, konektory, voda. Poctivá diagnóza, rychlý termín, žádné zbytečné upsellování.",
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
  {
    slug: "weby-na-miru",
    title: "Weby na míru",
    headline: "Weby, co nevypadají jako všechny ostatní.",
    description:
      "Návrh a vývoj na míru - rychlé, moderní, vaše. Žádné šablony, žádný balast z page builderu.",
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
  {
    slug: "oprava-techniky",
    title: "Oprava a diagnostika elektroniky",
    headline: "Když to nenaběhne, nenastartuje a zlobí.",
    description:
      "Notebooky, konzole, disky a další elektronika. Nejdřív diagnóza, pak oprava, co vydrží.",
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
  {
    slug: "pokrocila-reseni",
    title: "Pokročilá řešení",
    headline: "Problém, který nikdo jiný nechtěl vzít.",
    description:
      "Záchrana dat, automatizace, integrace - ta opravdu těžká věc, co „prý nejde“.",
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
  {
    slug: "optimalizace-a-podpora",
    title: "Optimalizace a podpora",
    headline: "Ať váš setup šlape rychle, čistě a potichu.",
    description:
      "Ladění výkonu, migrace, zálohy, optimalizace pracoviště i domácnosti.",
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
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
