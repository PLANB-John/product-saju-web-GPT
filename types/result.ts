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
  coreInterpretations: [string, string, string];
  strengths: [string, string, string?];
  adjustments: [string, string, string?];
  relationshipTips: [string, string, string?];
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
