import { MatchFormInput } from "@/types/compatibility";

export function encodeMatchInput(input: MatchFormInput): string {
  return encodeURIComponent(JSON.stringify(input));
}

export function decodeMatchInput(payload?: string): MatchFormInput | null {
  if (!payload) return null;

  try {
    return JSON.parse(decodeURIComponent(payload)) as MatchFormInput;
  } catch {
    return null;
  }
}
