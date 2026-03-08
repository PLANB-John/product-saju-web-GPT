import Link from "next/link";
import { ResultList } from "@/components/result/result-list";
import { ResultSection } from "@/components/result/result-section";
import { getMockCompatibilityResult } from "@/lib/compatibility/mock";

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
    <div className="space-y-4 pb-6 sm:space-y-5">
      <header className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <p className="text-xs font-medium text-slate-500">결과 ID: {result.resultId}</p>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {result.summary.personAName} · {result.summary.personBName}
        </h1>
        <div className="flex flex-wrap items-end gap-3">
          <p className="text-3xl font-bold text-slate-900">{result.summary.score}점</p>
          <p className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700">
            {result.summary.relationType}
          </p>
        </div>
        <p className="text-sm leading-6 text-slate-700">{result.summary.oneLineSummary}</p>
      </header>

      <ResultSection title="핵심 해석" description="관계를 이해할 때 먼저 볼 핵심 포인트입니다.">
        <ResultList items={result.coreInterpretations} />
      </ResultSection>

      <ResultSection title="잘 맞는 점" description="현재 관계에서 강점으로 작동하는 부분입니다.">
        <ResultList items={result.strengths} />
      </ResultSection>

      <ResultSection title="조율이 필요한 점" description="갈등을 줄이기 위해 미리 살펴볼 포인트입니다.">
        <ResultList items={result.adjustments} />
      </ResultSection>

      <ResultSection title="관계 유지 팁" description="일상에서 바로 적용할 수 있는 짧은 제안입니다.">
        <ResultList items={result.relationshipTips} />
      </ResultSection>

      <ResultSection title="안내" description="해석을 활용할 때 함께 확인해 주세요.">
        <ul className="space-y-2 text-sm leading-6 text-slate-700">
          <li>{result.notice.referenceOnly}</li>
          <li>{result.notice.variableByInput}</li>
        </ul>
      </ResultSection>

      <Link href="/match" className="inline-flex rounded-md border border-slate-300 px-3 py-2 text-sm no-underline">
        다시 입력하기
      </Link>
    </div>
  );
}
