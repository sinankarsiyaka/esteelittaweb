import { AboutIntro } from "@/components/anasayfa/about-intro";
import { ExperienceWall } from "@/components/anasayfa/experience-wall";
import { FaqList } from "@/components/anasayfa/faq-list";
import { FeatureCta } from "@/components/anasayfa/feature-cta";
import { ProcessSteps } from "@/components/anasayfa/process-steps";
import { ServicesGrid } from "@/components/anasayfa/services-grid";
import { ServiceCarousel } from "@/components/service-carousel";
import { SiteFooter } from "@/components/site-footer";
import { HeaderSlot } from "@/components/header-slot";
import { SiteLink } from "@/components/site-link";
import { contactPhoneHref } from "@/data/site";

export default function Home() {
  return (
    <main>
      <section className="hero" id="anasayfa">
        <div className="hero-wash hero-wash--left" aria-hidden="true" />
        <div className="hero-wash hero-wash--right" aria-hidden="true" />

        <HeaderSlot />

        <div className="hero-copy">
          <p className="eyebrow">Profesyonel Güzellik &amp; Estetik</p>
          <h1>
            Işığını ortaya <span>çıkar.</span>
          </h1>
          <p className="hero-subtitle">
            Güzelliğinize özel, güven veren profesyonel dokunuşlar.
          </p>
          <div className="hero-actions">
            {/* Randevu akışı henüz kurulmadı; şimdilik "Randevu Al" doğrudan
                arama başlatır, herhangi bir bölüme kaydırmaz. */}
            <a className="button" href={contactPhoneHref}>
              Randevu Al
            </a>
            <SiteLink className="text-link" href="/hizmetler">
              Hizmetleri Keşfet
            </SiteLink>
          </div>
        </div>

        <div className="hero-carousel">
          <ServiceCarousel />
        </div>
      </section>

      {/* ── Hero sonrası akış ─────────────────────────────────────────
          Bölüm sırası referansın hero sonrası sırasıdır: marka tanıtımı →
          hizmetler → büyük atmosfer → süreç → danışan deneyimi → SSS.

          Bütün bölümler aynı dikey ritmi (--pv-pad), aynı içerik
          kolonunu (.pv-shell) ve aynı tipografi ölçeğini paylaşır;
          değerler referanstan ölçülerek alınmıştır. Yüzey sırası
          açık → açık → açık → açık → açık → koyu biçiminde ilerler.

          Hero'nun kendisi ve footer bu düzenlemenin dışındadır. Hero'daki
          "Hizmetleri Keşfet" artık /hizmetler sayfasına gider; "Randevu Al"
          ise şimdilik doğrudan arama başlatır (bkz. yukarısı). */}
      <AboutIntro />
      <ServicesGrid />
      <FeatureCta />
      <ProcessSteps />
      <ExperienceWall />
      <FaqList />

      <SiteFooter context="home" topHref="#anasayfa" />
    </main>
  );
}
