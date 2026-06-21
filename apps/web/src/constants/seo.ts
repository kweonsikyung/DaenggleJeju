export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://daengglejeju.com";

export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const HREFLANG_MAP: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en",
  ja: "ja",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

export const STATIC_SEO_ROUTES = [
  { path: "", changeFrequency: "daily" as const, priority: 1.0 },
  { path: "/map", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/dangle", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/list", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/search", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/jeju", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/my", changeFrequency: "weekly" as const, priority: 0.5 },
] as const;

export const PAGE_JSON_LD_TYPES: Record<string, string> = {
  home: "WebSite",
  map: "WebApplication",
  dangle: "CollectionPage",
  list: "CollectionPage",
  search: "SearchResultsPage",
  jeju: "TravelAction",
  detail: "TouristAttraction",
};
