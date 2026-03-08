export type PersonInput = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
};

export type MatchFormData = {
  personA: PersonInput;
  personB: PersonInput;
};

export type MatchFormErrors = Partial<Record<
  "personA.name" | "personA.birthDate" | "personA.birthTime" | "personB.name" | "personB.birthDate" | "personB.birthTime",
  string
>>;
