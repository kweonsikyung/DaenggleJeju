import "./globals.css";
import localFont from "next/font/local";
import { headers } from "next/headers";

const pretendard = localFont({
  src: [
    { path: "./fonts/Pretendard-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Pretendard-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Pretendard-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Pretendard-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Pretendard-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/Pretendard-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/Pretendard-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Pretendard-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/Pretendard-Thin.ttf", weight: "100", style: "normal" },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

const laundryGothic = localFont({
  src: [
    { path: "./fonts/LaundryGothic-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/LaundryGothic-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-laundry",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? "ko";

  return (
    <html lang={locale} className={`${pretendard.variable} ${laundryGothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
