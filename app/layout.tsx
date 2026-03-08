import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사주 궁합 MVP",
  description: "사주 기반 궁합 웹서비스 MVP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
