import reviews from "./google-reviews.json";

export type GoogleReview = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text?: string;
};

// CI replaces the verified snapshot with all reviews from this Business Profile.
export const googleReviews = reviews as GoogleReview[];
