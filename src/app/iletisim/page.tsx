import type { Metadata } from "next";

import { ContactCards } from "@/components/iletisim/contact-cards";
import { ContactHero } from "@/components/iletisim/contact-hero";
import { ExperienceMarquee } from "@/components/iletisim/experience-marquee";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StickyHeader } from "@/components/sticky-header";
import { instagramHref } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim | Esteelitta",
  description:
    "Esteelitta'ya telefon, e-posta veya Küçükyalı'daki adresimizden ulaşın. Sorularınız, randevu planınız ve yol tarifi için size en uygun kanalı seçin.",
};

const TOP_ID = "iletisim-basi";

/** Sayfa bir server component'tir. Yalnızca hareketi taşıyan üç küçük
    parça (hero girişi, kaydırmaya bağlı kartlar, header) tarayıcıda
    çalışır; başlıklar, şeritler ve CTA sunucuda render edilir. */
export default function IletisimPage() {
  return (
    <main className="iletisim-main" id={TOP_ID}>
      {/* JavaScript kapalıyken giriş hareketleri uygulanmaz; içerik
          doğrudan okunur durumda kalır. */}
      <noscript>
        <style>{
          ".contact-card,.iletisim-hero__kicker,.iletisim-hero__title,.iletisim-hero__lead{opacity:1!important;transform:none!important}"
        }</style>
      </noscript>

      <SmoothScroll />

      <StickyHeader>
        <SiteHeader context="page" active="iletisim" />
      </StickyHeader>

      <section className="iletisim-hero">
        <ContactHero />
      </section>

      <section className="iletisim-kanallar" aria-labelledby="kanallar-basligi">
        <div className="section-shell">
          <h2 className="iletisim-kanallar__title" id="kanallar-basligi">
            Bizimle İletişime Geçin
          </h2>
          <ContactCards />
        </div>
      </section>

      <ExperienceMarquee />

      <section className="iletisim-cta" aria-labelledby="cta-basligi">
        <div className="section-shell iletisim-cta__inner">
          <div>
            <p className="iletisim-kicker">
              <span className="iletisim-hero__dot" aria-hidden="true" />
              Küçükyalı · İstanbul
            </p>
            <h2 className="iletisim-cta__title" id="cta-basligi">
              Kendinize ayıracağınız zamanı birlikte planlayalım.
            </h2>
          </div>

          <a
            className="button button--ghost iletisim-cta__button"
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram’dan bize yazın</span>
            <svg
              className="iletisim-cta__arrow"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="M4 10 10 4M5.4 4H10v4.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      <SiteFooter context="page" topHref={`#${TOP_ID}`} />
    </main>
  );
}
