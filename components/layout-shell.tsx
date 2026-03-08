import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/match", label: "궁합 시작" },
  { href: "/policy/privacy", label: "개인정보 처리방침" },
  { href: "/policy/notice", label: "안내사항" },
];

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-10">
      <header className="sticky top-0 z-20 border-b border-[#f1d6c9] bg-white/85 backdrop-blur-lg">
        <div className="app-container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-[#241f1d] no-underline">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ca5b39] to-[#ef9365] text-sm text-white">
              ♡
            </span>
            결결 리포트
          </Link>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#5f5752]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-1.5 no-underline transition-colors hover:bg-[#fff1e8] hover:text-[#9b4025]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-container py-7 sm:py-10">{children}</main>
    </div>
  );
}
