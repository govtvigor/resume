import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { HoloPanel } from "@/components/cosmic/HoloPanel";
import { buttonVariants } from "@/components/ui/button";
import { cv } from "@/lib/cv-data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects — Igor Govtvan",
  description: "Project vault and repository showcase.",
};

export default function ProjectsGalaxyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-8 px-5 py-12 md:px-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
        >
          ← Home
        </Link>
        <HoloPanel title="Projects" accent="cyan">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Selected work — full details on the{" "}
            <Link href="/about" className="text-cyan-300 hover:underline">
              About
            </Link>{" "}
            page.
          </p>
          <ul className="mt-8 space-y-4">
            <li>
              <a
                href={cv.experience[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-cyan-300 hover:underline"
              >
                SHP Network — shp.network
              </a>
              <p className="mt-1 text-sm text-muted-foreground">Current role</p>
            </li>
            {cv.projects.map((project) => (
              <li key={project.name}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-cyan-300 hover:underline"
                >
                  {project.name}
                  {"linkLabel" in project && project.linkLabel
                    ? ` (${project.linkLabel})`
                    : null}
                </a>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/about" className={cn(buttonVariants({ size: "sm" }))}>
              View CV
            </Link>
          </div>
        </HoloPanel>
      </main>
    </>
  );
}
