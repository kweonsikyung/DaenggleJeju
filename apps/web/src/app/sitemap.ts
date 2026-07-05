import type { MetadataRoute } from "next";
import { getPlaceList } from "@/api/place";
import { HREFLANG_MAP } from "@/constants/seo";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/map", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/dangle", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/list", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/search", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/jeju", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/my", priority: 0.5, changeFrequency: "weekly" as const },
];

function buildAlternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((l) => [
      HREFLANG_MAP[l as keyof typeof HREFLANG_MAP] ?? l,
      `${siteUrl}/${l}${path}`,
    ])
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap(
    ({ path, priority, changeFrequency }) =>
      routing.locales.map((locale) => ({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: buildAlternates(path) },
      }))
  );

  let placeEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await getPlaceList({ all: true, limit: 500 });
    placeEntries = res.items.flatMap((item) =>
      routing.locales.map((locale) => ({
        url: `${siteUrl}/${locale}/detail/${item.contentId}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: { languages: buildAlternates(`/detail/${item.contentId}`) },
      }))
    );
  } catch {
    // 장소 목록 조회 실패 시 정적 라우트만 포함
  }

  return [...staticEntries, ...placeEntries];
}
