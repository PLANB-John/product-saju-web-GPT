"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PersonInputSection from "@/components/match/person-input-section";
import { buildDeterministicMatchId } from "@/lib/compatibility/mock-result";
import { encodeMatchInput } from "@/lib/compatibility/transport";
import { MatchFormErrors, MatchFormInput } from "@/types/compatibility";

const EMPTY_FORM: MatchFormInput = {
  person1: { name: "", birthDate: "", gender: "", birthTime: "" },
  person2: { name: "", birthDate: "", gender: "", birthTime: "" }
};

const EMPTY_ERRORS: MatchFormErrors = { person1: {}, person2: {} };

function validateForm(form: MatchFormInput): MatchFormErrors {
  const errors: MatchFormErrors = { person1: {}, person2: {} };

  if (!form.person1.name.trim()) errors.person1.name = "사람 1 이름을 입력해 주세요.";
  if (!form.person1.birthDate) errors.person1.birthDate = "사람 1 생년월일을 선택해 주세요.";
  if (!form.person1.gender) errors.person1.gender = "사람 1 성별을 선택해 주세요.";

  if (!form.person2.name.trim()) errors.person2.name = "사람 2 이름을 입력해 주세요.";
  if (!form.person2.birthDate) errors.person2.birthDate = "사람 2 생년월일을 선택해 주세요.";
  if (!form.person2.gender) errors.person2.gender = "사람 2 성별을 선택해 주세요.";

  return errors;
}

function hasErrors(errors: MatchFormErrors): boolean {
  return [errors.person1, errors.person2].some((personErrors) => Object.keys(personErrors).length > 0);
}

export default function MatchPage() {
  const [form, setForm] = useState<MatchFormInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<MatchFormErrors>(EMPTY_ERRORS);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) return;

    const normalized: MatchFormInput = {
      person1: { ...form.person1, name: form.person1.name.trim() },
      person2: { ...form.person2, name: form.person2.name.trim() }
    };

    const id = buildDeterministicMatchId(normalized);
    const payload = encodeMatchInput(normalized);
    router.push(`/result/${id}?payload=${payload}`);
  };

  return (
    <main className="container">
      <section className="card">
        <h1>궁합 정보 입력</h1>
        <p>두 사람의 정보를 입력하면 기본 궁합 결과를 바로 확인할 수 있어요.</p>
      </section>

      <form onSubmit={handleSubmit}>
        <PersonInputSection
          title="사람 1"
          value={form.person1}
          errors={errors.person1}
          onChange={(next) => setForm((prev) => ({ ...prev, person1: next }))}
        />

        <PersonInputSection
          title="사람 2"
          value={form.person2}
          errors={errors.person2}
          onChange={(next) => setForm((prev) => ({ ...prev, person2: next }))}
        />

        <div className="card">
          <button type="submit">궁합 결과 보기</button>
        </div>
      </form>
    </main>
  );
}
