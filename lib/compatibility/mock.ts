import type { CompatibilityResult, CompatibilityResultSeed } from "@/types/result";

const COPY = {
  relationTypes: ["안정형", "성장형", "균형형", "리듬조율형"] as const,
  oneLineSummaries: [
    "기본 생활 리듬이 잘 맞아, 함께 있을 때 편안함을 느끼기 쉬운 조합입니다.",
    "서로 다른 강점이 관계에 자극이 되어, 함께 성장하기 좋은 흐름을 만듭니다.",
    "관점이 달라도 균형을 찾는 힘이 있어, 역할을 나누면 안정감이 커집니다.",
    "속도를 맞춰 가는 과정이 중요하며, 조율이 되면 오래가기 좋은 관계입니다.",
  ] as const,
  coreInterpretations: [
    "대화의 호흡이 크게 어긋나지 않아, 중요한 이슈를 비교적 빠르게 공유하는 편입니다.",
    "결정이 필요한 순간에는 각자의 우선순위를 먼저 확인할수록 만족도가 높아집니다.",
    "감정 표현 방식이 다를 수 있어, 표현의 형태보다 의도를 확인하는 태도가 도움이 됩니다.",
    "일상 루틴과 쉬는 방식이 맞아갈수록 관계에서 느끼는 피로가 줄어드는 흐름입니다.",
    "문제가 생겼을 때 책임보다 해결 순서를 먼저 맞추면 갈등이 짧아질 가능성이 큽니다.",
  ] as const,
  strengths: [
    "실행이 필요한 순간에 서로의 빈 부분을 자연스럽게 메워 주는 힘이 있습니다.",
    "관계의 우선순위를 놓치지 않아, 중요한 장면에서 협력으로 이어지기 쉽습니다.",
    "현실적인 판단과 감정적인 공감이 함께 작동해, 결정의 폭이 넓어지는 편입니다.",
    "일상 대화가 꾸준히 이어져 작은 오해가 크게 번지지 않는 안정감이 있습니다.",
  ] as const,
  adjustments: [
    "피곤한 시기에는 말투 변화에 예민해질 수 있어, 컨디션을 먼저 공유하면 도움이 됩니다.",
    "의사결정 속도가 다를 때 답답함이 생길 수 있어, 대화의 마감 시점을 정해두는 것이 좋습니다.",
    "관심 표현 방식이 달라 서운함이 생길 수 있으니, 기대하는 표현을 짧게 맞춰 보세요.",
    "서로 바쁜 기간에는 연락 기준을 미리 합의해 두면 불필요한 오해를 줄일 수 있습니다.",
  ] as const,
  relationshipTips: [
    "주 1회 20분 정도, 서로의 한 주를 가볍게 점검하는 시간을 만들어 보세요.",
    "갈등이 생기면 결론을 서두르기보다 감정을 먼저 정리하고 다음 행동 1가지를 정해 보세요.",
    "고마웠던 순간을 짧게 말하는 루틴은 관계의 온도를 회복하는 데 도움이 됩니다.",
    "중요한 일정 전에는 기대하는 역할을 한 문장으로 맞추면 협력이 훨씬 수월해집니다.",
  ] as const,
  notice: {
    referenceOnly: "이 리포트는 관계를 이해하고 대화를 돕기 위한 참고용 해석입니다.",
    variableByInput: "입력한 이름·생년월일·출생시간 정보에 따라 결과 내용은 달라질 수 있습니다.",
  } as const,
};

function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pickByHash<T>(items: readonly T[], hash: number, offset: number): T {
  return items[(hash + offset) % items.length];
}

function pickTriple<T>(items: readonly T[], hash: number, offset: number): [T, T, T] {
  return [
    pickByHash(items, hash, offset),
    pickByHash(items, hash, offset + 1),
    pickByHash(items, hash, offset + 2),
  ];
}

function toStringList(items: readonly (string | undefined)[]): string[] {
  return items.filter((item): item is string => typeof item === "string");
}

export function getMockCompatibilityResult(seed: CompatibilityResultSeed): CompatibilityResult {
  const personAName = seed.personAName?.trim() || "사용자 A";
  const personBName = seed.personBName?.trim() || "사용자 B";
  const hash = hashString(`${seed.resultId}:${personAName}:${personBName}`);
  const score = 62 + (hash % 31);

  return {
    resultId: seed.resultId,
    summary: {
      personAName,
      personBName,
      score,
      relationType: pickByHash(COPY.relationTypes, hash, 0),
      oneLineSummary: pickByHash(COPY.oneLineSummaries, hash, 3),
    },
    coreInterpretations: toStringList(pickTriple(COPY.coreInterpretations, hash, 5)),
    strengths: toStringList(pickTriple(COPY.strengths, hash, 7)),
    adjustments: toStringList(pickTriple(COPY.adjustments, hash, 11)),
    relationshipTips: toStringList(pickTriple(COPY.relationshipTips, hash, 13)),
    notice: COPY.notice,
  };
}
