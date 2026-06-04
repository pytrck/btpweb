// Pass-through root layout. The real <html>/<body> live in app/[locale]/layout.tsx
// (locale-aware) and in app/not-found.tsx (global 404). This layout exists only so
// the root-level not-found page has a root layout, per the next-intl App Router setup.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
