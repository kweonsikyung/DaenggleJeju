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
  const t = await getTranslations({ locale, namespace: "pages.list" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const url = `${SITE_URL}/${locale}/list`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}/list`])),
        "x-default": `${SITE_URL}/ko/list`,
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

export default function ListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "반려견 동반 제주 장소 목록",
          description: "반려견과 함께 갈 수 있는 제주도 카페·식당·숙소·관광지 전체 목록",
          url: `${SITE_URL}/ko/list`,
          inLanguage: "ko-KR",
        }}
      />
      {children}
    </>
  );
}
