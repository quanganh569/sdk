const PUBLIC_PRODUCTION_URL = process.env.PUBLIC_PRODUCTION_URL;
const PUBLIC_DEVELOPMENT_URL = "https://api-cmp.5labs.io";
const currentUrl = typeof window !== "undefined" ? window.location.href : "";
const developmentMode =
  currentUrl.includes("localhost") ||
  currentUrl.includes("127.0.0.1") ||
  currentUrl.includes("vercel") ||
  currentUrl.includes("staging");

const URL = developmentMode
  ? PUBLIC_DEVELOPMENT_URL.replace(/^https:\/\//, "https://")
  : PUBLIC_PRODUCTION_URL;

// remove in production
if (PUBLIC_PRODUCTION_URL)
  if (currentUrl.includes(PUBLIC_PRODUCTION_URL)) {
  }

const BASE_URL = URL;

export default BASE_URL;
