import Image from "next/image";

import { ServiceCarousel } from "@/components/service-carousel";

const values = [
  ["01", "Dönüşüm", "Doğal güzelliğinizi görünür kılan kişisel uygulamalar."],
  ["02", "Güven", "Her adımda açık iletişim ve profesyonel yaklaşım."],
  ["03", "Temizlik", "Titizlikle korunan hijyen standartları ve özenli alanlar."],
  ["04", "Özgüven", "Kendinizi iyi hissettiren kalıcı ve dengeli sonuçlar."],
];

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
            <a href="#galeri">Galeri</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <a className="button button--compact" href="#iletisim">
            Randevu Al
          </a>

          <a className="menu-link" href="#hizmetler" aria-label="Hizmetler menüsünü aç">
            Menü
          </a>
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

        <div className="hero-carousel" id="hizmetler">
          <ServiceCarousel />
        </div>
      </section>

      <section className="service-story section-shell" id="galeri">
        <div className="section-intro">
          <p className="section-kicker">Size özel bakım ritüelleri</p>
          <h2>Her dokunuş, size özel.</h2>
          <p>
            İhtiyacınızı dinleyen, yüzünüze ve bedeninize saygı duyan bir bakım
            yaklaşımı. Esteelitta’da her hizmet kendi ritminizde başlar.
          </p>
          <a className="text-link" href="#hizmetler">
            Tüm hizmetleri inceleyin
          </a>
        </div>

        <div className="editorial-collage" aria-label="Esteelitta uygulama görselleri">
          <figure className="collage-card collage-card--large">
            <Image
              src="/media/posters/02-cilt-bakimi.jpg"
              alt="Profesyonel cilt bakımı uygulaması"
              fill
              sizes="(max-width: 700px) 78vw, 36vw"
            />
          </figure>
          <figure className="collage-card collage-card--small">
            <Image
              src="/media/posters/05-sac-tasarimi.jpg"
              alt="Profesyonel saç tasarımı"
              fill
              sizes="(max-width: 700px) 48vw, 20vw"
            />
          </figure>
          <p className="collage-note">Kişisel. Özenli. Işıltılı.</p>
        </div>
      </section>

      <section className="brand-story" id="hakkimizda">
        <Image
          className="brand-story__mark"
          src="/brand/esteelitta-logo.png"
          alt=""
          width={548}
          height={372}
          aria-hidden="true"
        />
        <div className="section-shell brand-story__inner">
          <div>
            <p className="section-kicker">Esteelitta yaklaşımı</p>
            <h2>Güzellik, kendinizle kurduğunuz bağdır.</h2>
          </div>
          <p className="brand-story__copy">
            Modern uygulamaları sakin, temiz ve kişisel bir deneyimle buluşturuyoruz.
            Amacımız sizi değiştirmek değil, zaten size ait olan ışığı özenle ortaya
            çıkarmak.
          </p>

          <div className="values-grid">
            {values.map(([number, title, description]) => (
              <article className="value-item" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band section-shell" id="iletisim">
        <div>
          <p className="section-kicker">Tanışmaya hazır mısınız?</p>
          <h2>Işığınız için ilk adımı atın.</h2>
        </div>
        <div className="contact-actions">
          <p>
            Randevu, telefon ve konum bilgilerini işletme detayları netleştiğinde
            birlikte tamamlayacağız.
          </p>
          <a className="button" href="#hizmetler">
            Hizmetlere Dön
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <Image
          src="/brand/esteelitta-logo.png"
          alt="Esteelitta"
          width={202}
          height={137}
        />
        <p>Profesyonel güzellik ve estetik deneyimi.</p>
        <a href="#anasayfa">Yukarı dön ↑</a>
      </footer>
    </main>
  );
}
