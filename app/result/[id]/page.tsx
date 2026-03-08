import Link from "next/link";
import { ResultList } from "@/components/result/result-list";
import { ResultSection } from "@/components/result/result-section";
import { getMockCompatibilityResult } from "@/lib/compatibility/mock";

function ScoreGauge({ score }: { score: number }) {
  return (
    <div
      className="relative flex h-32 w-32 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#7c3aed ${score * 3.6}deg, #ede9fe ${score * 3.6}deg 360deg)`,
      }}
    >
      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white shadow-inner">
        <p className="text-2xl font-semibold text-violet-700">{score}</p>
        <p className="text-xs text-slate-500">/ 100</p>
      </div>
    </div>
  );
}

export default function ResultPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { aName?: string; bName?: string };
}) {
  const result = getMockCompatibilityResult({
    resultId: params.id,
    personAName: searchParams.aName,
    personBName: searchParams.bName,
  });

  return (
    <div className="section-gap pb-6">
      <header className="surface-card overflow-hidden fade-up">
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <ScoreGauge score={result.summary.score} />

          <div className="space-y-3">
            <p className="text-xs font-medium tracking-wide text-violet-600">결과 ID: {result.resultId}</p>
            <h1 className="title-xl">
              {result.summary.personAName} <span className="text-violet-500">×</span> {result.summary.personBName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="badge-soft">{result.summary.relationType}</p>
              <p className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-medium text-fuchsia-700">
                리포트 요약 완료
              </p>
            </div>
            <p className="body-md max-w-2xl">{result.summary.oneLineSummary}</p>
          </div>
        </div>
      </header>

      <ResultSection
        title="핵심 해석"
        icon="🔎"
        description="현재 관계를 이해할 때 먼저 확인하면 좋은 핵심 포인트입니다."
      >
        <ResultList items={result.coreInterpretations} />
      </ResultSection>

      <ResultSection title="잘 맞는 점" icon="🤝" description="이미 잘 작동하고 있는 관계의 강점입니다.">
        <ResultList items={result.strengths} />
      </ResultSection>

      <ResultSection title="조율 포인트" icon="🎛️" description="갈등을 줄이고 균형을 맞추는 데 도움이 되는 지점입니다.">
        <ResultList items={result.adjustments} />
      </ResultSection>

      <ResultSection title="관계 유지 팁" icon="🌱" description="일상에서 부담 없이 실천할 수 있는 제안입니다.">
        <ResultList items={result.relationshipTips} />
      </ResultSection>

      <ResultSection title="안내" icon="ℹ️" description="아래 내용을 함께 참고하면 결과를 더 균형 있게 활용할 수 있어요.">
        <ul className="space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
          <li>{result.notice.referenceOnly}</li>
          <li>{result.notice.variableByInput}</li>
        </ul>
      </ResultSection>

      <Link href="/match" className="btn-secondary w-full sm:w-auto">
        정보 다시 입력하기
      </Link>
    </div>
  );
}
