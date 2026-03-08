import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">사주 궁합 웹서비스 MVP</h1>
        <p className="text-slate-700">
          두 사람의 정보를 기반으로 궁합 결과를 보여주기 위한 1차 구조를 정리한 상태입니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/match"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white no-underline"
          >
            궁합 시작하기
          </Link>
          <Link href="/policy/privacy">개인정보 처리방침</Link>
          <Link href="/policy/notice">서비스 안내</Link>
        </div>
      </section>

      <PlaceholderCard
        title="함께 보기(준비중)"
        description="room/join 기반 공동 확인 기능은 추후 단계에서 지원될 예정입니다."
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/room">room 페이지</Link>
          <Link href="/join/demo-room">join 페이지 예시</Link>
        </div>
      </PlaceholderCard>
    </div>
  );
}
