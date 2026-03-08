export type CompatibilityMock = {
  score: string;
  relationType: string;
  interpretation: string;
};

export function getMockCompatibilityResult(id: string): CompatibilityMock {
  return {
    score: "78/100",
    relationType: "안정형",
    interpretation: `결과 ID ${id} 기준 임시 해석입니다. 추후 실제 계산 로직이 연결될 예정입니다.`,
  };
}
