import { notFound } from "next/navigation";

// Catch-all for unmatched paths inside the locale segment so that unknown URLs
// render the branded, localized not-found page (app/[locale]/not-found.tsx)
// instead of Next's default 404.
export default function CatchAll() {
  notFound();
}
