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
  emoji,
  tone,
  fieldKey,
  person,
  errors,
  onChange,
}: {
  label: string;
  emoji: string;
  tone: "violet" | "rose";
  fieldKey: "personA" | "personB";
  person: PersonInput;
  errors: MatchFormErrors;
  onChange: (next: PersonInput) => void;
}) {
  const toneStyle =
    tone === "violet"
      ? "border-violet-100 bg-violet-50/40"
      : "border-rose-100 bg-rose-50/40";

  return (
    <fieldset className={`surface-card space-y-4 p-4 sm:p-5 ${toneStyle} fade-up`}>
      <legend className="flex items-center gap-2 px-1 text-sm font-semibold tracking-tight text-slate-900">
        <span className="text-base">{emoji}</span>
        {label}
      </legend>
      <p className="text-sm text-slate-600">입력한 정보로 두 사람의 기본 관계 흐름을 비교합니다.</p>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">이름</label>
        <input
          className="input-field"
          value={person.name}
          onChange={(event) => onChange({ ...person, name: event.target.value })}
          placeholder="홍길동"
        />
        {errors[`${fieldKey}.name`] ? <p className="text-xs leading-5 text-rose-600">{errors[`${fieldKey}.name`]}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">생년월일</label>
        <input
          type="date"
          className="input-field"
          value={person.birthDate}
          onChange={(event) => onChange({ ...person, birthDate: event.target.value })}
        />
        {errors[`${fieldKey}.birthDate`] ? (
          <p className="text-xs leading-5 text-rose-600">{errors[`${fieldKey}.birthDate`]}</p>
        ) : null}
      </div>

      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-sm text-slate-700">
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
          출생시간을 모르겠어요
        </label>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">출생시간</label>
          <input
            type="time"
            className="input-field disabled:bg-slate-100"
            value={person.birthTime}
            onChange={(event) => onChange({ ...person, birthTime: event.target.value })}
            disabled={person.birthTimeUnknown}
          />
          <p className="text-xs leading-5 text-slate-500">출생시간을 알면 해석의 결을 조금 더 세밀하게 정리할 수 있어요.</p>
          {errors[`${fieldKey}.birthTime`] ? (
            <p className="text-xs leading-5 text-rose-600">{errors[`${fieldKey}.birthTime`]}</p>
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
    <div className="section-gap">
      <section className="surface-card space-y-3 fade-up">
        <p className="section-head">🧾 리포트 준비하기</p>
        <h1 className="title-xl">궁합 정보 입력</h1>
        <p className="body-md">두 사람의 기본 정보를 입력하면, 관계를 돌아볼 수 있는 참고용 리포트를 바로 확인할 수 있어요.</p>
      </section>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <PersonFields
          label="사람 1"
          emoji="🌿"
          tone="violet"
          fieldKey="personA"
          person={formData.personA}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personA: next }))}
        />
        <PersonFields
          label="사람 2"
          emoji="🌙"
          tone="rose"
          fieldKey="personB"
          person={formData.personB}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personB: next }))}
        />

        {hasError ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
            아직 입력되지 않은 항목이 있어요. 표시된 내용을 확인해 주세요.
          </p>
        ) : null}

        <button type="submit" className="btn-primary w-full sm:w-auto">
          💫 두 사람 리포트 보기
        </button>
      </form>
    </div>
  );
}
