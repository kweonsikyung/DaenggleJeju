import type { Metadata } from "next";
import "../globals.css";
import "daenggle-ui/styles";
import localFont from "next/font/local";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { IconProvider } from "@/components/providers/IconProvider";
import { SWRProvider } from "@/components/providers/SWRProvider";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const ogImageUrl = `${siteUrl}/og-image.png`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/favicon.ico" },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        ko: `${siteUrl}/ko`,
        en: `${siteUrl}/en`,
        ja: `${siteUrl}/ja`,
        "x-default": `${siteUrl}/ko`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
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
