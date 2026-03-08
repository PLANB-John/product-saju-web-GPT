import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";

export default function HomePage() {
  return (
    <div className="section-gap">
      <section className="surface-card space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Compatibility Report</p>
        <h1 className="title-xl">두 사람의 흐름을 차분하게 읽는 사주 궁합 리포트</h1>
        <p className="body-md max-w-2xl">
          이름과 출생 정보를 입력하면, 핵심 해석과 관계 유지 팁을 보기 쉬운 카드 형태로 정리해 드립니다.
          복잡한 기능보다 이해하기 쉬운 결과 경험에 집중한 MVP입니다.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href="/match" className="btn-primary">
            궁합 시작하기
          </Link>
          <Link href="/policy/privacy" className="btn-secondary">
            개인정보 처리방침
          </Link>
          <Link href="/policy/notice" className="btn-secondary">
            서비스 안내
          </Link>
        </div>
      </section>

      <PlaceholderCard
        title="함께 보기 기능 (준비중)"
        description="room/join 기반 공동 확인 흐름은 다음 단계에서 자연스럽게 연결될 예정입니다."
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
