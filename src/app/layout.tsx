import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Serif_Armenian, Noto_Sans_Armenian } from "next/font/google";
import "./globals.css";

// Latin pairing (used for en / ru / fr / es)
const displayLatin = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-latin",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const bodyLatin = Inter({
  subsets: ["latin"],
  variable: "--font-body-latin",
  weight: ["400", "500", "600"],
});

// Armenian pairing (used for hy — the primary market) — Fraunces/Inter have
// no Armenian glyphs, so headings would silently fall back to a system font
// without this. Swapped in via `:lang(hy)` in globals.css.
const displayArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  variable: "--font-display-armenian",
  weight: ["400", "500", "600"],
});
const bodyArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-body-armenian",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://baghdasaryanevents.com"),
  title: {
    default: "Baghdasaryan Production — Event Organization in Armenia",
    template: "%s — Baghdasaryan Production",
  },
  description:
    "Professional event organization and production in Armenia, including remote planning for clients living abroad.",
  openGraph: {
    type: "website",
    siteName: "Baghdasaryan Production",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="hy"
      className={`${displayLatin.variable} ${bodyLatin.variable} ${displayArmenian.variable} ${bodyArmenian.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
