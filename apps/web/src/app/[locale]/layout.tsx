import type { Metadata } from "next";
import "daenggle-ui/styles";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { IconProvider } from "@/components/providers/IconProvider";
import { SWRProvider } from "@/components/providers/SWRProvider";
import { routing } from "@/i18n/routing";

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
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteUrl,
      siteName: t("title"),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: t("title") }],
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
    <>
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
    </>
  );
}
