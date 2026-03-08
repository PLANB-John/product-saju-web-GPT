"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ResultList } from "@/components/result/result-list";
import { ResultSection } from "@/components/result/result-section";
import { localResultRepository } from "@/lib/storage/result-repository";
import type { StoredCompatibilityResult } from "@/types/result";

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

export function ResultPageClient({ resultId }: { resultId: string }) {
  const [result, setResult] = useState<StoredCompatibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const found = localResultRepository.getById(resultId);
    setResult(found);
    setIsLoading(false);
  }, [resultId]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/result/${resultId}`;
  }, [resultId]);

  const copyLink = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const shareResult = async () => {
    if (!shareUrl) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "궁합 리포트",
          text: "두 사람 궁합 리포트를 확인해 보세요.",
          url: shareUrl,
        });
        return;
      } catch {
        // 공유를 취소한 경우를 포함해 복사 fallback 사용
      }
    }

    await copyLink();
  };

  if (isLoading) {
    return (
      <div className="section-gap pb-6">
        <section className="surface-card fade-up">
          <p className="body-md">결과를 불러오고 있어요...</p>
        </section>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="section-gap pb-6">
        <section className="surface-card space-y-3 fade-up">
          <p className="section-head">🔍 결과를 찾을 수 없어요</p>
          <h1 className="title-xl">요청하신 궁합 결과가 없어요.</h1>
          <p className="body-md">
            링크가 만료되었거나, 이 기기에서 아직 생성되지 않은 결과일 수 있어요. 새로 궁합을 입력해 결과를 다시 만들어 주세요.
          </p>
          <Link href="/match" className="btn-primary w-full sm:w-auto">
            다시 궁합 시작하기
          </Link>
        </section>
      </div>
    );
  }

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

      <section className="surface-card space-y-3 fade-up">
        <p className="section-head">🔗 공유하기</p>
        <p className="text-sm text-slate-600">이 링크를 복사해 두면 같은 결과를 다시 열어볼 수 있어요.</p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn-primary" onClick={shareResult}>
            공유하기
          </button>
          <button type="button" className="btn-secondary" onClick={copyLink}>
            링크 복사
          </button>
          {copyStatus === "success" ? <p className="text-sm text-emerald-700">링크가 복사됐어요.</p> : null}
          {copyStatus === "error" ? <p className="text-sm text-rose-600">복사에 실패했어요. 다시 시도해 주세요.</p> : null}
        </div>
      </section>

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
