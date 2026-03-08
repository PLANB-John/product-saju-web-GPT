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
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="app-container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="text-base font-semibold text-slate-900 no-underline">
            사주 궁합 MVP
          </Link>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
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
