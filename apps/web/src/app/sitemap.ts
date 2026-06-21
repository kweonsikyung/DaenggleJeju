import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPlaceList } from "@/api/place";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const STATIC_ROUTES = ["/map", "/search", "/dangle", "/my", "/care"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
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
      }))
    );
  } catch {
    // 장소 목록 조회 실패 시 정적 라우트만 포함
  }

  return [...staticEntries, ...placeEntries];
}
