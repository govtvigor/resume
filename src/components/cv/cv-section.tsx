import type { ReactNode } from "react";

export function CvSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="border-b border-foreground/15 pb-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
        {title}
      </h2>
      {children}
    </section>
  );
}
