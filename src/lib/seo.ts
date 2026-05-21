import type { Metadata } from "next";
import { cv } from "@/lib/cv-data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.AUTH_URL ??
  "https://resume-theta-rust-12.vercel.app";

export const siteName = "Igor Govtvian — Portfolio";

export const defaultDescription =
  "Frontend developer portfolio: CV, projects, GitHub, LinkedIn, and cosmic arcade mini-games.";

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: "%s",
    },
    description: defaultDescription,
    keywords: [
      "Igor Govtvian",
      "frontend developer",
      "React",
      "TypeScript",
      "portfolio",
      "Prague",
    ],
    authors: [{ name: cv.name, url: siteUrl }],
    creator: cv.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName,
      title: siteName,
      description: defaultDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: defaultDescription,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    email: cv.email,
    jobTitle: cv.role,
    url: siteUrl,
    sameAs: [
      cv.social.github,
      cv.social.linkedin,
      ...cv.projects.map((p) => p.url),
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    author: { "@type": "Person", name: cv.name },
  };
}
