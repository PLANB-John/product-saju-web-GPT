import Link from "next/link";
import { PlaceholderCard } from "@/components/placeholder-card";
import { getMockCompatibilityResult } from "@/lib/compatibility/mock";

export default function ResultPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { aName?: string; bName?: string };
}) {
  const result = getMockCompatibilityResult(params.id);
  const nameSummary = [searchParams.aName, searchParams.bName].filter(Boolean).join(" · ");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">궁합 결과</h1>
      <p className="text-slate-700">결과 ID: {params.id}</p>
      {nameSummary ? <p className="text-slate-700">입력 인물: {nameSummary}</p> : null}

      <PlaceholderCard title="점수" description="최종 궁합 점수 자리입니다.">
        <p className="text-xl font-semibold">{result.score}</p>
      </PlaceholderCard>

      <PlaceholderCard title="관계 유형" description="관계 유형 분류 결과 자리입니다.">
        <p className="text-xl font-semibold">{result.relationType}</p>
      </PlaceholderCard>

      <PlaceholderCard title="해석" description="요약 해석 문단이 들어갈 자리입니다.">
        <p className="text-sm text-slate-700">{result.interpretation}</p>
      </PlaceholderCard>

      <Link href="/match" className="inline-flex rounded-md border border-slate-300 px-3 py-2 no-underline">
        다시 입력하기
      </Link>
    </div>
  );
}
