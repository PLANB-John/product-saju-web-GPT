export type CompatibilityRelationType =
  | "안정 동행형"
  | "상호 확장형"
  | "균형 설계형"
  | "리듬 조정형";

export type CompatibilitySummary = {
  personAName: string;
  personBName: string;
  score: number;
  relationType: CompatibilityRelationType;
  oneLineSummary: string;
};

export type CompatibilityResult = {
  resultId: string;
  summary: CompatibilitySummary;
  coreInterpretations: readonly string[];
  strengths: readonly string[];
  adjustments: readonly string[];
  relationshipTips: readonly string[];
  notice: {
    referenceOnly: string;
    variableByInput: string;
  };
};

export type CompatibilityResultSeed = {
  resultId: string;
  personAName?: string;
  personBName?: string;
};

export type StoredCompatibilityResult = CompatibilityResult & {
  createdAt: string;
};
