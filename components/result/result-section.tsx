import type { ReactNode } from "react";

type ResultSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ResultSection({ title, description, children }: ResultSectionProps) {
  return (
    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
