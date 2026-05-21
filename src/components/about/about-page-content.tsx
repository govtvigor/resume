"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/site-header";
import { CvPageSkeleton } from "@/components/skeletons/page-skeleton";

const CvDocument = dynamic(
  () => import("@/components/cv/cv-document").then((m) => m.CvDocument),
  { loading: () => <CvPageSkeleton /> }
);

export function AboutPageContent() {
  return (
    <>
      <SiteHeader />
      <CvDocument />
    </>
  );
}
