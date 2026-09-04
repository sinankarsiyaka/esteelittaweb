import Image from "next/image";

import { MobileMenu } from "@/components/mobile-menu";
import { ServiceCarousel } from "@/components/service-carousel";
import { ServiceTiles } from "@/components/service-tiles";

const aboutFeatures: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Kişiye Özel",
    icon: (
      <>
        <circle cx="16" cy="11.2" r="5.2" />
        <path d="M6.5 27c1.7-6.6 5.9-9.8 9.5-9.8s7.8 3.2 9.5 9.8" />
      </>
    ),
  },
  {
    label: "Güven",
    icon: (
      <>
        <path d="M16 4.5 25 8v8c0 6.6-4 11-9 13-5-2-9-6.4-9-13V8Z" />
        <path d="M11.8 16.2l2.8 2.8 5.6-6" />
      </>
    ),
  },
  {
    label: "Hijyen",
    icon: (
      <path d="M16 5.2c4.4 5.8 7.6 10.2 7.6 14.4a7.6 7.6 0 1 1-15.2 0c0-4.2 3.2-8.6 7.6-14.4Z" />
    ),
  },
  {
    label: "Doğal Sonuç",
    icon: (
      <>
        <path d="M7.5 24.5c-1-8.6 4-15.4 16.5-16.3-.9 11.5-7.7 16.3-16.5 16.3Z" />
        <path d="M7.5 24.5c2-4.8 6-8.8 12-11.5" />
      </>
    ),
  },
];

const contactAddress =
  "Çınar Mahallesi, Bağdat Caddesi, Rahmet Apt. No: 195/12, Küçükyalı, Maltepe / İstanbul";
const contactMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`;
const contactInstagramHref = "https://www.instagram.com/esteelitta_kucukyali/";

export default function Home() {
  return (
    <main>
      <section className="hero" id="anasayfa">
        <div className="hero-wash hero-wash--left" aria-hidden="true" />
        <div className="hero-wash hero-wash--right" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#anasayfa" aria-label="Esteelitta ana sayfa">
            <Image
              src="/brand/esteelitta-logo.png"
              alt="Esteelitta"
              width={1841}
              height={1247}
              sizes="(max-width: 649px) 145px, (max-width: 919px) 162px, 184px"
              priority
            />
          </a>

          <nav className="desktop-nav" aria-label="Ana menü">
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <a className="button button--compact" href="#iletisim">
            Randevu Al
          </a>

          <MobileMenu />
        </header>

        <div className="hero-copy">
          <p className="eyebrow">Profesyonel Güzellik &amp; Estetik</p>
          <h1>
            Işığını ortaya <span>çıkar.</span>
          </h1>
          <p className="hero-subtitle">
            Güzelliğinize özel, güven veren profesyonel dokunuşlar.
          </p>
          <div className="hero-actions">
            <a className="button" href="#iletisim">
              Randevu Al
            </a>
            <a className="text-link" href="#hizmetler">
              Hizmetleri Keşfet
            </a>
          </div>
        </div>

        <div className="hero-carousel">
          <ServiceCarousel />
        </div>
      </section>

      <section className="services section-shell" id="hizmetler">
        <div className="services__intro">
          <p className="section-kicker">Hizmetlerimiz</p>
          <h2>
            Bakımın en <span>zarif</span> hali.
          </h2>
        </div>

        <ServiceTiles />
      </section>

      <section className="about section-shell" id="hakkimizda">
        <div className="about__text">
          <p className="section-kicker">Esteelitta Hakkında</p>
          <h2 className="about__heading">
            Güzellik,
            <br />
            kendinizle kurduğunuz
            <br />
            <span>bağdır.</span>
          </h2>
          <p className="about__copy">
            Modern uygulamaları sakin, temiz ve kişisel bir deneyimle buluşturuyoruz.
            Amacımız sizi değiştirmek değil, zaten size ait olan ışığı özenle ortaya
            çıkarmak.
          </p>

          <ul className="about__features">
            {aboutFeatures.map((feature) => (
              <li key={feature.label}>
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  {feature.icon}
                </svg>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__visual">
          <div className="about__gallery">
            <figure className="about__photo about__photo--large">
              <Image
                src="/media/hakkimizda-gorseller-v1/01-cilt-bakimi-uzman.png"
                alt=""
                fill
                sizes="(min-width: 1200px) 330px, (min-width: 920px) 34vw, (min-width: 650px) 40vw, 52vw"
                style={{ objectPosition: "50% 38%" }}
              />
            </figure>

            <div className="about__stack">
              <figure className="about__photo about__photo--small">
                <Image
                  src="/media/hakkimizda-gorseller-v1/02-resepsiyon-temsili.png"
                  alt=""
                  fill
                  sizes="(min-width: 1200px) 300px, (min-width: 920px) 31vw, (min-width: 650px) 37vw, 46vw"
                />
              </figure>
              <figure className="about__photo about__photo--small">
                <Image
                  src="/media/hakkimizda-gorseller-v1/03-bakim-odasi-temsili.png"
                  alt=""
                  fill
                  sizes="(min-width: 1200px) 300px, (min-width: 920px) 31vw, (min-width: 650px) 37vw, 46vw"
                />
              </figure>
            </div>

            <span className="about__badge" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M19.5 3.5c-5 1.1-8.5 5.1-8.5 10.2 0 3.7 1.8 6.8 4.7 8.7v5.9" />
                <path d="M19.5 3.5c-.6 2.4-.2 4.6 1.3 6.4l-1.2 2.2 2 .8c-.1 2.8-1.5 5.1-4.1 6.5" />
                <path d="M17.7 8.8c-3.4 1.4-5.6 4.6-5.6 8.3 0 2.9 1.4 5.5 3.7 7" opacity=".45" />
              </svg>
            </span>
          </div>

          <p className="about__note">Görseller temsilidir.</p>
        </div>
      </section>

      <section className="contact section-shell" id="iletisim">
        <div className="contact__text">
          <p className="section-kicker">İletişim</p>
          <h2 className="contact__heading">
            Kendinize zaman
            <br />
            <span>ayırın.</span>
          </h2>
          <p className="contact__copy">
            Randevu ve uygulamalar hakkında bilgi almak için bize Instagram’dan
            ulaşın.
          </p>

          <div className="contact__divider" aria-hidden="true" />

          <div className="contact__address">
            <svg
              className="contact__icon"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M16 4c-5 0-9 3.9-9 9.3 0 6.8 7.4 13.4 8.6 14.4a.7.7 0 0 0 .8 0c1.2-1 8.6-7.6 8.6-14.4C25 7.9 21 4 16 4Z" />
              <circle cx="16" cy="13" r="3.4" />
            </svg>
            <div>
              <h3>Küçükyalı’da buluşalım</h3>
              <p>
                Çınar Mahallesi, Bağdat Caddesi
                <br />
                Rahmet Apt. No: 195/12
                <br />
                Küçükyalı, Maltepe / İstanbul
              </p>
              <a
                className="contact__map-link"
                href={contactMapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Yol tarifi al ↗
              </a>
            </div>
          </div>

          <a
            className="contact__instagram-row"
            href={contactInstagramHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="contact__icon"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <rect x="5" y="5" width="22" height="22" rx="6" />
              <circle cx="16" cy="16" r="5.6" />
              <path d="M22 10h.01" />
            </svg>
            <span>@esteelitta_kucukyali</span>
          </a>

          <a
            className="button contact__cta"
            href={contactInstagramHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram’dan ulaşın ↗
          </a>
        </div>

        <div className="contact__visual">
          <figure className="contact__photo">
            <Image
              src="/media/hakkimizda-gorseller-v1/02-resepsiyon-temsili.png"
              alt=""
              fill
              sizes="(min-width: 920px) min(610px, calc((min(100vw - 48px, 1240px) - 64px) * 0.5192)), (min-width: 650px) min(760px, calc(100vw - 36px)), min(560px, calc(100vw - 28px))"
            />
            <figcaption className="contact__note">Temsili görsel</figcaption>
          </figure>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer__inner">
          <div className="footer__top">
            <div className="footer__identity">
              <a className="footer__brand" href="#anasayfa" aria-label="Esteelitta ana sayfa">
                <Image
                  src="/brand/esteelitta-logo.png"
                  alt="Esteelitta"
                  width={1841}
                  height={1247}
                  sizes="(min-width: 650px) 250px, 196px"
                />
              </a>
              <p className="footer__tagline">
                Güzelliğe sakin, güvenli ve kişisel bir dokunuş.
              </p>
            </div>

            <nav className="footer__nav" aria-label="Alt menü">
              <a href="#hizmetler">Hizmetler</a>
              <a href="#hakkimizda">Hakkımızda</a>
              <a href="#iletisim">İletişim</a>
              <a
                className="footer__instagram"
                href={contactInstagramHref}
                aria-label="Esteelitta Instagram hesabı (yeni sekmede açılır)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <rect x="5" y="5" width="22" height="22" rx="6" />
                  <circle cx="16" cy="16" r="5.6" />
                  <path d="M22 10h.01" />
                </svg>
              </a>
            </nav>
          </div>

          <div className="footer__bottom">
            <p>
              © {new Date().getFullYear()} Esteelitta. Tüm hakları saklıdır.
            </p>
            <a href="#anasayfa">
              Yukarı dön <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
