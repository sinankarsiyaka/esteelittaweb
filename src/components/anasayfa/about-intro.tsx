import Image from "next/image";

import { BrandMarquee } from "@/components/anasayfa/brand-marquee";
import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { SiteLink } from "@/components/site-link";
import { services } from "@/data/services";

/** 1. durak — marka tanıtımı.

    Referanstaki About Us bloğunun düzeni birebir korunur: solda dar
    kicker kolonu, sağda 700px'i geçmeyen büyük serif başlık, altında
    yatay şerit, en altta üç eşit kolonluk küme (solda kare marka görseli,
    ortada ifade kartı, sağda üst üste iki küçük kart). Görsel kolonu,
    kümenin masaüstünde 5. kolondan başlayıp solda dört kolonluk boş bir
    alan bırakmasını gideriyor — üç kolon artık eşit genişlikte.

    İçerik farkı bilinçlidir. Referanstaki küme uydurma bir puan (4.9),
    avatar fotoğrafları ve iki istatistik (%98, %90) taşıyor; bunların
    hiçbiri Esteelitta için doğrulanamaz, bu yüzden hiçbiri kopyalanmadı.
    Yerlerine marka cümlesi ve iki marka ilkesi geçti. Sayı, oran ve puan
    yoktur. */

export function AboutIntro() {
  // Şerit gerçek hizmet adlarını taşır; sahte marka üretilmez.
  const marqueeItems = services.map((service) => service.name);

  return (
    <section
      className="pv pv-about"
      id="hakkimizda"
      aria-labelledby="pv-about-title"
      tabIndex={-1}
    >
      <div className="pv-shell">
        <div className="pv-about__head">
          <PvReveal className="pv-kicker" distance="text">
            <span className="pv-kicker__dot" aria-hidden="true" />
            Hakkımızda
          </PvReveal>

          <PvReveal as="h2" className="pv-h2" distance="text" order={1}>
            <span id="pv-about-title">
              Güzelliği bir hedef değil, kendinize ayırdığınız{" "}
              <em className="brand-emphasis">zaman</em> olarak görüyoruz.
            </span>
          </PvReveal>
        </div>

        <PvReveal className="pv-about__strip">
          <BrandMarquee items={marqueeItems} />
        </PvReveal>

        <div className="pv-about__cards">
          <PvReveal className="pv-about__image">
            <Image
              src="/media/homepage-about-v1/01-dogal-yaklasim-v1.jpg"
              alt="Aydınlık bir güzellik stüdyosunda danışan ile uzmanın bakım seçeneklerini birlikte değerlendirdiği temsili an."
              width={1254}
              height={1254}
              sizes="(min-width: 1200px) 390px, (min-width: 810px) 46vw, calc(100vw - 40px)"
            />
          </PvReveal>

          <PvReveal className="pv-statement">
            <p className="pv-statement__text">
              Aynı uygulama herkese aynı biçimde uygulanmaz. Önce cildinizi,
              alışkanlıklarınızı ve beklentinizi konuşuyor, planı birlikte
              kuruyoruz.
            </p>
            <SiteLink className="pv-button pv-button--primary" href="/hakkimizda">
              Hakkımızda
            </SiteLink>
          </PvReveal>

          <div className="pv-about__facts">
            <PvReveal className="pv-fact pv-fact--dark" order={1}>
              <p className="pv-fact__lead">Doğal ve ölçülü</p>
              <p className="pv-fact__body">
                Yüzünüze ve ifadenize sadık, dengeli ve abartısız sonuçları
                önemsiyoruz.
              </p>
            </PvReveal>

            <PvReveal className="pv-fact pv-fact--tint" order={2}>
              <p className="pv-fact__lead">Her adımda güven</p>
              <p className="pv-fact__body">
                Uygulamayı, kullanılan ürünleri ve bakım sonrasını açık ve
                anlaşılır biçimde paylaşıyoruz.
              </p>
            </PvReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
