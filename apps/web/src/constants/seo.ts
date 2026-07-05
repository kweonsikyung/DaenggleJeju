export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://daengglejeju.site";

export const LOCALES = ["ko", "en", "ja"] as const;
export type SupportedLocale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

export const HREFLANG_MAP: Record<SupportedLocale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

export const STATIC_SEO_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/map", priority: 0.9 },
  { path: "/dangle", priority: 0.9 },
  { path: "/list", priority: 0.8 },
  { path: "/search", priority: 0.7 },
  { path: "/jeju", priority: 0.8 },
];

export const PAGE_JSON_LD_TYPES: Record<string, string> = {
  home: "WebSite",
  map: "Map",
  dangle: "VideoObject",
  list: "ItemList",
  search: "SearchAction",
  jeju: "TouristTrip",
  detail: "LocalBusiness",
};
