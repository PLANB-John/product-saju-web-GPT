import { getMockCompatibilityResult } from "@/lib/compatibility/mock";
import { localResultRepository } from "@/lib/storage/result-repository";
import type { MatchFormData } from "@/types/match";
import type { StoredCompatibilityResult } from "@/types/result";

function normalizeName(name: string) {
  return name.trim() || "이름";
}

export function createAndStoreCompatibilityResult(resultId: string, formData: MatchFormData): StoredCompatibilityResult {
  const result = getMockCompatibilityResult({
    resultId,
    personAName: normalizeName(formData.personA.name),
    personBName: normalizeName(formData.personB.name),
  });

  const storedResult: StoredCompatibilityResult = {
    ...result,
    createdAt: new Date().toISOString(),
  };

  localResultRepository.create(storedResult);

  return storedResult;
}
