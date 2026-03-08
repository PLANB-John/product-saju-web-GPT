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
            <p className="badge-soft">감성 궁합 리포트</p>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">모바일 최적화</span>
          </div>

          <h1 className="title-xl max-w-3xl">
            두 사람의 흐름을 따뜻하고 선명하게,
            <br className="hidden sm:block" /> 관계 리포트로 정리해 드려요.
          </h1>
          <p className="body-md max-w-xl text-pretty">
            이름과 출생 정보를 바탕으로 관계의 강점, 조율 포인트, 대화 힌트를 한 번에 정리해 드립니다.
            확정적인 예측이 아닌 참고용 해석을 쉽고 차분하게 읽을 수 있도록 구성했습니다.
          </p>
          <div className="accent-line" />

          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-3">
              <p className="text-xs text-violet-700">리포트 스타일</p>
              <p className="mt-1 text-sm font-semibold text-violet-900">핵심 요약 + 실천 팁</p>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-3">
              <p className="text-xs text-rose-700">읽는 시간</p>
              <p className="mt-1 text-sm font-semibold text-rose-900">약 2분 완독</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/90 p-3">
              <p className="text-xs text-amber-700">톤앤매너</p>
              <p className="mt-1 text-sm font-semibold text-amber-900">차분하고 현실적인 가이드</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 sm:space-y-3">
            <p className="text-sm leading-6 text-slate-600">지금 바로 입력하고, 두 사람에게 맞는 관계 리포트를 확인해 보세요.</p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link href="/match" className="btn-primary w-full sm:w-auto">
                ✨ 궁합 리포트 시작하기
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
        title="함께 보기 기능 (준비 중)"
        description="리포트를 함께 확인하고 의견을 나눌 수 있는 room/join 기능은 다음 단계에서 자연스럽게 이어질 예정입니다."
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
