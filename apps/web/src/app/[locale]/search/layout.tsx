import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { HREFLANG_MAP, LOCALES, SITE_URL } from "@/constants/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.search" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const url = `${SITE_URL}/${locale}/search`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}/search`])),
        "x-default": `${SITE_URL}/ko/search`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: tMeta("title"),
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: t("title") }],
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          name: "반려견 동반 제주 장소 검색",
          description: "카테고리와 지역으로 반려견 동반 가능한 제주 명소 검색",
          url: `${SITE_URL}/ko/search`,
          inLanguage: "ko-KR",
        }}
      />
      {children}
    </>
  );
}
