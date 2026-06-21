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
  const t = await getTranslations({ locale, namespace: "pages.dangle" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const url = `${SITE_URL}/${locale}/dangle`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),

    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}/dangle`])),
        "x-default": `${SITE_URL}/ko/dangle`,
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

export default function DangleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "댕글 - 반려견 제주 여행 숏폼",
          description: "실제 견주가 공유하는 반려견 제주 여행 15초 숏폼 영상 모음",
          url: `${SITE_URL}/ko/dangle`,
          inLanguage: "ko-KR",
        }}
      />
      {children}
    </>
  );
}
