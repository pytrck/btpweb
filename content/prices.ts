// GENERATED FILE - do not edit by hand.
// Source: BTP_Full_Service_Cenik.xlsx, public sheets plus the Standard/Premium
// retail columns. Cost, margin, supplier and the Budget tier are never read, so
// nothing confidential can reach this public repo.
// Regenerate: python scripts/gen-prices.py "<path to the workbook>"

export type PriceRow = {
  model: string;
  repair: string;
  /** Standard tier, CZK incl. VAT. 0 means free. */
  std?: number;
  /** Premium tier (OEM / best available part), CZK incl. VAT. */
  premium?: number;
  /** Used instead of a fixed price: "od 4 990 Kc" / "Cena po diagnostice". */
  from?: string;
  time?: string;
  warranty?: string;
  note?: string;
};

export type PriceGroup = { category: string; rows: PriceRow[] };

export type PriceSheet = {
  slug: string;
  title: string;
  /** Standing technical warnings that apply to the whole page. */
  notices: string[];
  groups: PriceGroup[];
};

export const pricesUpdated = "2026-09-23";

export const priceSheets: PriceSheet[] = [
  {
    slug: "iphone",
    title: "Oprava iPhone",
    notices: ["Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP.", "Neoriginální díl může v iOS zobrazit systémové upozornění o neověřeném dílu. Funkčnost Face ID nelze garantovat bez diagnostiky.", "Cílem je záchrana zařízení nebo dat; nelze předem garantovat úplnou funkčnost. Záruka se nevztahuje na nové poškození, oxidaci, poškození kapalinou, neodborný zásah jiné osoby nebo mechanické poškození."],
    groups: [
      {
        category: "Displej",
        rows: [
          { model: "iPhone 6 / 6 Plus", repair: "Výměna displeje", std: 1490, premium: 1860, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 6S / 6S Plus", repair: "Výměna displeje", std: 1490, premium: 1860, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 7 / 8 / SE 2020 / SE 2022", repair: "Výměna displeje", std: 1590, premium: 1990, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 7 Plus / 8 Plus", repair: "Výměna displeje", std: 1790, premium: 2240, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone X / XS / XR", repair: "Výměna displeje", std: 2190, premium: 2740, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone XS Max", repair: "Výměna displeje", std: 2390, premium: 2990, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 11", repair: "Výměna displeje", std: 3490, premium: 4360, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 11 Pro", repair: "Výměna displeje", std: 4490, premium: 5610, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 11 Pro Max", repair: "Výměna displeje", std: 4790, premium: 5990, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 12 mini", repair: "Výměna displeje", std: 4190, premium: 5240, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 12 / 12 Pro", repair: "Výměna displeje", std: 4490, premium: 5610, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 12 Pro Max", repair: "Výměna displeje", std: 4890, premium: 6110, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 13 mini", repair: "Výměna displeje", std: 4490, premium: 5610, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 13", repair: "Výměna displeje", std: 3390, premium: 4240, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 13 Pro", repair: "Výměna displeje", std: 3990, premium: 4990, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 13 Pro Max", repair: "Výměna displeje", std: 3590, premium: 4490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 14", repair: "Výměna displeje", std: 3590, premium: 4490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 14 Plus", repair: "Výměna displeje", std: 3590, premium: 4490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 14 Pro", repair: "Výměna displeje", std: 4890, premium: 6110, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 14 Pro Max", repair: "Výměna displeje", std: 4590, premium: 5740, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 15", repair: "Výměna displeje", std: 4590, premium: 5740, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 15 Plus", repair: "Výměna displeje", std: 3990, premium: 4990, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 15 Pro", repair: "Výměna displeje", std: 5090, premium: 6360, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 15 Pro Max", repair: "Výměna displeje", std: 4590, premium: 5740, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 16 / 16 Plus", repair: "Výměna displeje", std: 4690, premium: 5860, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 16 Pro", repair: "Výměna displeje", std: 5090, premium: 6360, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPhone 16 Pro Max", repair: "Výměna displeje", std: 4990, premium: 6240, time: "45–90 min", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava nefunkčního dotyku (bez výměny displeje, je-li možná)", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely (LCD)", repair: "Oprava podsvícení", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava obrazu / flickeringu", from: "Cena po diagnostice", time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Zelený nebo bílý displej", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Obvykle řešeno výměnou displeje — viz ceny výše." },
          { model: "Všechny modely", repair: "Výměna proximity flex kabelu", from: "od 1 190 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Vybrané modely", repair: "Kalibrace displeje / zachování True Tone", from: "od 1 490 Kč", time: "Dle rozsahu opravy", note: "Dostupnost dle modelu a nástroje." },
          { model: "Všechny modely", repair: "Výměna těsnění displeje", std: 870, premium: 1090, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "Vybrané modely", repair: "Výměna samotného skla displeje (bez celého modulu)", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Technicky a ekonomicky možné jen u některých modelů." },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "iPhone 6 / 6 Plus", repair: "Výměna baterie", std: 990, premium: 1240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 6S / 6S Plus", repair: "Výměna baterie", std: 890, premium: 1110, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 7 / 8 / SE 2020 / SE 2022", repair: "Výměna baterie", std: 990, premium: 1240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 7 Plus / 8 Plus", repair: "Výměna baterie", std: 990, premium: 1240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone X / XS / XR", repair: "Výměna baterie", std: 990, premium: 1240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone XS Max", repair: "Výměna baterie", std: 1390, premium: 1740, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 11", repair: "Výměna baterie", std: 1290, premium: 1620, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 11 Pro / Pro Max", repair: "Výměna baterie", std: 1390, premium: 1740, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 12 mini", repair: "Výměna baterie", std: 1390, premium: 1740, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 12 / 12 Pro", repair: "Výměna baterie", std: 1490, premium: 1870, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 12 Pro Max", repair: "Výměna baterie", std: 1590, premium: 1990, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 13 / 13 mini", repair: "Výměna baterie", std: 1590, premium: 1990, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 13 Pro / Pro Max", repair: "Výměna baterie", std: 1690, premium: 2120, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 14 / 14 Plus", repair: "Výměna baterie", std: 1690, premium: 2120, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 14 Pro / Pro Max", repair: "Výměna baterie", std: 1790, premium: 2240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 15 / 15 Plus", repair: "Výměna baterie", std: 1790, premium: 2240, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 15 Pro / Pro Max", repair: "Výměna baterie", std: 1890, premium: 2370, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 16 / 16 Plus", repair: "Výměna baterie", std: 1890, premium: 2370, time: "45–60 min", warranty: "6 měsíců" },
          { model: "iPhone 16 Pro / Pro Max", repair: "Výměna baterie", std: 1990, premium: 2490, time: "45–60 min", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Diagnostika rychlého vybíjení baterie", std: 400, premium: 500, time: "Dle rozsahu opravy", note: "Cena se odečte, pokud následně provedeme výměnu baterie." },
        ],
      },
      {
        category: "Napájení",
        rows: [
          { model: "Všechny modely", repair: "Oprava přehřívání", from: "Cena po diagnostice", time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Oprava samovolného vypínání", from: "Cena po diagnostice", time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Oprava nenabíjení", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Řešeno dle příčiny – konektor, baterie nebo základní deska." },
          { model: "Všechny modely", repair: "Oprava bezdrátového nabíjení", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna MagSafe / Qi cívky", from: "od 1 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna / oprava flex kabelů baterie", std: 1190, premium: 1490, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zadní sklo",
        rows: [
          { model: "iPhone 8 / X / XR", repair: "Výměna samotného zadního skla", std: 1890, premium: 2370, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 11 / 11 Pro", repair: "Výměna samotného zadního skla", std: 2190, premium: 2740, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 12 / 13", repair: "Výměna samotného zadního skla", std: 2490, premium: 3120, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 12–13 Pro / Pro Max", repair: "Výměna samotného zadního skla", std: 2990, premium: 3740, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 14 / 14 Plus", repair: "Výměna samotného zadního skla", std: 2390, premium: 2990, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 14 Pro / Pro Max", repair: "Výměna samotného zadního skla", std: 3490, premium: 4370, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "řada iPhone 15", repair: "Výměna samotného zadního skla", std: 2890, premium: 3610, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 15 Pro / Pro Max", repair: "Výměna samotného zadního skla", std: 3390, premium: 4240, time: "2–5 hod", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "Všechny modely", repair: "Výměna prachových mřížek (reproduktor / mikrofon)", std: 1020, premium: 1280, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)" },
          { model: "Všechny modely", repair: "Výměna voděodolného těsnění", std: 1190, premium: 1490, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
        ],
      },
      {
        category: "Šasi / housing",
        rows: [
          { model: "starší modely", repair: "Výměna kompletního housingu / rámu", std: 2490, premium: 3120, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 11–13", repair: "Výměna kompletního housingu / rámu", std: 3690, premium: 4620, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "iPhone 14–16", repair: "Výměna kompletního housingu / rámu", std: 4990, premium: 6240, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP." },
          { model: "Všechny modely", repair: "Narovnání nebo výměna deformovaného rámu", from: "od 2 990 Kč", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice." },
        ],
      },
      {
        category: "Nabíjecí konektor",
        rows: [
          { model: "iPhone 6–8 / SE", repair: "Výměna nabíjecího konektoru", std: 1290, premium: 1620, time: "1–3 hod", warranty: "6 měsíců", note: "Vyžaduje-li oprava zásah do základní desky, řešíme jako pokročilou opravu s cenou po diagnostice (list 8)." },
          { model: "iPhone X–11", repair: "Výměna nabíjecího konektoru", std: 1490, premium: 1870, time: "1–3 hod", warranty: "6 měsíců", note: "Vyžaduje-li oprava zásah do základní desky, řešíme jako pokročilou opravu s cenou po diagnostice (list 8)." },
          { model: "iPhone 12–13", repair: "Výměna nabíjecího konektoru", std: 1790, premium: 2240, time: "1–3 hod", warranty: "6 měsíců", note: "Vyžaduje-li oprava zásah do základní desky, řešíme jako pokročilou opravu s cenou po diagnostice (list 8)." },
          { model: "iPhone 14–16", repair: "Výměna nabíjecího konektoru", std: 2190, premium: 2740, time: "1–3 hod", warranty: "6 měsíců", note: "Vyžaduje-li oprava zásah do základní desky, řešíme jako pokročilou opravu s cenou po diagnostice (list 8)." },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Všechny modely", repair: "Sluchátko / horní reproduktor", std: 1290, premium: 1620, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Spodní reproduktor", std: 1190, premium: 1490, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Mikrofon", std: 1290, premium: 1620, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava chrčícího / zkresleného reproduktoru", from: "od 1 510 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Někdy řešitelné bez výměny." },
        ],
      },
      {
        category: "Ostatní",
        rows: [
          { model: "Všechny modely", repair: "Vibrační motorek", std: 1190, premium: 1490, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Tlačítka",
        rows: [
          { model: "Všechny modely", repair: "Power / volume / mute tlačítko", std: 1390, premium: 1740, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "iPhone 15 Pro a novější", repair: "Action Button", std: 1390, premium: 1740, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna flex kabelu tlačítek", from: "od 1 190 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Anténa",
        rows: [
          { model: "Všechny modely", repair: "Výměna Wi-Fi / Bluetooth / GSM antény (fyzický díl)", std: 1490, premium: 1870, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Nejasné signálové problémy bez zjevné příčiny řešíme jako pokročilou diagnostiku (list 8)." },
        ],
      },
      {
        category: "SIM",
        rows: [
          { model: "Všechny modely", repair: "SIM šuplík", std: 910, premium: 1140, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Kamery",
        rows: [
          { model: "Všechny modely", repair: "Sklo zadní kamery, 1 čočka", std: 1090, premium: 1370, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Za každou další prasklou čočku téhož modulu účtujeme příplatek +390 Kč." },
          { model: "Všechny modely", repair: "Přední kamera: iPhone 6–11", std: 1590, premium: 1990, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Přední kamera: iPhone 12–16", std: 1990, premium: 2490, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Zadní kamera: iPhone 6–8 / SE", std: 1590, premium: 1990, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Zadní kamera: iPhone X–11", std: 2190, premium: 2740, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Zadní kamera: iPhone 12–13", std: 2790, premium: 3490, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Zadní kamera: iPhone 14–16", std: 3790, premium: 4740, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava rozmazané, třesoucí se nebo neostřící kamery", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava blesku (LED)", std: 890, premium: 1120, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Face ID / TrueDepth",
        rows: [
          { model: "Všechny modely", repair: "Oprava Face ID / TrueDepth", from: "od 3 490 Kč", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice. Funkčnost Face ID nelze garantovat bez diagnostiky." },
          { model: "Všechny modely", repair: "Zachování Face ID při opravě původního flexu", from: "od 2 490 Kč", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice. Funkčnost Face ID nelze garantovat bez diagnostiky." },
        ],
      },
      {
        category: "Senzory",
        rows: [
          { model: "Všechny modely", repair: "Oprava proximity senzoru", from: "od 1 490 Kč", time: "Dle rozsahu opravy", note: "Součást TrueDepth modulu u novějších modelů." },
          { model: "Všechny modely", repair: "Oprava ambient light senzoru", from: "od 1 490 Kč", time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Základní deska",
        rows: [
          { model: "Všechny modely", repair: "Mikropájení jednoduché (konektor / drobný komponent)", from: "od 1 990 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Oprava nabíjení / power management na desce", from: "od 2 990 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Oprava po vodě na desce", from: "od 3 490 Kč", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice. Cílem je záchrana zařízení nebo dat; nelze předem garantovat úplnou funkčnost." },
          { model: "Všechny modely", repair: "Problém s obrazem / touch IC", from: "od 3 490 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Bootloop / restart / panic log", from: "od 2 990 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Oprava Audio IC / backlight IC", from: "od 2 990 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Oprava nefunkčního mikrofonu na základní desce", from: "od 2 490 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Čištění a oprava koroze", from: "od 1 990 Kč", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice." },
          { model: "Všechny modely", repair: "Pokročilá diagnostika a oprava základní desky (GPS, kompas, gyroskop, eSIM, Wi-Fi, Bluetooth, GSM, NFC a podobné problémy)", from: "od 1 990 Kč", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
        ],
      },
      {
        category: "Záchrana dat",
        rows: [
          { model: "Všechny modely", repair: "Oprava pro záchranu dat", from: "od 4 990 Kč", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice. Cena vždy „od“. Před zahájením doporučujeme zálohu dat, přesné podmínky sdělíme při diagnostice." },
          { model: "Všechny modely", repair: "Diagnostika pro data recovery", std: 990, premium: 1240, time: "Dle rozsahu opravy", note: "Cena se započítává do ceny záchrany dat, pokud opravu provedeme." },
        ],
      },
      {
        category: "Ostatní drobné opravy",
        rows: [
          { model: "Starší modely s Touch ID", repair: "Výměna Touch ID / home buttonu", from: "od 2 580 Kč", time: "Dle rozsahu opravy", note: "Touch ID lze zachovat pouze při opravě původního dílu. Výměna home buttonu obvykle neobnoví funkci Touch ID." },
          { model: "Všechny modely", repair: "Odstranění zaseknuté SIM karty", std: 390, premium: 490, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Výměna šroubků a drobného příslušenství (vč. pentalobe)", std: 390, premium: 490, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)" },
          { model: "Všechny modely", repair: "Čištění fotoaparátu / prostoru pod krycím sklem od prachu", std: 390, premium: 490, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Výměna magnetu MagSafe", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna interních flex kabelů (obecně)", from: "od 1 750 Kč", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice dle konkrétního flexu." },
        ],
      },
    ],
  },
  {
    slug: "ipad",
    title: "Oprava iPad",
    notices: ["Testujeme po opravě: displej a dotyk, tlačítka, kamery, reproduktory, mikrofony, nabíjení, Wi-Fi, baterie. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Displej",
        rows: [
          { model: "iPad (9./10. gen)", repair: "Výměna displeje (LCD)", std: 2490, premium: 3120, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPad Air / Air 2", repair: "Výměna displeje", std: 2990, premium: 3740, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPad Air (2020+) / Pro 11\"", repair: "Výměna displeje", from: "od 4 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena upřesněna dle přesného modelu" },
          { model: "iPad Pro 12.9\"", repair: "Výměna displeje", from: "od 5 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "iPad mini (všechny generace)", repair: "Výměna dotykového skla / displeje", from: "od 2 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Oprava dotykového skla samostatně, je-li možné", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Technicky možné jen u některých modelů" },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "iPad (9./10. gen)", repair: "Výměna baterie", std: 1990, premium: 2490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "iPad Air / Pro / mini", repair: "Výměna baterie", from: "od 2 490 Kč", time: "45–90 min", warranty: "6 měsíců", note: "Cena dle modelu" },
        ],
      },
      {
        category: "Porty",
        rows: [
          { model: "Všechny modely", repair: "Výměna Lightning / USB-C portu", from: "od 1 990 Kč", time: "1–3 hod", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Kamery",
        rows: [
          { model: "Všechny modely", repair: "Výměna zadní kamery", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna přední kamery", from: "od 1 290 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Všechny modely", repair: "Výměna reproduktoru", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna mikrofonu", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Tlačítka",
        rows: [
          { model: "Všechny modely", repair: "Výměna power / volume tlačítka", from: "od 890 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Wi-Fi",
        rows: [
          { model: "Všechny modely", repair: "Oprava Wi-Fi modulu / antény", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Apple Pencil",
        rows: [
          { model: "Pencil 1./2. generace", repair: "Diagnostika a oprava nabíjení / párování", from: "Cena po diagnostice", time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Zadní kryt",
        rows: [
          { model: "Wi-Fi verze", repair: "Výměna zadního krytu", from: "od 1 990 Kč", time: "2–5 hod", warranty: "6 měsíců", note: "U LTE verzí nutná diagnostika antén" },
        ],
      },
      {
        category: "Voda",
        rows: [
          { model: "Všechny modely", repair: "Poškození vodou – diagnostika a oprava", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Deska a data",
        rows: [
          { model: "Všechny modely", repair: "Oprava základní desky", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
          { model: "Všechny modely", repair: "Záchrana dat", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
    ],
  },
  {
    slug: "macbook",
    title: "Oprava MacBook a iMac",
    notices: ["Testujeme po opravě: displej, klávesnice, trackpad, kamera, reproduktory, porty, Wi-Fi, nabíjení, baterie. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Diagnostika",
        rows: [
          { model: "Všechny modely", repair: "Vstupní diagnostika", std: 0, time: "Dle rozsahu opravy", note: "Zdarma, pokud následně provedeme opravu" },
          { model: "Všechny modely", repair: "Diagnostika bez opravy", std: 490, premium: 620, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Displej",
        rows: [
          { model: "MacBook Air (2018–2020)", repair: "Výměna displeje", from: "od 5 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "MacBook Air M1/M2/M3", repair: "Výměna displeje", from: "od 7 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "MacBook Pro 13\"/14\"/16\"", repair: "Výměna displeje", from: "od 9 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena dle generace a typu panelu (Retina / mini-LED)" },
          { model: "iMac 21.5\" / 24\" (Retina/4.5K)", repair: "Výměna displeje (kompletní panel)", from: "od 8 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena dle generace a rozlišení panelu." },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "MacBook Air", repair: "Výměna baterie", from: "od 2 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "MacBook Pro", repair: "Výměna baterie", from: "od 2 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Klávesnice",
        rows: [
          { model: "Všechny modely", repair: "Výměna klávesnice / top case", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena dle modelu a rozsahu demontáže" },
        ],
      },
      {
        category: "Trackpad",
        rows: [
          { model: "Všechny modely", repair: "Výměna trackpadu", from: "od 1 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Panty",
        rows: [
          { model: "Všechny modely", repair: "Oprava / výměna pantů displeje", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Kamera",
        rows: [
          { model: "Všechny modely", repair: "Výměna webkamery", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Všechny modely", repair: "Výměna reproduktorů", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Chlazení",
        rows: [
          { model: "Všechny modely", repair: "Výměna ventilátoru", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Čištění chlazení a výměna teplovodivé pasty", std: 1290, premium: 1620, time: "Dle rozsahu opravy", warranty: "3 měsíce" },
          { model: "iMac (všechny modely)", repair: "Čištění chlazení a výměna teplovodivé pasty", std: 1490, premium: 1870, time: "Dle rozsahu opravy", warranty: "3 měsíce" },
        ],
      },
      {
        category: "Konektory",
        rows: [
          { model: "Všechny modely", repair: "Oprava USB-C / MagSafe / Thunderbolt portu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Wi-Fi",
        rows: [
          { model: "Všechny modely", repair: "Oprava Wi-Fi modulu / antény", from: "Cena po diagnostice", time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Úložiště",
        rows: [
          { model: "Podporované Intel modely", repair: "Upgrade / výměna SSD", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Nelze běžně upgradovat u modelů s integrovaným SSD; řešení po diagnostice." },
          { model: "iMac (podporované modely)", repair: "Upgrade / výměna SSD", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Nelze běžně upgradovat u modelů s integrovaným úložištěm; řešení po diagnostice." },
        ],
      },
      {
        category: "Paměť",
        rows: [
          { model: "Podporované Intel modely", repair: "Upgrade RAM", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Nelze běžně upgradovat u modelů s integrovanou RAM; řešení po diagnostice." },
        ],
      },
      {
        category: "Základní deska",
        rows: [
          { model: "Všechny modely", repair: "Oprava logic board (mikropájení, napájení, obraz)", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
          { model: "iMac (všechny modely)", repair: "Oprava logic board", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice." },
        ],
      },
      {
        category: "Voda",
        rows: [
          { model: "Všechny modely", repair: "Poškození vodou – diagnostika a oprava", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Všechny modely", repair: "Obnova / přeinstalace macOS", std: 990, premium: 1240, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Záloha dat", std: 690, premium: 870, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Záchrana dat", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Napájení",
        rows: [
          { model: "iMac (všechny modely)", repair: "Oprava / výměna interního zdroje", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
    ],
  },
  {
    slug: "apple-watch-airpods",
    title: "Oprava Apple Watch a AirPods",
    notices: ["Testujeme po opravě: displej a dotyk, tlačítka a korunka, reproduktor, mikrofon, nabíjení, párování, senzory. Po neautorizované opravě nelze garantovat původní stupeň odolnosti IP. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Displej",
        rows: [
          { model: "Watch Series 1–3", repair: "Výměna displeje", std: 1990, premium: 2490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "Watch Series 4–6 / SE", repair: "Výměna displeje", from: "od 2 990 Kč", time: "45–90 min", warranty: "6 měsíců" },
          { model: "Watch Series 7–10", repair: "Výměna displeje", from: "od 3 990 Kč", time: "45–90 min", warranty: "6 měsíců" },
          { model: "Watch Ultra / Ultra 2", repair: "Výměna displeje", from: "od 5 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "Všechny modely", repair: "Výměna baterie", from: "od 1 490 Kč", time: "45–90 min", warranty: "6 měsíců" },
          { model: "AirPods (1./2./3. gen, Pro)", repair: "Výměna baterie, je-li technicky možná", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "3 měsíce", note: "Ne u všech modelů technicky/ekonomicky možné" },
        ],
      },
      {
        category: "Zadní sklo",
        rows: [
          { model: "Všechny modely", repair: "Výměna zadního krytu (sklo se senzory)", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Původní stupeň odolnosti IP nelze po neautorizované opravě garantovat." },
        ],
      },
      {
        category: "Ovládání",
        rows: [
          { model: "Všechny modely", repair: "Oprava digitální korunky", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna bočního tlačítka", from: "od 890 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Všechny modely", repair: "Výměna mikrofonu", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny modely", repair: "Výměna reproduktoru", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Nabíjení",
        rows: [
          { model: "Všechny modely", repair: "Oprava bezdrátového nabíjení", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Voda",
        rows: [
          { model: "Všechny modely", repair: "Diagnostika po kontaktu s vodou", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Původní stupeň odolnosti IP nelze po neautorizované opravě garantovat." },
          { model: "AirPods / sluchátka", repair: "Diagnostika po kontaktu s vodou", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Rentabilitu opravy posoudíme před zahájením" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Všechny modely", repair: "Obnova systému / reset", std: 490, premium: 620, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Diagnostika",
        rows: [
          { model: "AirPods / sluchátka", repair: "Diagnostika a posouzení rentability opravy", std: 430, premium: 540, time: "Dle rozsahu opravy", note: "Mnoho TWS sluchátek není rentabilně opravitelných – posoudíme předem" },
        ],
      },
      {
        category: "Čištění",
        rows: [
          { model: "AirPods / sluchátka", repair: "Kompletní čištění", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Pouzdro",
        rows: [
          { model: "AirPods", repair: "Výměna nabíjecího pouzdra", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Konektor",
        rows: [
          { model: "Sluchátka s konektorem (jack / USB-C)", repair: "Oprava / výměna konektoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Reproduktor",
        rows: [
          { model: "Sluchátka", repair: "Výměna reproduktoru / měniče", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Mikrofon",
        rows: [
          { model: "Sluchátka / handsfree", repair: "Výměna mikrofonu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Párování",
        rows: [
          { model: "AirPods / Bluetooth sluchátka", repair: "Reset a oprava párování", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
    ],
  },
  {
    slug: "android",
    title: "Oprava telefonů s Androidem",
    notices: ["Testujeme po opravě: displej a dotyk, kamery, reproduktory, mikrofony, tlačítka, nabíjení, síť, Wi-Fi. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Displej",
        rows: [
          { model: "Samsung Galaxy S/A/Note (běžné modely)", repair: "Výměna displeje", from: "Cena po diagnostice", time: "45–90 min", warranty: "6 měsíců", note: "Přesná cena dle modelu" },
          { model: "Samsung Galaxy Z Flip / Fold", repair: "Výměna displeje", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Skládací displej – vyšší cena dílu" },
          { model: "Xiaomi / Redmi / POCO", repair: "Výměna displeje", from: "Cena po diagnostice", time: "45–90 min", warranty: "6 měsíců", note: "Přesná cena dle modelu" },
          { model: "Google Pixel", repair: "Výměna displeje", from: "Cena po diagnostice", time: "45–90 min", warranty: "6 měsíců", note: "Přesná cena dle modelu" },
          { model: "Huawei / Honor a ostatní značky", repair: "Výměna displeje", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Dostupnost dílu ověřujeme individuálně" },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "Samsung / Xiaomi / Pixel a ostatní", repair: "Výměna baterie", from: "Cena po diagnostice", time: "45–90 min", warranty: "6 měsíců", note: "Přesná cena dle modelu" },
        ],
      },
      {
        category: "Konektor",
        rows: [
          { model: "Všechny značky", repair: "Výměna nabíjecího konektoru (USB-C)", from: "Cena po diagnostice", time: "1–3 hod", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zadní kryt",
        rows: [
          { model: "Všechny značky", repair: "Výměna zadního krytu", from: "Cena po diagnostice", time: "2–5 hod", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Kamery",
        rows: [
          { model: "Všechny značky", repair: "Výměna zadní kamery", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny značky", repair: "Výměna krycího skla kamery", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny značky", repair: "Výměna přední kamery", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Všechny značky", repair: "Výměna sluchátka / reproduktoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Všechny značky", repair: "Výměna mikrofonu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Tlačítka",
        rows: [
          { model: "Všechny značky", repair: "Výměna power / volume tlačítka", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "SIM",
        rows: [
          { model: "Všechny značky", repair: "Výměna SIM čtečky / šuplíku", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Všechny značky", repair: "Reset, aktualizace, odstranění účtu po ověření vlastnictví", std: 490, premium: 620, time: "Dle rozsahu opravy", note: "Provádíme pouze po ověření vlastnictví zařízení" },
        ],
      },
      {
        category: "Voda",
        rows: [
          { model: "Všechny značky", repair: "Diagnostika a oprava po polití", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Základní deska",
        rows: [
          { model: "Všechny značky", repair: "Oprava základní desky", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Data",
        rows: [
          { model: "Všechny značky", repair: "Záchrana dat", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
    ],
  },
  {
    slug: "notebooky-a-pc",
    title: "Oprava notebooků a PC",
    notices: ["Testujeme po opravě: spouštění a chod systému, displej, klávesnice, porty, Wi-Fi, chlazení, baterie. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Diagnostika",
        rows: [
          { model: "Notebook / PC", repair: "Vstupní diagnostika", std: 0, time: "Dle rozsahu opravy", note: "Zdarma, pokud následně provedeme opravu" },
          { model: "Notebook / PC", repair: "Diagnostika bez opravy", std: 490, premium: 620, time: "Dle rozsahu opravy" },
          { model: "PC", repair: "Diagnostika komponent (zdroj, RAM, disk, GPU)", std: 590, premium: 740, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Chlazení",
        rows: [
          { model: "Notebook", repair: "Čištění chlazení a výměna teplovodivé pasty", std: 990, premium: 1240, time: "Dle rozsahu opravy", warranty: "3 měsíce" },
          { model: "Notebook", repair: "Výměna ventilátoru", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Úložiště",
        rows: [
          { model: "Notebook / PC", repair: "Výměna / upgrade SSD (bez přenosu dat)", std: 1490, premium: 1870, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena montáže, disk zvlášť" },
          { model: "Notebook / PC", repair: "Výměna / upgrade SSD včetně přenosu dat", std: 1990, premium: 2490, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena montáže, disk zvlášť" },
        ],
      },
      {
        category: "Paměť",
        rows: [
          { model: "Notebook / PC", repair: "Upgrade RAM", std: 490, premium: 620, time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena montáže, paměť zvlášť" },
        ],
      },
      {
        category: "Displej",
        rows: [
          { model: "Notebook", repair: "Výměna displeje", from: "od 2 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců", note: "Cena dle úhlopříčky a rozlišení" },
        ],
      },
      {
        category: "Klávesnice",
        rows: [
          { model: "Notebook", repair: "Výměna klávesnice", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "Notebook", repair: "Výměna baterie", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Konektory",
        rows: [
          { model: "Notebook", repair: "Oprava DC / napájecího konektoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Notebook", repair: "Oprava USB-C portu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Panty",
        rows: [
          { model: "Notebook", repair: "Oprava / výměna pantů displeje", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Zvuk",
        rows: [
          { model: "Notebook", repair: "Výměna reproduktorů", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Kamera",
        rows: [
          { model: "Notebook", repair: "Výměna webkamery", from: "od 890 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Wi-Fi",
        rows: [
          { model: "Notebook / PC", repair: "Výměna / oprava Wi-Fi karty", from: "od 1 450 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Notebook / PC", repair: "Reinstalace Windows včetně ovladačů", std: 990, premium: 1240, time: "Dle rozsahu opravy" },
          { model: "Notebook / PC", repair: "Odstranění malwaru a virů", std: 890, premium: 1120, time: "Dle rozsahu opravy" },
          { model: "Notebook / PC", repair: "Záloha dat", std: 690, premium: 870, time: "Dle rozsahu opravy" },
          { model: "Notebook / PC", repair: "Obnova dat", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Sestavení",
        rows: [
          { model: "PC", repair: "Sestavení nového PC (bez komponent)", std: 990, premium: 1240, time: "Dle rozsahu opravy", note: "Cena montáže, komponenty zvlášť" },
          { model: "PC", repair: "Upgrade / rozšíření PC", std: 490, premium: 620, time: "Dle rozsahu opravy", note: "Cena montáže, komponenty zvlášť" },
        ],
      },
      {
        category: "Základní deska",
        rows: [
          { model: "Notebook / PC", repair: "Oprava základní desky", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Grafická karta",
        rows: [
          { model: "Notebook / PC", repair: "Výměna / oprava GPU", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Voda",
        rows: [
          { model: "Notebook", repair: "Poškození kapalinou – diagnostika a oprava", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
    ],
  },
  {
    slug: "konzole",
    title: "Oprava herních konzolí",
    notices: ["Testujeme po opravě: spouštění, ovladače, porty, chlazení, displej (u handheldů), nabíjení. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Čištění",
        rows: [
          { model: "PS4 / PS5 / Xbox / Switch / Steam Deck", repair: "Čištění a výměna teplovodivé pasty", std: 990, premium: 1240, time: "Dle rozsahu opravy", warranty: "3 měsíce" },
        ],
      },
      {
        category: "HDMI",
        rows: [
          { model: "PS4 / PS5 / Xbox", repair: "Oprava HDMI portu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "USB-C",
        rows: [
          { model: "Switch / Steam Deck", repair: "Oprava USB-C portu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Chlazení",
        rows: [
          { model: "Všechny konzole", repair: "Výměna ventilátoru", from: "od 990 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Napájení",
        rows: [
          { model: "Všechny konzole", repair: "Oprava napájecího obvodu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Mechanika",
        rows: [
          { model: "PS4 / PS5 / Xbox", repair: "Oprava / výměna optické mechaniky", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Ovladače",
        rows: [
          { model: "Nintendo Switch (Joy-Con)", repair: "Oprava analogové páčky (drift)", std: 1380, premium: 1730, time: "Dle rozsahu opravy", warranty: "6 měsíců" },
          { model: "Steam Deck", repair: "Oprava analogové páčky (drift)", from: "od 890 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Displej",
        rows: [
          { model: "Nintendo Switch / Switch Lite", repair: "Výměna displeje", std: 1990, premium: 2490, time: "45–90 min", warranty: "6 měsíců" },
          { model: "Steam Deck", repair: "Výměna displeje", from: "od 2 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Baterie",
        rows: [
          { model: "Nintendo Switch / Switch Lite", repair: "Výměna baterie", std: 990, premium: 1240, time: "45–90 min", warranty: "6 měsíců" },
          { model: "Steam Deck", repair: "Výměna baterie", from: "od 1 490 Kč", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Nabíjení",
        rows: [
          { model: "Switch / Steam Deck", repair: "Oprava nabíjení", from: "Cena po diagnostice", time: "Dle rozsahu opravy", warranty: "6 měsíců" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Všechny konzole", repair: "Diagnostika a aktualizace softwaru", std: 490, premium: 620, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Základní deska",
        rows: [
          { model: "Všechny konzole", repair: "Oprava základní desky", from: "Cena po diagnostice", time: "2–10 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
    ],
  },
  {
    slug: "mikropajeni",
    title: "Mikropájení a oprava desek",
    notices: ["Testujeme po opravě: funkčnost opraveného konektoru / obvodu a související funkce zařízení. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Konektory",
        rows: [
          { model: "Libovolné zařízení", repair: "Mikropájení HDMI konektoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Mikropájení USB-C konektoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Mikropájení Lightning konektoru", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Mikropájení nabíjecího konektoru (obecně)", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Deska",
        rows: [
          { model: "Libovolné zařízení", repair: "Oprava konektorů a poškozených padů na desce", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Oprava napájecích obvodů", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Čištění a oprava koroze po zkratu / vodě", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Odstranění zkratu", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
          { model: "Libovolné zařízení", repair: "Výměna drobných SMD komponent", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Data",
        rows: [
          { model: "Libovolné zařízení", repair: "Záchrana dat z poškozené desky", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
    ],
  },
  {
    slug: "software-a-data",
    title: "Software, data a IT služby",
    notices: ["Testujeme po opravě: funkčnost po nastavení / instalaci dle rozsahu služby. Neoriginální díl může zobrazit systémovou hlášku výrobce a může omezit záruku výrobce."],
    groups: [
      {
        category: "Nastavení",
        rows: [
          { model: "Telefon / počítač", repair: "Nastavení nového zařízení", std: 490, premium: 620, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Přenos dat",
        rows: [
          { model: "Telefon / počítač", repair: "Přenos dat mezi zařízeními", std: 590, premium: 740, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Záloha",
        rows: [
          { model: "Telefon / počítač", repair: "Záloha dat", std: 590, premium: 740, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Systém",
        rows: [
          { model: "Telefon / počítač", repair: "Instalace / reinstalace operačního systému", std: 890, premium: 1120, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Aktivace",
        rows: [
          { model: "Telefon / počítač", repair: "Aktivace zařízení / pomoc s účtem výrobce", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "E-mail",
        rows: [
          { model: "Počítač / telefon", repair: "Nastavení e-mailu", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Síť",
        rows: [
          { model: "Domácnost / kancelář", repair: "Nastavení routeru a Wi-Fi", std: 490, premium: 620, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Tiskárna",
        rows: [
          { model: "Počítač", repair: "Nastavení a instalace tiskárny", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Bezpečnost",
        rows: [
          { model: "Počítač", repair: "Odstranění virů a malwaru", std: 890, premium: 1120, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Data",
        rows: [
          { model: "Libovolné zařízení", repair: "Obnova dat ze zálohy", std: 490, premium: 620, time: "Dle rozsahu opravy" },
          { model: "Libovolné zařízení", repair: "Záchrana dat z nefunkčního zařízení", from: "Cena po diagnostice", time: "2–7 pracovních dní", note: "Konečná cena po diagnostice" },
        ],
      },
      {
        category: "Software",
        rows: [
          { model: "Počítač", repair: "Instalace programů", std: 390, premium: 490, time: "Dle rozsahu opravy" },
        ],
      },
      {
        category: "Sestavení",
        rows: [
          { model: "PC", repair: "Sestavení PC na míru (bez komponent)", std: 990, premium: 1240, time: "Dle rozsahu opravy", note: "Cena montáže, komponenty zvlášť" },
        ],
      },
      {
        category: "Podpora",
        rows: [
          { model: "Telefon / počítač", repair: "Vzdálená podpora (do 30 min)", std: 390, premium: 490, time: "do 30 min" },
        ],
      },
    ],
  },
  {
    slug: "diagnostika",
    title: "Diagnostika a servisní úkony",
    notices: [],
    groups: [
      {
        category: "Diagnostika a servis",
        rows: [
          { model: "Všechny modely", repair: "Základní diagnostika při následné opravě", std: 0, time: "Dle rozsahu opravy", note: "Zdarma, pokud následně provedeme opravu." },
          { model: "Všechny modely", repair: "Diagnostika bez opravy", std: 400, premium: 500, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Rychlá / expresní diagnostika", std: 690, premium: 870, time: "do 15 min", note: "Přednostní vyřízení mimo pořadí." },
          { model: "Všechny modely", repair: "Čištění nabíjecího konektoru / reproduktoru", std: 390, premium: 490, time: "Dle rozsahu opravy", note: "Zdarma, je-li součástí jiné placené opravy." },
          { model: "Všechny modely", repair: "Kompletní čištění zařízení", std: 690, premium: 870, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Přenos dat / nastavení telefonu", std: 690, premium: 870, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Obnova iOS / aktualizace / reset", std: 490, premium: 620, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Záloha dat", std: 690, premium: 870, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Vyčištění po polití", std: 1490, premium: 1870, time: "Dle rozsahu opravy", note: "Bez garance funkčnosti po zásahu kapaliny. Cílem je záchrana zařízení nebo dat; nelze předem garantovat úplnou funkčnost." },
          { model: "Všechny modely", repair: "Záchrana dat po vodě / vadné desce", from: "od 4 990 Kč", time: "2–7 pracovních dní", note: "Cena vždy „od“. Před zahájením doporučujeme zálohu dat, přesné podmínky sdělíme při diagnostice. Cílem je záchrana zařízení nebo dat; nelze předem garantovat úplnou funkčnost." },
          { model: "Všechny modely", repair: "Vysušení a dekontaminace zařízení", from: "od 990 Kč", time: "Dle rozsahu opravy", note: "Doporučeno ihned po kontaktu s kapalinou, ideálně před diagnostikou." },
          { model: "Všechny modely", repair: "Obnova dat ze zálohy", std: 390, premium: 490, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Pomoc s Apple ID", std: 390, premium: 490, time: "Dle rozsahu opravy", note: "Cena za 30 minut práce." },
          { model: "Všechny modely", repair: "Nastavení eSIM", std: 390, premium: 490, time: "Dle rozsahu opravy" },
          { model: "Všechny modely", repair: "Nalepení ochranného skla", std: 199, premium: 250, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)", note: "99 Kč při nákupu skla u nás." },
          { model: "Všechny modely", repair: "Instalace hydrogelové fólie", std: 249, premium: 320, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)" },
          { model: "Všechny modely", repair: "Výměna ochranného skla / fólie", std: 199, premium: 250, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)" },
          { model: "Všechny modely", repair: "Aplikace ochranného krytu", std: 99, premium: 130, time: "Dle rozsahu opravy", warranty: "30 dní (vada materiálu)", note: "Zdarma při nákupu krytu u nás." },
          { model: "Všechny modely", repair: "Prodej a montáž příslušenství", from: "Cena po diagnostice", time: "Dle rozsahu opravy", note: "Dle vybraného příslušenství." },
        ],
      },
    ],
  },
];

export const priceSheetSlugs = priceSheets.map((s) => s.slug);

export function getPriceSheet(slug: string): PriceSheet | undefined {
  return priceSheets.find((s) => s.slug === slug);
}

/**
 * A row's numeric price: the fixed Standard price, or the number inside an
 * "od 4 990 Kc" string. Rows quoted only after diagnosis have none.
 */
export function priceValue(row: PriceRow): number | undefined {
  if (typeof row.std === "number" && row.std > 0) return row.std;
  const digits = row.from?.match(/\d[\d\s\u00a0]*/);
  if (!digits) return undefined;
  const n = Number(digits[0].replace(/[\s\u00a0]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Lowest price anywhere on a sheet. Includes the "od ..." rows. */
export function lowestPrice(sheet: PriceSheet): number | undefined {
  const all = sheet.groups
    .flatMap((g) => g.rows.map(priceValue))
    .filter((p): p is number => p !== undefined);
  return all.length ? Math.min(...all) : undefined;
}

/**
 * The two repairs people actually price-check, so a teaser never leads with a
 * 390 Kc stuck-SIM-tray job on a page someone opened about a screen.
 *
 * Matched on the repair name, not the category: the Displej group also holds
 * gasket swaps at 870 Kc and the Baterie group a 400 Kc drain diagnostic, and
 * either would advertise a screen replacement at a quarter of its real price.
 */
export function headlinePrices(sheet: PriceSheet): { category: string; from: number }[] {
  const out: { category: string; from: number }[] = [];
  for (const match of ["výměna displeje", "výměna baterie"]) {
    let label: string | undefined;
    let low: number | undefined;
    for (const group of sheet.groups) {
      for (const row of group.rows) {
        if (!row.repair.toLowerCase().startsWith(match)) continue;
        const value = priceValue(row);
        if (value === undefined) continue;
        if (low === undefined || value < low) {
          low = value;
          label = group.category;
        }
      }
    }
    if (low !== undefined && label) out.push({ category: label, from: low });
  }
  return out;
}
