import { PlaceholderCard } from "@/components/placeholder-card";
import { getMockCompatibilityResult } from "@/lib/compatibility/mock";

export default function ResultPage({ params }: { params: { id: string } }) {
  const result = getMockCompatibilityResult(params.id);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">궁합 결과 (Placeholder)</h1>
      <p className="text-slate-700">ID: {params.id}</p>

      <PlaceholderCard title="점수" description="최종 궁합 점수 자리입니다.">
        <p className="text-xl font-semibold">{result.score}</p>
      </PlaceholderCard>

      <PlaceholderCard title="관계 유형" description="관계 유형 분류 결과 자리입니다.">
        <p className="text-xl font-semibold">{result.relationType}</p>
      </PlaceholderCard>

      <PlaceholderCard title="해석" description="요약 해석 문단이 들어갈 자리입니다.">
        <p className="text-sm text-slate-700">{result.interpretation}</p>
      </PlaceholderCard>
    </div>
  );
}
