/**
 * Social proof data. All arrays are intentionally EMPTY for now — the matching
 * sections (LogoWall, Testimonials) auto-hide while empty and render a premium
 * layout the moment you add entries. No layout changes needed later.
 */

export type ClientLogo = {
  name: string;
  /** path under /public, e.g. "/logos/acme.svg" — SVG or transparent PNG */
  src: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

// TODO: add client / partner logos here. Drop files in /public/logos.
export const clientLogos: ClientLogo[] = [];

// TODO: add real testimonials here once collected.
export const testimonials: Testimonial[] = [];
