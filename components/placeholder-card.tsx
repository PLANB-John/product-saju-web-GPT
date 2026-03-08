import type { ReactNode } from "react";

export function PlaceholderCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-card">
      <h2 className="title-lg">{title}</h2>
      <p className="mt-2 body-md">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
