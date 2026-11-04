import type { Metadata } from "next";
import HomePageContent from "./HomePageContent";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://icaremedicalcollege.co",
  ),
  title:
    "ICARE Institute of Medical Sciences and Research | MBBS, MD/MS Admission 2026-27",
  description:
    "ICARE Institute of Medical Sciences and Research and Dr. Bidhan Chandra Roy Hospital, Haldia. NMC recognized, WBUHS affiliated. MBBS and MD/MS admission open.",
  openGraph: {
    title:
      "ICARE Institute of Medical Sciences and Research | MBBS, MD/MS Admission 2026-27",
    description:
      "ICARE Institute of Medical Sciences and Research and Dr. Bidhan Chandra Roy Hospital, Haldia. NMC recognized, WBUHS affiliated. MBBS and MD/MS admission open.",
    images: [
      {
        url: "/images/icare-logo.png",
        width: 1600,
        height: 470,
        alt: "ICARE Institute of Medical Sciences and Research",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/icare-logo.png"],
  },
};

export default function Page() {
  return <HomePageContent />;
}