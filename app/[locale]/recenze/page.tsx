import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { googleReviewUrl, reviewCopy } from "@/content/review";
import { googleReviews } from "@/content/reviews";
import { site } from "@/content/site";
import { ScrollOrb } from "@/components/ui/ScrollOrb";
import { Review } from "./Review";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale === "en" ? "en" : "cs";
  const copy = reviewCopy[locale];
  return {
    title: copy.title,
    description: copy.metaDescription,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: `${site.url}${locale === "en" ? "/en" : ""}/recenze/` },
  };
}

export default function ReviewPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === "en" ? "en" : "cs";
  const copy = reviewCopy[locale];

  return (
    <div className="relative">
      {/* mirrored (negative amp) and wound tighter than the other pages' orbs */}
      <ScrollOrb text="NO SCRIPT" amp={-30} cycles={3.2} jag={19} />
      <PageHeader title={copy.title} subtitle={copy.intro} />

      <section className="container-x grid gap-10 pb-section md:grid-cols-2 md:gap-16">
        <div>
          <p className="label text-accent-from">{copy.eyebrow}</p>
          <h2 className="mt-5 font-head text-h2 font-bold text-balance">{copy.prompt}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{copy.note}</p>
        </div>
        <div className="border-t border-line">
          <ol className="list-none">
            {[copy.stepOne, copy.stepTwo, copy.stepThree].map((step) => (
              <li key={step} className="border-b border-line py-5 font-head text-lg font-medium text-paper sm:text-xl">
                {step}
              </li>
            ))}
          </ol>
          <a
            href={googleReviewUrl}
            data-umami-event="review-google-click"
            className="btp-focus btn-paper group mt-8 inline-flex min-h-14 items-center justify-between gap-8 px-6 py-4 text-sm font-semibold active:scale-[0.96] sm:text-base"
          >
            {copy.cta}
            <span aria-hidden className="text-accent-from transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      {googleReviews.length > 0 && (
        <section className="container-x pb-section" aria-label={copy.reviewsTitle}>
          <SectionHeader title={copy.reviewsTitle} />
          {googleReviews.map((review, i) => (
            <Review
              key={review.id}
              review={review}
              index={i}
              source={copy.reviewSource}
              ratingLabel={copy.ratingLabel}
              ratingOnly={copy.ratingOnly}
            />
          ))}
        </section>
      )}
    </div>
  );
}
