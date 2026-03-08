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
          <p className="body-md">결과 리포트를 준비하고 있어요...</p>
        </section>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="section-gap pb-6">
        <section className="surface-card space-y-4 fade-up">
          <p className="section-head">🔍 결과를 찾을 수 없어요</p>
          <h1 className="title-xl">요청하신 궁합 결과를 확인하지 못했어요.</h1>
          <p className="body-md">
            링크가 만료되었거나, 현재 기기에 저장되지 않은 결과일 수 있어요. 입력 화면으로 돌아가 새 리포트를 다시 만들어 보세요.
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
      <header className="surface-card overflow-hidden space-y-5 fade-up">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="badge-soft">저장된 결과 리포트</p>
          <p className="text-xs font-medium tracking-wide text-violet-600">리포트 ID: {result.resultId}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <ScoreGauge score={result.summary.score} />

          <div className="space-y-3">
            <h1 className="title-xl">
              {result.summary.personAName} <span className="text-violet-500">×</span> {result.summary.personBName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="badge-soft">관계 유형 · {result.summary.relationType}</p>
              <p className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                궁합 점수 {result.summary.score}점
              </p>
            </div>
            <p className="rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-sm font-medium leading-6 text-slate-700 sm:text-base">
              {result.summary.oneLineSummary}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
          <p className="text-xs font-semibold tracking-wide text-slate-500">읽는 순서 안내</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            핵심 해석에서 전체 흐름을 먼저 확인하고, 강점과 조율 포인트를 지나 관계 유지 팁까지 읽으면 실천 포인트를 더 쉽게 정리할 수 있어요.
          </p>
        </div>
      </header>

      <ResultSection
        title="핵심 해석"
        icon="🔎"
        toneLabel="먼저 읽기"
        description="현재 관계의 흐름을 빠르게 이해할 수 있는 핵심 요약입니다."
      >
        <ResultList items={result.coreInterpretations} />
      </ResultSection>

      <ResultSection
        title="잘 맞는 점"
        icon="🤝"
        toneLabel="강점"
        description="두 사람의 호흡이 자연스럽게 맞는 영역입니다."
      >
        <ResultList items={result.strengths} />
      </ResultSection>

      <ResultSection
        title="조율 포인트"
        icon="🎛️"
        toneLabel="균형"
        description="작은 조정으로 갈등을 줄이고 더 편안해질 수 있는 지점입니다."
      >
        <ResultList items={result.adjustments} />
      </ResultSection>

      <ResultSection
        title="관계 유지 팁"
        icon="🌱"
        toneLabel="실천"
        description="일상에서 부담 없이 적용하기 좋은 현실적인 제안입니다."
      >
        <ResultList items={result.relationshipTips} />
      </ResultSection>

      <section className="surface-card space-y-3 fade-up">
        <p className="section-head">🔗 공유하기</p>
        <p className="body-md">리포트를 다 읽었다면, 지금 링크를 공유해 같은 결과를 함께 볼 수 있어요.</p>
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

      <ResultSection title="안내" icon="ℹ️" description="아래 내용을 함께 참고하면 결과를 더 균형 있게 활용할 수 있어요.">
        <ul className="space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
          <li className="rounded-2xl border border-slate-100 bg-white px-4 py-3">{result.notice.referenceOnly}</li>
          <li className="rounded-2xl border border-slate-100 bg-white px-4 py-3">{result.notice.variableByInput}</li>
        </ul>
      </ResultSection>

      <div className="flex justify-start">
        <Link href="/match" className="btn-secondary w-full sm:w-auto">
          정보 다시 입력하기
        </Link>
      </div>
    </div>
  );
}
