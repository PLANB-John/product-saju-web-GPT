export type CompatibilityRelationType =
  | "안정형"
  | "성장형"
  | "균형형"
  | "리듬조율형";

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
