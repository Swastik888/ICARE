import type { Metadata } from "next";
import HomePageContent from "../HomePageContent";

export const metadata: Metadata = {
  title: "Home | ICARE Institute of Medical Sciences and Research",
  description: "Academic programmes, healthcare, facilities and admission enquiries at ICARE, Haldia.",
  openGraph: {
    title: "Home | ICARE Institute of Medical Sciences and Research",
    description: "Academic programmes, healthcare, facilities and admission enquiries at ICARE, Haldia.",
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

export default function Home() {
  return <HomePageContent homeHref="/home" />;
}