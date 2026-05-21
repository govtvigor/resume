"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { cv } from "@/lib/cv-data";
import { CelestialBody } from "@/components/cosmic/CelestialBody";
import { Skeleton } from "@/components/ui/skeleton";

const ContactForm = dynamic(
  () =>
    import("@/components/contact/contact-form").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 max-w-md space-y-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    ),
  }
);
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function CvSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="border-b border-foreground/15 pb-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CvDocument() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <article className="border border-foreground/12 bg-[#0c0c14]/90 p-8 shadow-[0_0_60px_-20px_rgba(34,211,238,0.25)] md:p-12">
        <header className="border-b border-foreground/10 pb-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Curriculum Vitae
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {cv.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{cv.role}</p>
          <p className="mt-3 font-mono text-sm text-foreground/80">
            {cv.age} years old
          </p>
            </div>
            <CelestialBody
              variant="sun"
              glow="rgba(251, 191, 36, 0.5)"
              size="md"
            />
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <CvSection title="Profile">
            <p className="text-sm leading-relaxed text-foreground/85">
              Frontend developer focused on React, TypeScript, and polished product
              UI. Experienced with Web3 interfaces, analytics dashboards, and
              Telegram Mini Apps. Currently studying Informatics at CZU in Prague.
            </p>
          </CvSection>

          <CvSection title="Education">
            <div>
              <p className="font-medium text-foreground">{cv.education.school}</p>
              <p className="text-sm text-muted-foreground">{cv.education.program}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyan-400/90">
                {cv.education.status}
              </p>
            </div>
          </CvSection>

          <CvSection title="Languages">
            <ul className="space-y-2">
              {cv.languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <span className="font-medium text-foreground">{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Experience">
            <ul className="space-y-5">
              {cv.experience.map((job) => (
                <li key={job.company} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-foreground">{job.company}</p>
                    <span className="font-mono text-xs text-cyan-300/90">
                      {job.period}
                      {job.current ? " · current" : ""}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {job.role}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {job.description}
                  </p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Selected Projects">
            <ul className="space-y-6">
              {cv.projects.map((project) => (
                <li
                  key={project.name}
                  className="border-l-2 border-cyan-500/30 pl-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground">{project.name}</p>
                    {"type" in project && project.type ? (
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {project.type}
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.role}</p>
                  {"slug" in project && project.slug ? (
                    <p className="font-mono text-xs text-cyan-300/80">
                      Telegram: {project.slug}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Collaboration & workflow">
            <ul className="space-y-2">
              {cv.collaborationTools.map((tool) => (
                <li
                  key={tool.name}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <span className="font-medium text-foreground">{tool.name}</span>
                  <span className="text-muted-foreground">{tool.use}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Contact">
            <p className="text-sm text-muted-foreground">
              Send a message — validated with Zod on the client and server.
            </p>
            <ContactForm className="mt-4 max-w-md" />
          </CvSection>

          <CvSection title="Core Skills">
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="font-mono text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CvSection>

          <Separator className="opacity-30" />

          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Portfolio — CI runs lint, tests, and build on every GitHub push.
          </p>
        </div>
      </article>
    </main>
  );
}
