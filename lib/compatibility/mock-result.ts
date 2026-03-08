import { CompatibilityResult, MatchFormInput } from "@/types/compatibility";

const RELATIONSHIP_TYPES = ["잔잔한 안정형", "성장 동반형", "설렘 자극형", "균형 회복형"];
const HIGHLIGHT_POOL = [
  "대화 리듬이 잘 맞아 빠르게 친밀해질 가능성이 높아요.",
  "생활 패턴 조율이 관계 만족도에 큰 영향을 줘요.",
  "감정 표현 방식이 달라 초기에 오해를 줄이는 게 중요해요.",
  "공통 목표를 세우면 관계의 안정감이 더 커질 수 있어요.",
  "서로의 휴식 스타일을 존중하면 갈등이 줄어들어요.",
  "작은 약속을 꾸준히 지키는 것이 신뢰 형성의 핵심이에요."
];

export function buildDeterministicMatchId(input: MatchFormInput): string {
  const key = [
    input.person1.name,
    input.person1.birthDate,
    input.person1.gender,
    input.person1.birthTime ?? "",
    input.person2.name,
    input.person2.birthDate,
    input.person2.gender,
    input.person2.birthTime ?? ""
  ].join("|");

  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return `m-${Math.abs(hash >>> 0).toString(36)}`;
}

export function generateMockCompatibility(input: MatchFormInput): CompatibilityResult {
  const id = buildDeterministicMatchId(input);
  const seed = [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const score = 55 + (seed % 41);

  const relationshipType = RELATIONSHIP_TYPES[seed % RELATIONSHIP_TYPES.length];
  const highlights = [0, 2, 4].map((offset) => HIGHLIGHT_POOL[(seed + offset) % HIGHLIGHT_POOL.length]);

  return {
    id,
    people: { person1Name: input.person1.name, person2Name: input.person2.name },
    score,
    relationshipType,
    highlights
  };
}
