"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { validateMatchForm, buildResultId } from "@/lib/match/validation";
import { createAndStoreCompatibilityResult } from "@/lib/compatibility/result-service";
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
  badge,
  tone,
  fieldKey,
  person,
  errors,
  onChange,
}: {
  label: string;
  emoji: string;
  badge: string;
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

  const sectionHint =
    tone === "violet"
      ? "리포트 기준이 되는 사람 정보를 먼저 입력해 주세요."
      : "함께 해석할 상대 정보를 이어서 입력해 주세요.";

  return (
    <fieldset className={`surface-card space-y-4 p-4 ${toneStyle} fade-up sm:p-5`}>
      <legend className="w-full px-1">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold tracking-tight text-slate-900">
          <span className="text-base">{emoji}</span>
          <span>{label}</span>
          <span className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {badge}
          </span>
        </div>
      </legend>
      <p className="text-sm leading-6 text-slate-600">{sectionHint}</p>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor={`${fieldKey}-name`}>이름</label>
        <input
          id={`${fieldKey}-name`}
          className="input-field"
          value={person.name}
          onChange={(event) => onChange({ ...person, name: event.target.value })}
          placeholder="예: 홍길동"
          maxLength={20}
        />
        {errors[`${fieldKey}.name`] ? <p className="text-xs leading-5 text-rose-600">{errors[`${fieldKey}.name`]}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor={`${fieldKey}-birth-date`}>생년월일</label>
        <input
          id={`${fieldKey}-birth-date`}
          type="date"
          className="input-field"
          value={person.birthDate}
          onChange={(event) => onChange({ ...person, birthDate: event.target.value })}
        />
        {errors[`${fieldKey}.birthDate`] ? (
          <p className="text-xs leading-5 text-rose-600">{errors[`${fieldKey}.birthDate`]}</p>
        ) : null}
      </div>

      <div className="space-y-3 rounded-2xl border border-white/80 bg-white/70 p-3.5">
        <label className="flex min-h-[2.5rem] items-center gap-2 text-sm text-slate-700" htmlFor={`${fieldKey}-birth-time-unknown`}>
          <input
            id={`${fieldKey}-birth-time-unknown`}
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
          출생시간을 모르겠어요 (선택 입력)
        </label>
        <p className="text-xs leading-5 text-slate-500">출생시간은 선택 항목이에요. 모르면 체크하고 다음 단계로 넘어가도 괜찮아요.</p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor={`${fieldKey}-birth-time`}>출생시간</label>
          <input
            id={`${fieldKey}-birth-time`}
            type="time"
            className="input-field disabled:bg-slate-100"
            value={person.birthTime}
            onChange={(event) => onChange({ ...person, birthTime: event.target.value })}
            disabled={person.birthTimeUnknown}
          />
          <p className="text-xs leading-5 text-slate-500">알고 있다면 입력해 주세요. 관계 흐름을 조금 더 섬세하게 정리할 수 있어요.</p>
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasError = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateMatchForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const resultId = buildResultId(formData);
    createAndStoreCompatibilityResult(resultId, formData);

    await new Promise((resolve) => window.setTimeout(resolve, 250));

    router.push(`/result/${resultId}`);
  };

  return (
    <div className="section-gap">
      <section className="surface-card space-y-3 fade-up">
        <p className="section-head">🧾 리포트 준비하기</p>
        <h1 className="title-xl">관계 리포트 정보 입력</h1>
        <p className="body-md max-w-2xl text-pretty">두 사람의 기본 정보를 차례대로 입력하면, 관계 해석 리포트를 바로 확인할 수 있어요.</p>
        <p className="text-xs text-slate-500 sm:text-sm">입력은 1분 내외로 끝나요. 필요한 정보만 채우면 리포트 준비가 완료돼요.</p>
      </section>

      <form className="space-y-4 pb-28 sm:space-y-5 sm:pb-0" onSubmit={handleSubmit} noValidate>
        <PersonFields
          label="사람 1"
          emoji="🌿"
          badge="기준 정보"
          tone="violet"
          fieldKey="personA"
          person={formData.personA}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personA: next }))}
        />
        <PersonFields
          label="사람 2"
          emoji="🌙"
          badge="비교 정보"
          tone="rose"
          fieldKey="personB"
          person={formData.personB}
          errors={errors}
          onChange={(next) => setFormData((prev) => ({ ...prev, personB: next }))}
        />

        {hasError ? (
          <p className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-3 py-2.5 text-sm text-rose-700">
            아직 비어 있는 항목이 있어요. 표시된 정보만 채우면 리포트를 바로 확인할 수 있어요.
          </p>
        ) : null}

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-violet-100/80 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 shadow-[0_-10px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-0 sm:shadow-none">
          <p className="mb-2 text-center text-xs text-slate-500 sm:hidden">입력을 마치면 아래 버튼으로 관계 리포트를 확인해요.</p>
          <button type="submit" className="btn-primary w-full text-base sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" aria-hidden />
                리포트 정리 중...
              </>
            ) : (
              "💫 관계 리포트 확인하기"
            )}
          </button>
          {isSubmitting ? <p className="mt-2 text-center text-xs text-slate-500">입력한 정보를 바탕으로 리포트를 정리하고 있어요. 잠시만 기다려 주세요.</p> : null}
        </div>
      </form>
    </div>
  );
}
