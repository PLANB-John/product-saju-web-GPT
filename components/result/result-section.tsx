import type { ReactNode } from "react";

type ResultSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ResultSection({ title, description, children }: ResultSectionProps) {
  return (
    <section className="surface-card space-y-3">
      <div className="space-y-1">
        <h2 className="title-lg">{title}</h2>
        {description ? <p className="body-md">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
