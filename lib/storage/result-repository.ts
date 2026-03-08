import type { StoredCompatibilityResult } from "@/types/result";

const STORAGE_KEY = "saju.compatibility.results.v1";

export type ResultRepository = {
  create: (result: StoredCompatibilityResult) => void;
  getById: (resultId: string) => StoredCompatibilityResult | null;
  list: () => StoredCompatibilityResult[];
};

function parseStorage(raw: string | null): Record<string, StoredCompatibilityResult> {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, StoredCompatibilityResult>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function readAll(): Record<string, StoredCompatibilityResult> {
  if (typeof window === "undefined") {
    return {};
  }

  return parseStorage(window.localStorage.getItem(STORAGE_KEY));
}

function writeAll(resultsById: Record<string, StoredCompatibilityResult>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resultsById));
}

export const localResultRepository: ResultRepository = {
  create(result) {
    const resultsById = readAll();
    resultsById[result.resultId] = result;
    writeAll(resultsById);
  },
  getById(resultId) {
    const resultsById = readAll();
    return resultsById[resultId] ?? null;
  },
  list() {
    const resultsById = readAll();
    return Object.values(resultsById).sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    );
  },
};
