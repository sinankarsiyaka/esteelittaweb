import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esteelitta | Profesyonel Güzellik ve Estetik",
  description:
    "Esteelitta'nın profesyonel güzellik, bakım ve estetik uygulamalarını keşfedin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
