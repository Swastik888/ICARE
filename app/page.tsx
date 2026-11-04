import type { Metadata } from "next";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  title:
    "ICARE Institute of Medical Sciences and Research | MBBS, MD/MS Admission 2026-27",
  description:
    "ICARE Institute of Medical Sciences and Research and Dr. Bidhan Chandra Roy Hospital, Haldia. NMC recognized, WBUHS affiliated. MBBS and MD/MS admission open.",
};

export default function Page() {
  return <HomePageContent />;
}
