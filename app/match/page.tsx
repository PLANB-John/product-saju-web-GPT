import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">궁합 입력 화면 (Placeholder)</h1>
        <p className="text-slate-700">
          실제 입력 폼 대신, 추후 들어갈 입력 항목의 구조만 정리해둔 상태입니다.
        </p>
      </section>

      <PlaceholderCard
        title="입력 항목 자리"
        description="다음 단계에서 이름/생년월일/출생시간 등 입력 컴포넌트가 추가됩니다."
      >
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>사용자 A 기본 정보</li>
          <li>사용자 B 기본 정보</li>
          <li>시간 미상 처리 옵션</li>
        </ul>
      </PlaceholderCard>

      <Link href="/result/sample-id">샘플 결과 페이지로 이동</Link>
    </div>
  );
}
