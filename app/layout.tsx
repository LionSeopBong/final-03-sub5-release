import Providers from "@/app/providers";
import "./globals.css";

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
