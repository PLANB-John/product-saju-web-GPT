import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";

export default function HomePage() {
  return (
    <div className="section-gap">
      <section className="surface-card space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Compatibility Report</p>
        <h1 className="title-xl">두 사람을 더 잘 이해하기 위한 사주 궁합 리포트</h1>
        <p className="body-md max-w-2xl">
          이름과 출생 정보를 바탕으로 관계의 강점, 조율 포인트, 대화 힌트를 한 번에 정리해 드립니다.
          확정적인 예측이 아닌 참고용 해석을 쉽고 차분하게 읽을 수 있도록 구성했습니다.
        </p>

        <div className="space-y-2 pt-1">
          <p className="text-sm text-slate-600">지금 바로 입력하고, 두 사람에게 맞는 관계 리포트를 확인해 보세요.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/match" className="btn-primary">
              궁합 리포트 시작하기
            </Link>
            <Link href="/policy/privacy" className="btn-secondary">
              개인정보 처리방침
            </Link>
            <Link href="/policy/notice" className="btn-secondary">
              서비스 안내
            </Link>
          </div>
        </div>
      </section>

      <PlaceholderCard
        title="함께 보기 기능 (준비 중)"
        description="리포트를 함께 확인하고 의견을 나눌 수 있는 room/join 기능은 다음 단계에서 자연스럽게 이어질 예정입니다."
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/room" className="btn-secondary">
            room 페이지
          </Link>
          <Link href="/join/demo-room" className="btn-secondary">
            join 예시
          </Link>
        </div>
      </PlaceholderCard>
    </div>
  );
}
