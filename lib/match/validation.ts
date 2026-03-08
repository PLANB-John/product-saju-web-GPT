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
    errors[`${prefix}.birthDate`] = "생년월일 형식(YYYY-MM-DD)을 확인해 주세요.";
  }

  if (!person.birthTimeUnknown && !TIME_REGEX.test(person.birthTime)) {
    errors[`${prefix}.birthTime`] = "출생시간 형식(HH:mm)을 확인해 주세요.";
  }
}

export function validateMatchForm(data: MatchFormData): MatchFormErrors {
  const errors: MatchFormErrors = {};

  validatePerson(data.personA, "personA", errors);
  validatePerson(data.personB, "personB", errors);

  return errors;
}

export function buildResultId(data: MatchFormData) {
  const left = data.personA.name.trim().slice(0, 6) || "a";
  const right = data.personB.name.trim().slice(0, 6) || "b";

  return `${left}-${right}-${Date.now()}`;
}
