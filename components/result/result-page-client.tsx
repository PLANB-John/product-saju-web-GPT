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
      className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full sm:mx-0 sm:h-36 sm:w-36"
      style={{
        background: `conic-gradient(var(--accent-deep) ${score * 3.6}deg, var(--border-default) ${score * 3.6}deg 360deg)`,
      }}
    >
      <div className="flex h-[5.6rem] w-[5.6rem] flex-col items-center justify-center rounded-full border bg-white shadow-inner sm:h-24 sm:w-24" style={{ borderColor: "var(--border-default)" }}>
        <p className="text-2xl font-semibold sm:text-[1.7rem]" style={{ color: "var(--accent-deep)" }}>{score}</p>
        <p className="text-[11px] tracking-wide" style={{ color: "var(--text-secondary)" }}>/ 100</p>
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
          text: "두 사람의 관계 흐름을 정리한 리포트를 함께 확인해 보세요.",
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
          <p className="section-head">리포트 확인 중</p>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent-deep)]" aria-hidden />
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
          <p className="section-head">리포트를 아직 찾지 못했어요</p>
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
      <header className="surface-card overflow-hidden space-y-4 fade-up sm:space-y-5" style={{ borderColor: "color-mix(in srgb, var(--accent-primary) 20%, var(--border-default))" }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="badge-soft">저장된 관계 리포트</p>
          <p className="max-w-full break-all text-xs font-medium tracking-wide" style={{ color: "var(--text-secondary)" }}>리포트 ID: {result.resultId}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5">
          <ScoreGauge score={result.summary.score} />

          <div className="space-y-2.5 sm:space-y-3">
            <h1 className="title-xl break-words">
              {result.summary.personAName} <span style={{ color: "var(--accent-primary)" }}>×</span> {result.summary.personBName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="badge-soft max-w-full break-words">관계 리듬 유형 · {result.summary.relationType}</p>
              <p className="badge-muted">리포트 지표 {result.summary.score} / 100</p>
            </div>
            <p className="rounded-2xl border px-3.5 py-3 text-sm font-medium leading-6 sm:px-4 sm:text-base" style={{ borderColor: "color-mix(in srgb, var(--accent-primary) 30%, var(--border-default))", backgroundColor: "color-mix(in srgb, var(--accent-primary) 9%, var(--bg-soft))", color: "var(--text-primary)" }}>
              {result.summary.oneLineSummary}
            </p>
          </div>
        </div>

        <div className="surface-muted py-3" style={{ borderColor: "color-mix(in srgb, var(--accent-secondary) 20%, var(--border-default))", backgroundColor: "color-mix(in srgb, var(--accent-secondary) 7%, var(--bg-soft))" }}>
          <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--accent-primary)" }}>리포트 읽는 순서</p>
          <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
            요약 지표로 현재 흐름을 먼저 확인하고, 핵심 관찰 → 맞는 흐름 → 조율 메모 → 유지 가이드 순서로 읽으면 활용 포인트가 더 또렷해져요.
          </p>
        </div>
      </header>

      <ResultSection
        title="핵심 관찰"
        icon="01"
        toneLabel="먼저 읽기"
        description="현재 관계에서 먼저 짚어야 할 흐름을 관찰 중심으로 정리했어요."
      >
        <ResultList items={result.coreInterpretations} />
      </ResultSection>

      <ResultSection
        title="맞는 흐름"
        icon="02"
        toneLabel="강점 관찰"
        description="두 사람의 호흡이 자연스럽게 이어지는 장면을 모아 봤어요."
      >
        <ResultList items={result.strengths} />
      </ResultSection>

      <ResultSection
        title="조율 메모"
        icon="03"
        toneLabel="균형 정리"
        description="부담을 키우지 않으면서 흐름을 맞출 수 있는 지점을 정리했어요."
      >
        <ResultList items={result.adjustments} />
      </ResultSection>

      <ResultSection
        title="유지 가이드"
        icon="04"
        toneLabel="실행 힌트"
        description="일상에 바로 적용할 수 있도록 짧고 현실적인 행동 제안으로 정리했어요."
      >
        <ResultList items={result.relationshipTips} />
      </ResultSection>

      <section className="surface-card space-y-3 fade-up" id="share-section">
        <p className="section-head">리포트 공유</p>
        <p className="body-md">이 리포트를 함께 읽고 대화하면, 같은 장면을 더 빠르게 맞춰 볼 수 있어요.</p>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <button type="button" className="btn-primary w-full sm:w-auto" onClick={shareResult}>
            리포트 공유
          </button>
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={copyLink}>
            링크 복사
          </button>
        </div>
        {shareStatus === "success" ? <p className="text-sm" style={{ color: "var(--text-secondary)" }}>공유 창을 열었어요. 같은 리포트를 함께 확인해 보세요.</p> : null}
        {shareStatus === "fallback" ? <p className="text-sm" style={{ color: "var(--text-secondary)" }}>공유 기능 대신 링크를 복사했어요. 바로 전달할 수 있어요.</p> : null}
        {copyStatus === "success" ? <p className="text-sm" style={{ color: "var(--text-secondary)" }}>링크를 복사했어요. 대화 중인 공간에 붙여 넣어 보세요.</p> : null}
        {copyStatus === "error" || shareStatus === "error" ? (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>지금은 공유가 원활하지 않아요. 잠시 후 다시 시도해 주세요.</p>
        ) : null}
      </section>

      <ResultSection title="읽기 안내" icon="i" description="아래 기준을 함께 보면 리포트를 더 균형 있게 활용할 수 있어요.">
        <ul className="space-y-2.5 text-sm leading-7 sm:space-y-3 sm:text-base" style={{ color: "var(--text-primary)" }}>
          <li className="rounded-2xl border bg-white px-3.5 py-3 break-words sm:px-4" style={{ borderColor: "var(--border-default)" }}>{result.notice.referenceOnly}</li>
          <li className="rounded-2xl border bg-white px-3.5 py-3 break-words sm:px-4" style={{ borderColor: "var(--border-default)" }}>{result.notice.variableByInput}</li>
        </ul>
      </ResultSection>

      <div className="sticky bottom-3 z-10 rounded-3xl border bg-white/95 p-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur sm:static sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none" style={{ borderColor: "var(--border-default)" }}>
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
