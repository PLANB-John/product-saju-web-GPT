import type { ReactNode } from "react";

type ResultSectionProps = {
  title: string;
  description?: string;
  icon?: string;
  toneLabel?: string;
  children: ReactNode;
};

export function ResultSection({ title, description, icon, toneLabel, children }: ResultSectionProps) {
  return (
    <section className="surface-card space-y-4 fade-up">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="section-head">
            <span>{icon ?? "•"}</span>
            {title}
          </p>
          {toneLabel ? (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              {toneLabel}
            </span>
          ) : null}
        </div>
        {description ? <p className="body-md">{description}</p> : null}
      </div>
      <div className="accent-line" />
      {children}
    </section>
  );
}
