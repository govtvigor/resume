"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Orbit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const AuthActions = dynamic(
  () =>
    import("@/components/auth/auth-actions").then((m) => m.AuthActions),
  {
    loading: () => <Skeleton className="h-8 w-24 rounded-lg" />,
    ssr: false,
  }
);

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/galaxy/projects", label: "PROJECTS" },
  { href: "/galaxy/arcade", label: "ARCADE" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/25 bg-[#050510]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="group flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          <span className="flex size-8 items-center justify-center border border-cyan-400/40 bg-transparent text-cyan-300">
            <Orbit className="size-4" aria-hidden />
          </span>
          <span className="hidden flex-col font-mono leading-tight sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
              IGOR GOVTVAN
            </span>
            <span className="text-[10px] text-cyan-400/70">// frontend_dev</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition hover:text-cyan-300"
            >
              [{link.label}]
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <AuthActions />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-2 md:hidden md:px-8">
        <Separator className="mb-2 border-cyan-500/20" />
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-cyan-300"
            >
              [{link.label}]
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
