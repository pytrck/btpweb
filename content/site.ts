/**
 * Single source of truth for brand-level constants and contact details.
 * Everything marked TODO is a temporary placeholder - replace here once final,
 * and it propagates across metadata, footer and contact.
 */
export const site = {
  name: "Break The Pattern",
  shortName: "BTP",
  url: "https://breakthepattern.cz",
  email: "breakthepatterninfo@gmail.com",
  // Web3Forms access key - powers the contact form on a static host (no backend).
  // This key is PUBLIC by design (safe in client code); spam is filtered server-side.
  // TODO: get a free key at https://web3forms.com (enter the email above, no signup),
  // paste it here. Until then the form fails honestly and shows the email fallback.
  web3formsKey: "d69c08d8-a041-4c21-8763-3ce3ecb8ca15",
  // Umami Cloud analytics. This ID is PUBLIC by design (it ships in the HTML).
  // Cookieless, and additionally gated behind the consent banner - the tracker
  // is only injected after the visitor allows it (components/layout/CookieConsent).
  // TODO: sign up free at https://cloud.umami.is, add breakthepattern.cz,
  // copy the "Website ID" from Settings -> Websites -> Edit, paste it here.
  // Empty = no script is emitted at all (analytics simply off).
  umamiId: "c36b342e-49fa-4ae8-870b-354b51b2cadc",
  // Microsoft Clarity project ID - session recordings + heatmaps, free and
  // unlimited. Public by design. Unlike Umami this DOES set cookies, so it only
  // ever loads after the visitor allows analytics, and ad storage is denied.
  // TODO: sign up free at https://clarity.microsoft.com, add breakthepattern.cz,
  // copy the project ID from Settings -> Overview, paste it here.
  // Empty = Clarity never loads.
  clarityId: "yjwijm749i",
  // Google Search Console verification token (the content="..." value from the
  // "HTML tag" method). Empty = no meta emitted. DNS TXT verification at your
  // registrar works too and needs no code - use either.
  googleVerification: "xY-izv_ypc_x-ghNoOdh2oUKmwvZzS8VWIvPQScJIn8",
  // ponytail: phone hidden until ready to publish. This repo is PUBLIC - paste
  // the number here only at the moment it should appear on the site.
  // phone: "",
  // TODO: replace with the real service city / area
  city: "Mladá Boleslav / Liberec",
  // TODO: add handles when channels go live (empty = hidden in UI).
  // Facebook intentionally absent - no plans for a page.
  social: {
    instagram: "breakthepattern.club",
    tiktok: "breakthepattern.club",
  },
} as const;

// Values in `social` above are bare handles; map each platform to its base URL.
const socialBase: Record<string, string> = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/@",
  linkedin: "https://linkedin.com/company/",
  github: "https://github.com/",
};

export const socialLinks = Object.entries(site.social)
  .filter(([, handle]) => handle)
  .map(([key, handle]) => ({ key, href: (socialBase[key] ?? "https://") + handle }));
