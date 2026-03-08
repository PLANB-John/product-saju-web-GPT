import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";

export const metadata: Metadata = {
  title: "사주 궁합 MVP",
  description: "사주 기반 궁합 웹서비스 MVP 입력/결과 흐름 검증 단계",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
