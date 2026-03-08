import type { MatchFormData, MatchFormErrors } from "@/types/match";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

function validatePerson(
  person: MatchFormData["personA"],
  prefix: "personA" | "personB",
  errors: MatchFormErrors,
) {
  if (!person.name.trim()) {
    errors[`${prefix}.name`] = "이름을 입력해 주세요.";
  }

  if (!DATE_REGEX.test(person.birthDate)) {
    errors[`${prefix}.birthDate`] = "생년월일을 다시 확인해 주세요.";
  }

  if (!person.birthTimeUnknown && !TIME_REGEX.test(person.birthTime)) {
    errors[`${prefix}.birthTime`] = "시간을 모르시면 '출생시간을 모르겠어요'를 선택해 주세요.";
  }
}

export function validateMatchForm(data: MatchFormData): MatchFormErrors {
  const errors: MatchFormErrors = {};

  validatePerson(data.personA, "personA", errors);
  validatePerson(data.personB, "personB", errors);

  return errors;
}

function toSlug(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "user";
  }

  return encodeURIComponent(trimmed.slice(0, 6).toLowerCase());
}

export function buildResultId(data: MatchFormData) {
  const left = toSlug(data.personA.name);
  const right = toSlug(data.personB.name);
  const uniqueId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Date.now().toString(36);

  return `${left}-${right}-${uniqueId}`;
}
