import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/cosmic/CosmicBackground";
import { AppProviders } from "@/components/providers/app-providers";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Igor Govtvan — Portfolio",
    template: "%s — Igor Govtvan",
  },
  description:
    "Frontend developer portfolio: CV, projects, and arcade hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", manrope.variable, jetbrainsMono.variable)}>
      <body className="min-h-screen overflow-x-hidden bg-transparent font-sans antialiased">
        <CosmicBackground />
        <AppProviders>
          <div className="relative z-10 min-h-screen">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
