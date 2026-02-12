import Providers from "@/app/providers";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  // url 관련 metadata 설정시 사용될 기본 경로 지정
  metadataBase: new URL("https://localhost:3000"),

  title: {
    default: "Sub.5",
    template: "%s | Sub.5",
  },
  description: "러너를 위한 마라톤 일정 & 기록 관리 서비스",
  keywords: ["마라톤", "러닝", "대회 일정", "러닝 기록"],
  openGraph: {
    title: "Sub.5",
    description: "러너를 위한 마라톤 일정 & 기록 관리",
    // url: "https://final-03-sub5-release-three.vercel.app",
    siteName: "Sub.5",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sub.5 - 마라톤 일정 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub.5",
    description: "러너를 위한 마라톤 일정 & 기록 관리",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
