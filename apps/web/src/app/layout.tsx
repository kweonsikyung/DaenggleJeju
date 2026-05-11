import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { SWRProvider } from "@/components/providers/SWRProvider";

const pretendard = localFont({
  src: [
    { path: "./fonts/Pretendard-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Pretendard-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Pretendard-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Pretendard-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/Pretendard-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    { path: "./fonts/Pretendard-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/Pretendard-Light.ttf", weight: "300", style: "normal" },
    {
      path: "./fonts/Pretendard-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    { path: "./fonts/Pretendard-Thin.ttf", weight: "100", style: "normal" },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

const laundryGothic = localFont({
  src: [
    {
      path: "./fonts/LaundryGothic-Regular.woff",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/LaundryGothic-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-laundry",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "댕글제주",
  description: "15초 영상 추천 반려견 여행 앱",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "댕글제주",
    description: "15초 영상 추천 반려견 여행 앱",
    url: siteUrl,
    siteName: "댕글제주",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "댕글제주 - 반려견 동반 제주 여행",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "댕글제주",
    description: "15초 영상 추천 반려견 여행 앱",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${laundryGothic.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY ? (
          <Script
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false&libraries=services,clusterer`}
            strategy="beforeInteractive"
          />
        ) : null}
        <SWRProvider>
          <div className="wrapper">{children}</div>
        </SWRProvider>
      </body>
    </html>
  );
}
