import type { Metadata } from "next";
import Image from "next/image";

import { LeafSprig } from "@/components/leaf-sprig";
import { Reveal } from "@/components/reveal";
import { ServicesGallery } from "@/components/services-gallery";
import { SiteFooter } from "@/components/site-footer";
import { HeaderSlot } from "@/components/header-slot";
import { SiteLink } from "@/components/site-link";
import { instagramHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Hizmetler | Esteelitta",
  description:
    "Lazer epilasyondan cilt bakımına, kalıcı makyajdan el ve tırnak bakımına kadar Esteelitta’nın sekiz bakım hizmetini ve bakım sürecimizi keşfedin.",
};

const CTA_ID = "bilgi-alin";
const GALLERY_ID = "hizmet-galerisi";
const TOP_ID = "hizmetler-basi";

const steps = [
  {
    no: "01",
    title: "Sizi dinliyoruz",
    text: "Beklentinizi ve bakım rutininizi anlıyoruz.",
  },
  {
    no: "02",
    title: "İhtiyacınızı birlikte belirliyoruz",
    text: "Size uygun uygulamayı şeffaf biçimde planlıyoruz.",
  },
  {
    no: "03",
    title: "Uygulamayı özenle gerçekleştiriyoruz",
    text: "Konforunuzu gözeterek her ayrıntıya dikkat ediyoruz.",
  },
  {
    no: "04",
    title: "Bakım sonrası sizi bilgilendiriyoruz",
    text: "Sonuçları destekleyecek önerileri sizinle paylaşıyoruz.",
  },
];

