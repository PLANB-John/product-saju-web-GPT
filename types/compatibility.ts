export type Gender = "female" | "male";

export type PersonInput = {
  name: string;
  birthDate: string;
  gender: Gender | "";
  birthTime?: string;
};

export type MatchFormInput = {
  person1: PersonInput;
  person2: PersonInput;
};

export type MatchFormErrors = {
  person1: Partial<Record<keyof PersonInput, string>>;
  person2: Partial<Record<keyof PersonInput, string>>;
};

export type CompatibilityResult = {
  id: string;
  people: { person1Name: string; person2Name: string };
  score: number;
  relationshipType: string;
  highlights: string[];
};
