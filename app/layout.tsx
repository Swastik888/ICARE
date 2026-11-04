import type { Metadata } from "next";
import "./globals.css";
import FloatingContactActions from "./FloatingContactActions";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://icaremedicalcollege.co",
  ),
  title: "ICARE Institute of Medical Sciences and Research",
  description:
    "A modern academic medical centre and hospital in Haldia, West Bengal.",
  icons: {
    icon: [{ url: "/images/icare-logo.png", type: "image/png" }],
    shortcut: ["/images/icare-logo.png"],
    apple: [{ url: "/images/icare-logo.png", type: "image/png" }],
  },
  openGraph: {
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<FloatingContactActions /></body>
    </html>
  );
}