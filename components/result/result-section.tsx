import type { ReactNode } from "react";

type ResultSectionProps = {
  title: string;
  description?: string;
  icon?: string;
  children: ReactNode;
};

export function ResultSection({ title, description, icon, children }: ResultSectionProps) {
  return (
    <section className="surface-card space-y-3 fade-up">
      <div className="space-y-1">
        <p className="section-head">
          <span>{icon ?? "•"}</span>
          {title}
        </p>
        {description ? <p className="body-md">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
