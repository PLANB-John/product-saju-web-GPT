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
      className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full sm:mx-0 sm:h-32 sm:w-32"
      style={{
        background: `conic-gradient(#7c3aed ${score * 3.6}deg, #ede9fe ${score * 3.6}deg 360deg)`,
      }}
    >
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white shadow-inner sm:h-24 sm:w-24">
        <p className="text-xl font-semibold text-violet-700 sm:text-2xl">{score}</p>
        <p className="text-xs text-slate-500">/ 100</p>
      </div>
    </div>
  );
}

export function ResultPageClient({ resultId }: { resultId: string }) {
  const [result, setResult] = useState<StoredCompatibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const [shareStatus, setShareStatus] = useState<"idle" | "success" | "fallback" | "error">("idle");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const found = localResultRepository.getById(resultId);
      setResult(found);
      setIsLoading(false);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [resultId]);

  useEffect(() => {
    if (copyStatus === "idle" && shareStatus === "idle") {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopyStatus("idle");
      setShareStatus("idle");
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [copyStatus, shareStatus]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return `${window.location.origin}/result/${resultId}`;
  }, [resultId]);

  const copyLink = async () => {
    if (!shareUrl) {
      setCopyStatus("error");
      return false;
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopyStatus("success");
        return true;
      } catch {
        // fallback 처리
      }
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (copied) {
        setCopyStatus("success");
        return true;
      }
    } catch {
      // 아래에서 에러 상태 처리
    }

    setCopyStatus("error");
    return false;
  };

  const shareResult = async () => {
    if (!shareUrl) {
      setShareStatus("error");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "관계 리포트",
          text: "두 사람 관계 흐름 리포트를 함께 읽어 보세요.",
          url: shareUrl,
        });
        setShareStatus("success");
        return;
      } catch {
        // 공유를 취소한 경우를 포함해 복사 fallback 사용
      }
    }

    const copied = await copyLink();
    if (copied) {
      setCopyStatus("idle");
      setShareStatus("fallback");
      return;
    }

    setShareStatus("error");
  };

  if (isLoading) {
    return (
      <div className="section-gap pb-6">
        <section className="surface-card space-y-3 fade-up" aria-live="polite">
          <p className="section-head">✨ 리포트 확인 중</p>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" aria-hidden />
            저장된 관계 리포트를 불러오고 있어요.
          </div>
        </section>
      </div>
    );
  }

  const retryLoad = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      const found = localResultRepository.getById(resultId);
      setResult(found);
      setIsLoading(false);
    }, 180);
  };

  if (!result) {
    return (
      <div className="section-gap pb-6">
        <section className="surface-card space-y-4 fade-up">
          <p className="section-head">🔍 리포트를 아직 찾지 못했어요</p>
          <h1 className="title-xl">요청하신 관계 리포트가 보이지 않아요.</h1>
          <p className="body-md">링크가 오래되었거나, 이 기기에서 저장한 결과가 아닐 수 있어요. 아래에서 다시 시작하면 새 리포트를 바로 준비할 수 있어요.</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/match" className="btn-primary w-full sm:w-auto">
              새 리포트 다시 시작
            </Link>
            <button type="button" className="btn-secondary w-full sm:w-auto" onClick={retryLoad}>
              같은 링크 다시 확인
            </button>
            <Link href="/" className="btn-secondary w-full sm:w-auto">
              홈으로 가기
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="section-gap pb-6">
      <header className="surface-card overflow-hidden space-y-4 fade-up sm:space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="badge-soft">저장된 관계 리포트</p>
          <p className="max-w-full break-all text-xs font-medium tracking-wide text-violet-600">리포트 ID: {result.resultId}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5">
          <ScoreGauge score={result.summary.score} />

          <div className="space-y-2.5 sm:space-y-3">
            <h1 className="title-xl break-words">
              {result.summary.personAName} <span className="text-violet-500">×</span> {result.summary.personBName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="badge-soft max-w-full break-words">해석 유형 · {result.summary.relationType}</p>
              <p className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                해석 점수 {result.summary.score}점
              </p>
            </div>
            <p className="rounded-2xl border border-violet-100 bg-violet-50/60 px-3.5 py-3 text-sm font-medium leading-6 text-slate-700 sm:px-4 sm:text-base">
              {result.summary.oneLineSummary}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
          <p className="text-xs font-semibold tracking-wide text-slate-500">리포트 읽는 순서</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            핵심 해석에서 전체 흐름을 먼저 읽고, 강점과 조율 포인트를 지나 관계 유지 팁까지 보면 실천 포인트를 더 선명하게 정리할 수 있어요.
          </p>
        </div>
      </header>

      <ResultSection
        title="핵심 해석"
        icon="🔎"
        toneLabel="먼저 읽기"
        description="지금 관계의 흐름을 빠르게 파악할 수 있도록 정리한 핵심 요약입니다."
      >
        <ResultList items={result.coreInterpretations} />
      </ResultSection>

      <ResultSection
        title="잘 맞는 점"
        icon="🤝"
        toneLabel="강점"
        description="두 사람의 호흡이 자연스럽게 맞물리는 영역을 정리했어요."
      >
        <ResultList items={result.strengths} />
      </ResultSection>

      <ResultSection
        title="조율 포인트"
        icon="🎛️"
        toneLabel="균형"
        description="작은 조정으로 긴장을 줄이고 더 편안해질 수 있는 지점을 담았어요."
      >
        <ResultList items={result.adjustments} />
      </ResultSection>

      <ResultSection
        title="관계 유지 팁"
        icon="🌱"
        toneLabel="실천"
        description="일상에서 가볍게 적용할 수 있는 현실적인 제안만 골랐어요."
      >
        <ResultList items={result.relationshipTips} />
      </ResultSection>

      <section className="surface-card space-y-3 fade-up" id="share-section">
        <p className="section-head">🔗 리포트 공유</p>
        <p className="body-md">리포트를 다 읽었다면 링크를 공유해 같은 해석을 함께 읽어 보세요.</p>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <button type="button" className="btn-primary w-full sm:w-auto" onClick={shareResult}>
            리포트 공유
          </button>
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={copyLink}>
            링크 복사
          </button>
        </div>
        {shareStatus === "success" ? <p className="text-sm text-emerald-700">공유 창을 열었어요. 지금 바로 전달해 보세요.</p> : null}
        {shareStatus === "fallback" ? <p className="text-sm text-emerald-700">공유 기능을 사용할 수 없어 링크를 대신 복사했어요.</p> : null}
        {copyStatus === "success" ? <p className="text-sm text-emerald-700">링크를 복사했어요. 대화를 나누는 공간에 붙여 넣어 보세요.</p> : null}
        {copyStatus === "error" || shareStatus === "error" ? (
          <p className="text-sm text-rose-600">지금은 공유가 원활하지 않아요. 잠시 후 다시 시도해 주세요.</p>
        ) : null}
      </section>

      <ResultSection title="안내" icon="ℹ️" description="아래 내용을 함께 참고하면 리포트를 더 균형 있게 활용할 수 있어요.">
        <ul className="space-y-2.5 text-sm leading-7 text-slate-700 sm:space-y-3 sm:text-base">
          <li className="rounded-2xl border border-slate-100 bg-white px-3.5 py-3 break-words sm:px-4">{result.notice.referenceOnly}</li>
          <li className="rounded-2xl border border-slate-100 bg-white px-3.5 py-3 break-words sm:px-4">{result.notice.variableByInput}</li>
        </ul>
      </ResultSection>

      <div className="sticky bottom-3 z-10 rounded-3xl border border-violet-100 bg-white/92 p-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur sm:static sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="flex flex-col justify-start gap-2 sm:flex-row sm:flex-wrap">
          <Link href="/match" className="btn-secondary w-full sm:w-auto">
            정보 다시 입력
          </Link>
          <Link href="/" className="btn-secondary w-full sm:w-auto">
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