export default function HizmetlerPage() {
  return (
    <main>
      {/* JavaScript kapalıyken giriş hareketleri uygulanmaz; içerik
          doğrudan okunur durumda kalır. */}
      <noscript>
        <style>{".reveal{opacity:1;transform:none}.reveal .mask-line{clip-path:none}.reveal .reveal-zoom{transform:none}.reveal .duet__photo{clip-path:none}"}</style>
      </noscript>

      <section className="hizmetler-hero" id={TOP_ID} tabIndex={-1}>
        <HeaderSlot />
        <div className="hizmetler-hero__topline" aria-hidden="true" />

        <div className="hizmetler-hero__inner section-shell">
          <div className="hizmetler-hero__copy">
            <p className="section-kicker rule-kicker">Esteelitta Hizmetler</p>

            <h1 className="hizmetler-hero__title">
              <span>Bakımın</span>
              <span>
                size <em>özel</em>
              </span>
              <span>hali.</span>
            </h1>

            <span className="hizmetler-hero__rule" aria-hidden="true" />

            <p className="hizmetler-hero__lead">
              Cildinizi, ritminizi ve beklentinizi dinleyen; size özel planlanan
              bakım deneyimleri.
            </p>

            <div className="hizmetler-hero__actions">
              <a className="button" href={`#${GALLERY_ID}`}>
                Hizmetleri keşfet
              </a>
              <a className="arrow-link" href={`#${CTA_ID}`}>
                <span>Bilgi alın</span>
                <svg viewBox="0 0 24 10" aria-hidden="true">
                  <path
                    d="M0 5h21M17 1l4.5 4L17 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="hizmetler-hero__visual">
            <div className="hizmetler-hero__stage">
              <figure className="arch-photo arch-photo--hero">
                <Image
                  src="/media/impeccable-final-v1/hizmetler-hero-studio-hazirlik-v1.png"
                  alt="Gün ışığı alan bakım stüdyosunda, uygulama öncesi hazırlanan temsili bir tepsi ve havlu düzeni."
                  fill
                  sizes="(min-width: 1288px) 430px, (min-width: 920px) 34vw, (min-width: 650px) min(430px, 62vw), min(300px, 74vw)"
                  style={{ objectPosition: "50% 38%" }}
                  priority
                />
              </figure>

              {/* Maskeye özel kare türev: yatay V1 dosyası kare dairede
                  yanlardan kırpılıyor ve cover sonrası piksel alanı
                  yetersiz kalıyordu. Kaynak zaten 1:1 olduğu için
                  object-position gerekmez. */}
              <figure className="circle-photo circle-photo--hero">
                <Image
                  src="/media/hizmetler-page-support-v2/hero-ipek-kirpik-detail.webp"
                  alt=""
                  fill
                  sizes="(min-width: 650px) 195px, 140px"
                  quality={90}
                />
              </figure>

              <LeafSprig className="leaf leaf--hero" />
              <span className="hizmetler-hero__mist" aria-hidden="true" />
            </div>

            <p className="hizmetler-hero__rail" aria-hidden="true">
              Bakım · Denge · Işıltı
            </p>
          </div>
        </div>

        <div className="hizmetler-hero__meta section-shell" aria-hidden="true">
          <span className="hizmetler-hero__meta-index">01</span>
          <span className="hizmetler-hero__meta-slash">/</span>
          <span className="hizmetler-hero__meta-label">Hizmetler</span>
          <span className="hizmetler-hero__meta-line" />
        </div>
      </section>

      <section
        className="hizmet-galerisi section-shell"
        id={GALLERY_ID}
        aria-labelledby="hizmet-galerisi-baslik"
      >
        <Reveal once className="hizmet-galerisi__intro">
          {/* Kicker kaldırıldı: sayfa hero'su zaten "Esteelitta Hizmetler"
              etiketiyle açılıyor ve bu bölüm, başlığın yanındaki "08
              uzmanlık alanı" sayacıyla kendini adlandırıyor. Üç bölümün
              üçünde de "Esteelitta X" kickerı tekrarlanmaz. */}
          <div className="atlas-intro">
            <h2 id="hizmet-galerisi-baslik" className="atlas-title mask-line">
              Bakımın
              <br />
              <em className="brand-emphasis">sekiz</em> hali.
            </h2>

            <p className="atlas-lead">
              Her uygulama; ihtiyacınıza, yüzünüze ve bedeninize göre özenle
              biçimlenir.
            </p>
          </div>

          {/* Sekiz uzmanlık alanının sessiz sayacı; içerik başlıkta ve
              hizmet sıralarında zaten okunduğu için ekran okuyucuya
              tekrar edilmez. */}
          <div className="atlas-mark" aria-hidden="true">
            <span className="atlas-mark__num">08</span>
            <span className="atlas-mark__rule" />
            <span className="atlas-mark__label">
              Uzmanlık
              <br />
              alanı
            </span>
          </div>
        </Reveal>

        <ServicesGallery />

        <p className="hizmet-galerisi__note">Görseller temsilidir.</p>
      </section>

      <section className="surec" aria-labelledby="surec-baslik">
        <div className="surec__inner section-shell">
          <Reveal once className="surec__head">
            <p className="section-kicker rule-kicker">Esteelitta Deneyimi</p>
            <h2 id="surec-baslik" className="section-title mask-line">
              <span>
                Her adımda özen,
              </span>
              <span>
                her dokunuşta <em className="brand-emphasis">güven.</em>
              </span>
            </h2>
          </Reveal>

          <ol className="surec__steps">
            {steps.map((step) => (
              <Reveal once as="li" key={step.no} className="surec__step">
                <span className="surec__num" aria-hidden="true">
                  {step.no}
                </span>
                <div className="surec__body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal once className="surec__visual">
            {/* Maskenin 0.94 oranında kırpılmış türev; yatay kaynakta
                cover kırpımının harcadığı yükseklik geri kazanıldı. */}
            <figure className="blob-photo">
              <Image
                src="/media/hizmetler-page-support-v2/surec-bakim-odasi.webp"
                alt="Beyaz dolapları, bakım koltuğu ve yumuşak gün ışığıyla temsili bir Esteelitta bakım odası."
                fill
                sizes="(min-width: 650px) 560px, calc(100vw - 20px)"
                quality={90}
                className="reveal-zoom"
              />
            </figure>

            <figure className="circle-photo circle-photo--surec">
              <Image
                src="/media/hizmetler-page-support-v2/surec-kas-detay.webp"
                alt=""
                fill
                sizes="(min-width: 650px) 260px, 170px"
                quality={90}
              />
            </figure>

            <LeafSprig className="leaf leaf--surec" />
          </Reveal>
        </div>
      </section>

      <section
        className="bilgi-cta"
        id={CTA_ID}
        aria-labelledby="bilgi-cta-baslik"
      >
        <span className="bilgi-cta__wash bilgi-cta__wash--left" aria-hidden="true" />
        <span className="bilgi-cta__wash bilgi-cta__wash--right" aria-hidden="true" />

        <div className="bilgi-cta__inner section-shell">
          <Reveal once className="bilgi-cta__copy">
            <h2 id="bilgi-cta-baslik" className="bilgi-cta__title mask-line">
              <span>Hangi bakımın</span>
              <span>
                <em className="brand-emphasis">size uygun</em>
              </span>
              <span>olduğundan emin değil misiniz?</span>
            </h2>

            <p className="bilgi-cta__lead">
              İhtiyacınızı birlikte değerlendirelim; size en uygun bakımı
              konuşalım.
            </p>

            <div className="bilgi-cta__actions">
              <a
                className="button button--ghost"
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="button__icon"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <rect x="5" y="5" width="22" height="22" rx="6" />
                  <circle cx="16" cy="16" r="5.6" />
                  <path d="M22 10h.01" />
                </svg>
                <span>Instagram’dan bilgi alın</span>
                <svg
                  className="button__arrow"
                  viewBox="0 0 24 10"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5h21M17 1l4.5 4L17 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <span className="bilgi-cta__split" aria-hidden="true" />

              <SiteLink className="arrow-link" href="/iletisim">
                <span>İletişim sayfasına git</span>
              </SiteLink>
            </div>
          </Reveal>

          <Reveal once className="bilgi-cta__visual" order={1}>
            {/* Kemerin 0.62 oranında dikey türev. Önceki yatay V1
                dosyası bu çok dikey maskede büyütülüyordu. */}
            <figure className="arch-photo arch-photo--cta">
              <Image
                src="/media/hizmetler-page-support-v2/cta-cilt-bakimi.webp"
                alt="Gözleri kapalı, rahatlamış bir danışanın yüz bakımı sırasındaki temsili görseli."
                fill
                sizes="(min-width: 650px) 380px, 280px"
                quality={90}
                className="reveal-zoom"
              />
            </figure>

            <figure className="circle-photo circle-photo--cta">
              <Image
                src="/media/hizmetler-page-support-v2/cta-el-tirnak-detay.webp"
                alt=""
                fill
                sizes="(min-width: 650px) 185px, 135px"
                quality={90}
              />
            </figure>

            <LeafSprig className="leaf leaf--cta" />
          </Reveal>
        </div>
      </section>

      <SiteFooter context="page" topHref={`#${TOP_ID}`} />
    </main>
  );
}
