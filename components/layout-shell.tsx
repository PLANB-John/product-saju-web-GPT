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
      <header className="sticky top-0 z-20 border-b border-violet-100 bg-white/85 backdrop-blur-lg">
        <div className="app-container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 no-underline">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm text-white">
              ♡
            </span>
            결결 리포트
          </Link>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-1.5 no-underline hover:bg-violet-50">
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
