import type { CompatibilityResult, CompatibilityResultSeed } from "@/types/result";

const RELATION_TYPES = ["안정형", "성장형", "균형형", "리듬조율형"] as const;

const ONE_LINE_SUMMARIES = [
  "기본 호흡이 잘 맞아 일상에서 편안함을 느끼기 쉬운 조합입니다.",
  "서로의 차이가 자극이 되어 관계를 천천히 확장해 가기 좋은 흐름입니다.",
  "강점이 다른 만큼 역할 분담을 잘하면 균형감이 살아나는 조합입니다.",
  "속도 차이를 조율하면 안정적으로 오래가기 좋은 관계입니다.",
] as const;

const CORE_INTERPRETATIONS = [
  "대화 템포가 크게 어긋나지 않아 핵심 이슈를 비교적 빨리 공유하는 편입니다.",
  "중요한 결정을 앞두면 서로의 기준을 먼저 확인할수록 만족도가 높아집니다.",
  "감정 표현 방식이 다를 수 있어, 표현의 방식보다 의도를 확인하는 태도가 유리합니다.",
  "일상 루틴과 휴식 패턴을 맞추면 관계 피로도가 눈에 띄게 줄어들 수 있습니다.",
  "문제가 생겼을 때 책임 소재보다 해결 순서를 먼저 합의하면 갈등이 짧아집니다.",
] as const;

const STRENGTHS = [
  "실행력이 필요한 상황에서 서로의 부족한 부분을 자연스럽게 보완합니다.",
  "관계의 우선순위를 놓치지 않아 중요한 순간에 협력하기 쉽습니다.",
  "현실적인 관점과 감성적인 관점이 함께 작동해 판단 폭이 넓어집니다.",
  "일상 대화의 밀도가 안정적이라 작은 오해가 크게 번지지 않는 편입니다.",
] as const;

const ADJUSTMENTS = [
  "피곤한 시기의 말투 변화에 민감할 수 있어 상태를 먼저 공유하는 습관이 필요합니다.",
  "의사결정 속도가 다르면 한쪽이 답답함을 느낄 수 있어 마감 시점을 정하는 것이 좋습니다.",
  "관심 표현의 방식이 달라 서운함이 생길 수 있으니 기대치를 짧게 맞춰보세요.",
  "관계 외 일정이 바쁠 때 연락 빈도 기준을 미리 정하면 불필요한 오해를 줄일 수 있습니다.",
] as const;

const RELATIONSHIP_TIPS = [
  "주 1회 20분 정도 서로의 한 주를 리뷰하는 시간을 고정해 보세요.",
  "갈등이 생기면 결론보다 감정 정리를 먼저 하고, 다음 행동 1가지만 합의해 보세요.",
  "서로 고마웠던 점을 짧게 말하는 루틴을 만들면 분위기 회복에 도움이 됩니다.",
  "중요 일정 전에는 기대하는 역할을 한 문장으로 확인해 두면 협력이 쉬워집니다.",
] as const;

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
      relationType: pickByHash(RELATION_TYPES, hash, 0),
      oneLineSummary: pickByHash(ONE_LINE_SUMMARIES, hash, 3),
    },
    coreInterpretations: pickTriple(CORE_INTERPRETATIONS, hash, 5),
    strengths: pickTriple(STRENGTHS, hash, 7),
    adjustments: pickTriple(ADJUSTMENTS, hash, 11),
    relationshipTips: pickTriple(RELATIONSHIP_TIPS, hash, 13),
    notice: {
      referenceOnly: "이 결과는 관계를 돌아보기 위한 참고용 요약 리포트입니다.",
      variableByInput: "입력한 생년월일·출생시간 정보가 달라지면 결과도 달라질 수 있습니다.",
    },
  };
}
