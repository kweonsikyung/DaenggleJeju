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
  const t = await getTranslations({ locale, namespace: "pages.map" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const url = `${SITE_URL}/${locale}/map`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),

    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}/map`])),
        "x-default": `${SITE_URL}/ko/map`,
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

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "댕글제주 지도",
          applicationCategory: "TravelApplication",
          operatingSystem: "iOS, Android, Web",
          description: "반려견 동반 가능 제주 장소를 지도로 탐색하는 웹앱",
          offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          url: `${SITE_URL}/ko/map`,
        }}
      />
      {children}
    </>
  );
}
