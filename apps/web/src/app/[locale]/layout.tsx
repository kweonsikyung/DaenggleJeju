import type { Metadata } from "next";
import "../globals.css";
import "daenggle-ui/styles";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { IconProvider } from "@/components/providers/IconProvider";
import { SWRProvider } from "@/components/providers/SWRProvider";
import { HREFLANG_MAP, LOCALES, SITE_URL } from "@/constants/seo";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";

const pretendard = localFont({
  src: [
    { path: "../fonts/Pretendard-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Pretendard-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Pretendard-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Pretendard-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Pretendard-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/Pretendard-Black.ttf", weight: "900", style: "normal" },
    { path: "../fonts/Pretendard-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Pretendard-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../fonts/Pretendard-Thin.ttf", weight: "100", style: "normal" },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

const laundryGothic = localFont({
  src: [
    { path: "../fonts/LaundryGothic-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/LaundryGothic-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-laundry",
});

const ogImageUrl = `${SITE_URL}/og-image.png`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    icons: { icon: "/favicon.ico" },

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [HREFLANG_MAP[l], `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/ko`,
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      siteName: t("title"),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t("title") }],
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageUrl],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${pretendard.variable} ${laundryGothic.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY ? (
          <Script
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false&libraries=services,clusterer`}
            strategy="beforeInteractive"
          />
        ) : null}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "댕글제주",
            url: SITE_URL,
            description: "15초 영상 추천 반려견 여행 앱",
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/${locale}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <IconProvider>
            <SWRProvider>
              <div className="wrapper">{children}</div>
            </SWRProvider>
          </IconProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
