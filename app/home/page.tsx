import type { Metadata } from "next";
import HomePageContent from "../HomePageContent";

export const metadata: Metadata = {
  title: "Home | ICARE Institute of Medical Sciences and Research",
  description: "Academic programmes, healthcare, facilities and admission enquiries at ICARE, Haldia.",
};

export default function Home() {
  return <HomePageContent homeHref="/home" />;
}
