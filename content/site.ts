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
  // ponytail: phone hidden until ready to publish
  // phone: "+420 721 437 286",
  // TODO: replace with the real service city / area
  city: "Mladá Boleslav / Liberec",
  // TODO: add handles when channels go live (empty = hidden in UI)
  social: {
    instagram: "breakthepattern.club",
    facebook: "",
    tiktok: "breakthepattern4",
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
