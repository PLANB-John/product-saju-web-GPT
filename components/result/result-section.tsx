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
    <section className="surface-card space-y-3.5 fade-up sm:space-y-4">
      <div className="section-title-wrap">
        <div className="flex flex-wrap items-center gap-2">
          <p className="section-head">
            <span className="text-[11px]">{icon ?? "●"}</span>
            {title}
          </p>
          {toneLabel ? <span className="badge-muted">{toneLabel}</span> : null}
        </div>
        {description ? <p className="body-md text-pretty">{description}</p> : null}
      </div>
      <div className="accent-line" />
      {children}
    </section>
  );
}
