import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { HREFLANG_MAP, LOCALES, SITE_URL } from "@/constants/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; contentId: string }>;
}): Promise<Metadata> {
  const { locale, contentId } = await params;
  const t = await getTranslations({ locale, namespace: "pages.detail" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const url = `${SITE_URL}/${locale}/detail/${contentId}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}/detail/${contentId}`])
        ),
        "x-default": `${SITE_URL}/ko/detail/${contentId}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: tMeta("title"),
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: t("title") }],
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          description: "반려견 동반 가능 여부, 입장 조건, 실제 방문 리뷰를 확인할 수 있는 제주 장소",
          touristType: "반려견 동반 여행객",
          inLanguage: "ko-KR",
          isAccessibleForFree: true,
        }}
      />
      {children}
    </>
  );
}
