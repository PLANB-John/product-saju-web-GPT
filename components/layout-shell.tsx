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
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur-lg" style={{ borderColor: "var(--border-default)" }}>
        <div className="app-container flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold no-underline" style={{ color: "var(--text-primary)" }}>
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--bg-soft)", color: "var(--accent-deep)" }}
            >
              ♡
            </span>
            결결 리포트
          </Link>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-pill">
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
