import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const placeId = "ChIJkRPHK91sgosR0CeJJddcDDM";
const output = fileURLToPath(new URL("../content/google-reviews.json", import.meta.url));
const credentials = {
  clientId: process.env.GOOGLE_BP_CLIENT_ID,
  clientSecret: process.env.GOOGLE_BP_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_BP_REFRESH_TOKEN,
};

const supplied = Object.values(credentials).filter(Boolean).length;
if (supplied === 0) {
  console.log("Google review sync: credentials absent; using the verified snapshot.");
} else if (supplied !== 3) {
  throw new Error("Google review sync: set all three GOOGLE_BP_* credentials.");
} else {
  await syncReviews();
}

async function syncReviews() {
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      refresh_token: credentials.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!tokenResponse.ok) throw new Error(`Google OAuth failed (${tokenResponse.status}).`);
  const { access_token: accessToken } = await tokenResponse.json();
  if (!accessToken) throw new Error("Google OAuth returned no access token.");

  async function googleGet(url) {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error(`Google Business Profile request failed (${response.status}) at ${url.origin}${url.pathname}.`);
    return response.json();
  }

  async function listAll(baseUrl, collection, params = {}) {
    const items = [];
    const seenTokens = new Set();
    let token = "";
    do {
      const url = new URL(baseUrl);
      for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
      if (token) url.searchParams.set("pageToken", token);
      const page = await googleGet(url);
      if (!Array.isArray(page[collection]) && page[collection] !== undefined) {
        throw new Error(`Google Business Profile returned invalid ${collection} data.`);
      }
      items.push(...(page[collection] ?? []));
      token = page.nextPageToken || "";
      if (token && seenTokens.has(token)) throw new Error("Google Business Profile repeated a page token.");
      if (token) seenTokens.add(token);
    } while (token);
    return items;
  }

  const accounts = await listAll(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    "accounts",
    { pageSize: "20" },
  );
  let matchedAccount;
  let matchedLocation;
  for (const account of accounts) {
    if (!/^accounts\/[^/]+$/.test(account.name ?? "")) continue;
    const locations = await listAll(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations`,
      "locations",
      { readMask: "name,metadata", pageSize: "100" },
    );
    const location = locations.find((item) => item.metadata?.placeId === placeId);
    if (location) {
      matchedAccount = account.name;
      matchedLocation = location.name;
      break;
    }
  }
  if (!matchedLocation || !/^locations\/[^/]+$/.test(matchedLocation)) {
    throw new Error(`BTP Google Business Profile location ${placeId} was not found for this account.`);
  }

  const rawReviews = await listAll(
    `https://mybusiness.googleapis.com/v4/${matchedAccount}/${matchedLocation}/reviews`,
    "reviews",
    { pageSize: "50", orderBy: "updateTime desc" },
  );
  const ratings = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  const reviews = rawReviews.map((review) => {
    const rating = ratings[review.starRating];
    if (!review.reviewId || !rating) throw new Error("Google Business Profile returned an invalid review.");
    return {
      id: review.reviewId,
      author: review.reviewer?.isAnonymous ? "Google user" : (review.reviewer?.displayName || "Google user"),
      rating,
      ...(review.comment ? { text: review.comment } : {}),
    };
  });
  await writeFile(output, `${JSON.stringify(reviews, null, 2)}\n`, "utf8");
  console.log(`Google review sync: saved ${reviews.length} reviews from the BTP profile.`);
}
