import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";

export default function HomePage() {
  return (
    <div className="section-gap">
      <section className="surface-card relative overflow-hidden fade-up">
        <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-fuchsia-200/35 blur-3xl sm:h-40 sm:w-40" />
        <div className="absolute -bottom-20 left-8 h-32 w-32 rounded-full bg-violet-200/35 blur-3xl sm:h-40 sm:w-40" />

        <div className="relative space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="badge-soft">Saju Report for Two</p>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">차분한 관계 해석</span>
          </div>

          <h1 className="title-xl max-w-3xl">
            두 사람 사이를 단정하지 않고,
            <br className="hidden sm:block" /> 지금의 흐름을 선명하게 읽는 관계 리포트.
          </h1>
          <p className="body-md max-w-xl text-pretty">
            사주 정보를 바탕으로 강점·조율 포인트·대화 힌트를 하나의 문서처럼 정리해 드려요.
            가볍게 시작해도, 읽고 나면 관계를 바라보는 기준이 한층 또렷해지는 경험에 집중했습니다.
          </p>
          <div className="accent-line" />

          <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Report Experience</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              무엇을 맞히는지보다, 관계를 어떻게 이해하고 대화에 써볼지에 초점을 둔 해석 리포트입니다.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-3">
              <p className="text-xs text-violet-700">해석 구성</p>
              <p className="mt-1 text-sm font-semibold text-violet-900">핵심 요약 · 조율 포인트</p>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-3">
              <p className="text-xs text-rose-700">읽는 시간</p>
              <p className="mt-1 text-sm font-semibold text-rose-900">약 2분, 한 번에 읽기</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/90 p-3">
              <p className="text-xs text-amber-700">읽고 난 뒤</p>
              <p className="mt-1 text-sm font-semibold text-amber-900">대화를 시작할 기준이 남아요</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 sm:space-y-3">
            <p className="text-sm leading-6 text-slate-600">
              지금 필요한 정보만 입력하면, 저장 가능한 관계 리포트를 바로 받아볼 수 있어요.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link href="/match" className="btn-primary w-full sm:w-auto">
                ✨ 두 사람 리포트 시작하기
              </Link>
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

      <PlaceholderCard
        title="함께 읽는 확장 경험 (준비 중)"
        description="다음 단계에서는 작성된 리포트를 같은 화면에서 함께 읽고, 서로의 메모를 덧붙이며 대화를 이어가는 흐름이 추가될 예정입니다."
      >
        <div className="flex flex-col gap-2.5 text-sm sm:flex-row sm:flex-wrap sm:gap-3">
          <Link href="/room" className="btn-secondary w-full sm:w-auto">
            room 페이지
          </Link>
          <Link href="/join/demo-room" className="btn-secondary w-full sm:w-auto">
            join 예시
          </Link>
        </div>
      </PlaceholderCard>
    </div>
  );
}
