/**
 * Single source of truth for brand-level constants and contact details.
 * Everything marked TODO is a temporary placeholder — replace here once final,
 * and it propagates across metadata, footer and contact.
 */
export const site = {
  name: "Break The Pattern",
  shortName: "BTP",
  // TODO: confirm final production domain
  url: "https://breakthepattern.cz",
  // TODO: replace with the real inbox
  email: "ahoj@breakthepattern.cz",
  // TODO: replace with the real phone number
  phone: "+420 000 000 000",
  // TODO: replace with the real service city / area
  city: "[Město]",
  // TODO: add handles when channels go live (empty = hidden in UI)
  social: {
    instagram: "",
    linkedin: "",
    github: "",
  },
} as const;

export const socialLinks = Object.entries(site.social)
  .filter(([, href]) => href)
  .map(([key, href]) => ({ key, href }));
