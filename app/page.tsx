import Link from "next/link";

const archivePoints = [
  { label: "리포트 구성", value: "핵심 요약 · 조율 포인트 · 대화 힌트" },
  { label: "완성 시간", value: "약 2분, 필요한 정보만 간결하게" },
  { label: "활용 방식", value: "읽고 나면 대화를 시작할 기준이 남습니다" },
];

const upcomingTracks = ["함께 읽기 뷰", "메모 레이어", "대화 후속 기록"];

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-9">
      <section className="rounded-[1.75rem] border bg-white p-5 shadow-[0_18px_38px_rgba(24,22,20,0.06)] sm:p-8" style={{ borderColor: "var(--border-default)" }}>
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-7">
          <div className="space-y-3.5">
            <p className="badge-soft px-3.5 py-1 text-[11px] uppercase tracking-[0.14em]">Relationship Report Archive</p>
            <div className="space-y-2">
              <p className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs" style={{ color: "var(--accent-deep)", borderColor: "color-mix(in srgb, var(--accent-secondary) 26%, var(--border-default))", backgroundColor: "color-mix(in srgb, var(--accent-secondary) 10%, white)" }}>
                관계도감 아카이브
              </p>
              <h1 className="text-[1.7rem] font-semibold leading-[1.25] tracking-tight sm:text-[2.35rem]" style={{ color: "var(--text-primary)" }}>
                관계를 가볍게 시작해도,
                <br className="hidden sm:block" /> 결과는 정리된 리포트로 남습니다.
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-6 sm:text-base sm:leading-7" style={{ color: "var(--text-secondary)" }}>
              두 사람의 사주 정보를 바탕으로 관계 흐름을 읽고, 강점과 조율 포인트를 한 문서 안에 차분하게 정리해
              드립니다.
            </p>
          </div>

          <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "color-mix(in srgb, var(--accent-primary) 28%, var(--border-default))", backgroundColor: "color-mix(in srgb, var(--accent-primary) 7%, var(--bg-soft))" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--accent-primary)" }}>
              Report Note
            </p>
            <p className="mt-2 text-sm leading-6 sm:text-[15px]" style={{ color: "var(--text-secondary)" }}>
              무엇을 맞히는지보다, 지금의 관계를 어떻게 이해하고 대화로 이어갈지에 집중한 아카이브형 리포트입니다.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {archivePoints.map((point) => (
              <div key={point.label} className="rounded-2xl border bg-white p-3.5" style={{ borderColor: "color-mix(in srgb, var(--accent-secondary) 14%, var(--border-default))" }}>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {point.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-5" style={{ color: "var(--text-primary)" }}>
                  {point.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3.5 border-t pt-5 sm:pt-6" style={{ borderColor: "var(--border-default)" }}>
            <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              지금 필요한 정보만 입력하고, 관계 리포트를 바로 받아보세요.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/match" className="btn-primary w-full min-h-[3.15rem] px-6 py-3 sm:w-auto">
                두 사람 리포트 시작하기
              </Link>
              <p className="text-xs leading-5 sm:text-sm" style={{ color: "var(--text-muted)" }}>
                작성 후 결과 페이지에서 저장된 리포트를 바로 확인할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link href="/policy/privacy" className="btn-secondary w-full sm:w-auto">
                개인정보 처리방침
              </Link>
              <Link href="/policy/notice" className="btn-secondary w-full sm:w-auto">
                서비스 안내
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border bg-white p-5 shadow-[0_10px_24px_rgba(24,22,20,0.04)] sm:p-6" style={{ borderColor: "var(--border-default)" }}>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="badge-accent-subtle px-3 py-1 text-[11px] uppercase tracking-[0.12em]">Up Next</p>
            <h2 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              함께 읽는 확장 경험 (준비 중)
            </h2>
            <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              앞으로는 작성된 리포트를 같은 화면에서 함께 읽고, 메모를 덧붙이며 대화를 이어갈 수 있는 흐름으로 확장됩니다.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {upcomingTracks.map((track) => (
              <div
                key={track}
                className="rounded-xl border px-3.5 py-3 text-sm font-medium"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent-secondary) 30%, var(--border-default))",
                  backgroundColor: "color-mix(in srgb, var(--accent-secondary) 8%, white)",
                  color: "var(--accent-deep)",
                }}
              >
                {track}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1 text-sm sm:flex-row sm:flex-wrap sm:gap-3">
            <Link href="/room" className="btn-secondary w-full sm:w-auto">
              함께 읽기 준비 상황 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
