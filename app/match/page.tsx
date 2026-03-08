"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { validateMatchForm, buildResultId } from "@/lib/match/validation";
import type { MatchFormData, MatchFormErrors, PersonInput } from "@/types/match";

const initialPerson: PersonInput = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthTimeUnknown: false,
};

const initialForm: MatchFormData = {
  personA: { ...initialPerson },
  personB: { ...initialPerson },
};

function PersonFields({
  label,
  fieldKey,
  person,
  errors,
  onChange,
}: {
  label: string;
  fieldKey: "personA" | "personB";
  person: PersonInput;
  errors: MatchFormErrors;
  onChange: (next: PersonInput) => void;
}) {
  return (
    <fieldset className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
      <legend className="px-1 text-sm font-semibold text-slate-900">{label}</legend>

      <div className="space-y-1">
        <label className="text-sm">이름</label>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={person.name}
          onChange={(event) => onChange({ ...person, name: event.target.value })}
          placeholder="홍길동"
        />
        {errors[`${fieldKey}.name`] ? (
          <p className="text-xs text-rose-600">{errors[`${fieldKey}.name`]}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm">생년월일</label>
        <input
          type="date"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={person.birthDate}
          onChange={(event) => onChange({ ...person, birthDate: event.target.value })}
        />
        {errors[`${fieldKey}.birthDate`] ? (
          <p className="text-xs text-rose-600">{errors[`${fieldKey}.birthDate`]}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={person.birthTimeUnknown}
            onChange={(event) =>
              onChange({
                ...person,
                birthTimeUnknown: event.target.checked,
                birthTime: event.target.checked ? "" : person.birthTime,
              })
            }
          />
          출생시간 모름
        </label>

        <div className="space-y-1">
          <label className="text-sm">출생시간</label>
          <input
            type="time"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
            value={person.birthTime}
            onChange={(event) => onChange({ ...person, birthTime: event.target.value })}
            disabled={person.birthTimeUnknown}
          />
          {errors[`${fieldKey}.birthTime`] ? (
            <p className="text-xs text-rose-600">{errors[`${fieldKey}.birthTime`]}</p>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}

export default function MatchPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<MatchFormData>(initialForm);
  const [errors, setErrors] = useState<MatchFormErrors>({});

  const hasError = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateMatchForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const resultId = buildResultId(formData);
    const query = new URLSearchParams({
      aName: formData.personA.name,
      bName: formData.personB.name,
    });

    router.push(`/result/${resultId}?${query.toString()}`);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">궁합 입력</h1>
        <p className="text-slate-700">두 사람의 기본 정보를 입력하면 결과 페이지로 이동합니다.</p>
      </section>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <PersonFields
          label="사용자 A"
          fieldKey="personA"
          person={formData.personA}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personA: next }))}
        />
        <PersonFields
          label="사용자 B"
          fieldKey="personB"
          person={formData.personB}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personB: next }))}
        />

        {hasError ? <p className="text-sm text-rose-600">입력값을 확인해 주세요.</p> : null}

        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          결과 보기
        </button>
      </form>
    </div>
  );
}
