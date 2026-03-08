import type { CompatibilityResult, CompatibilityResultSeed } from "@/types/result";

const COPY = {
  relationTypes: ["안정 동행형", "상호 확장형", "균형 설계형", "리듬 조정형"] as const,
  oneLineSummaries: [
    "같은 방향을 오래 유지하는 힘이 있어, 일상에서 신뢰가 차분히 쌓이기 좋은 흐름입니다.",
    "서로의 다른 결이 자극으로 작동해, 관계 안에서 시야를 넓혀 가기 좋은 조합입니다.",
    "해석 기준이 달라도 균형점을 찾는 편이라, 역할을 나눌수록 안정감이 선명해집니다.",
    "속도 차이를 조정하는 과정이 핵심이며, 합의된 리듬을 만들면 편안함이 빠르게 올라옵니다.",
  ] as const,
  coreInterpretations: [
    "관계의 기본 흐름은 크게 흔들리지 않는 편이라, 중요한 대화도 비교적 안정적으로 이어질 가능성이 큽니다.",
    "결정이 필요한 순간에는 결론보다 기준을 먼저 맞출 때, 서로의 납득감이 훨씬 높아지는 패턴이 보입니다.",
    "감정의 온도차가 생길 수 있어, 표현 방식 자체보다 왜 그런 반응이 나왔는지 맥락을 확인하는 접근이 유효합니다.",
    "생활 리듬과 회복 방식이 맞아갈수록 관계 에너지의 소모가 줄고, 대화의 밀도는 더 안정적으로 유지됩니다.",
    "갈등 장면에서는 책임 판단을 미루고 해결 순서를 합의할 때, 긴장이 길어지지 않고 실질적인 정리로 이어지기 쉽습니다.",
  ] as const,
  strengths: [
    "실행이 필요한 순간에 역할을 자연스럽게 나누는 편이라, 관계 운영이 실용적으로 굴러가는 강점이 있습니다.",
    "중요한 장면에서 관계의 우선순위를 놓치지 않아, 협력이 끊기지 않고 이어질 가능성이 높습니다.",
    "현실 판단과 정서 공감이 함께 작동해, 한쪽으로 치우치지 않은 선택지를 만들기 좋습니다.",
    "일상 대화가 꾸준히 이어지는 흐름 덕분에, 작은 오해를 초기에 정리하기 수월한 편입니다.",
  ] as const,
  adjustments: [
    "피로가 누적된 시기에는 말투 해석이 민감해질 수 있어, 대화 전에 컨디션을 먼저 공유하면 부담이 줄어듭니다.",
    "의사결정 속도 차이가 커질 때는 답답함이 쌓이기 쉬우므로, 논의 종료 시점을 합의해 두는 방식이 효과적입니다.",
    "관심 표현의 기준이 다르면 서운함이 남기 쉬워, 원하는 표현을 짧고 구체적으로 맞추는 조율이 필요합니다.",
    "바쁜 기간에는 연락 빈도보다 최소 기준을 먼저 정해 두는 편이, 불필요한 추측과 오해를 줄이는 데 도움이 됩니다.",
  ] as const,
  relationshipTips: [
    "주 1회 20분 정도, 서로의 일정·감정·우선순위를 간단히 맞추는 점검 시간을 잡아 보세요.",
    "갈등이 생기면 결론을 미루더라도 다음 행동 1가지는 합의해, 대화가 공중에 남지 않게 정리해 보세요.",
    "고마웠던 장면을 한 문장으로 자주 공유하면, 관계의 온도를 회복하는 시간이 짧아집니다.",
    "중요한 일정 전에는 기대 역할을 짧게 합의해 두면, 실제 협업 장면에서 체감 부담이 크게 줄어듭니다.",
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
