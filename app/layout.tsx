import type { Metadata } from "next";
import "./globals.css";
import FloatingContactActions from "./FloatingContactActions";

export const metadata: Metadata = {
  title: "ICARE Institute of Medical Sciences and Research",
  description:
    "A modern academic medical centre and hospital in Haldia, West Bengal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<FloatingContactActions /></body>
    </html>
  );
}
