import { ScrollReveal } from "./ScrollReveal";

/** Back-compat wrapper - now scroll-linked + reversible. */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ScrollReveal className={className}>{children}</ScrollReveal>;
}
