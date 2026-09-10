import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

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
    /* data-scroll-behavior: sayfa içi çıpalarda yumuşak kaydırma korunur,
       ancak sayfalar arası geçişte Next.js anlık başa dönüşü uygular. */
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${sans.variable}`}>
        {/* Header bütün sayfalarda ortaktır ve <main>'in dışında durur:
            hiçbir bölüm yığınının (stacking context) altında kalmaz,
            sayfalar arasında yeniden kurulmaz. Aktif öğe adresten
            okunur. */}
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
