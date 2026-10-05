"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { GoogleReview } from "@/content/reviews";
import { useReveal } from "@/lib/useReveal";
import styles from "./reviews.module.css";

// Where the top rule fractures, % from the left. Cycles so neighbouring reviews
// never break in the same spot.
const FAULTS = [14, 58, 34, 72];

// The quote is the display type, and its size follows its length: a five-word
// verdict lands loud, a long story stays readable.
const LOUD = "text-[clamp(2rem,5.2vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-balance";
const MID = "text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.01em] text-balance";
const CALM = "max-w-[60ch] text-xl font-medium leading-snug text-pretty sm:text-2xl";

/**
 * One Google review as a full-width statement instead of a card. Rows alternate
 * their column offset and every top rule carries a segment knocked off its line
 * - the pattern, broken.
 *
 * Glitch: at rest the quote is plain text. `burst` tears it into sideways
 * bands once when the row scrolls in and again on pointer enter, then clears
 * itself. The bands are two aria-hidden copies of the quote (see the module).
 */
export function Review({
  review,
  index,
  source,
  ratingLabel,
  ratingOnly,
}: {
  review: GoogleReview;
  index: number;
  source: string;
  ratingLabel: string;
  ratingOnly: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>(0.35);
  const [burst, setBurst] = useState(false);
  useEffect(() => {
    if (shown) setBurst(true);
  }, [shown]);

  const quote = review.text ? `„${review.text}“` : ratingOnly;
  const size = !review.text ? CALM : quote.length <= 70 ? LOUD : quote.length <= 180 ? MID : CALM;
  const shifted = index % 2 === 1;
  const col = `relative col-span-12 md:col-span-10 ${shifted ? "md:col-start-3" : ""}`;

  return (
    <article
      ref={ref}
      onPointerEnter={() => setBurst(true)}
      className={`${burst ? styles.burst : ""} relative isolate grid grid-cols-12 gap-y-8 pb-14 md:pb-20`}
      style={{ "--i": index } as CSSProperties}
    >
      <span aria-hidden className="col-span-12 flex">
        <span className="h-px bg-line" style={{ width: `${FAULTS[index % FAULTS.length]}%` }} />
        <span className={styles.fault} />
        <span className="h-px flex-1 bg-line" />
      </span>
      <span aria-hidden className={`${styles.glow} ${shifted ? "right-0" : "left-0"}`} />

      <blockquote className={`${col} pt-4 md:pt-8`}>
        <p className={`${styles.quote} font-head ${review.text ? "text-paper" : "text-muted"} ${size}`}>
          <span className={styles.base} onAnimationEnd={() => setBurst(false)}>
            {quote}
          </span>
          <span aria-hidden className={`${styles.slice} ${styles.sliceA}`}>{quote}</span>
          <span aria-hidden className={`${styles.slice} ${styles.sliceB}`}>{quote}</span>
        </p>
      </blockquote>

      <footer className={`${col} flex flex-wrap items-center justify-between gap-x-8 gap-y-4`}>
        <p className="font-head text-lg font-medium text-paper">{review.author}</p>
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          <span role="img" aria-label={`${ratingLabel}: ${review.rating}/5`} className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`${styles.pip} ${n <= review.rating ? styles.pipOn : ""}`}
                style={{ "--n": n } as CSSProperties}
              />
            ))}
          </span>
          <span aria-hidden className="text-paper">
            {review.rating}/5
          </span>
          <span>{source}</span>
        </div>
      </footer>
    </article>
  );
}
