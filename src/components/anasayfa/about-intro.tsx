import { BrandMarquee } from "@/components/anasayfa/brand-marquee";
import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { SiteLink } from "@/components/site-link";
import { contactAddressLines } from "@/data/site";
import { services } from "@/data/services";

/** 1. durak — marka tanıtımı.

    Referanstaki About Us bloğunun düzeni birebir korunur: solda dar
    kicker kolonu, sağda 700px'i geçmeyen büyük serif başlık, altında
    yatay şerit, en altta üç kartlık küme (solda geniş ifade kartı, sağda
    üst üste iki küçük kart).

    İçerik farkı bilinçlidir. Referanstaki küme uydurma bir puan (4.9),
    avatar fotoğrafları ve iki istatistik (%98, %90) taşıyor; bunların
    hiçbiri Esteelitta için doğrulanamaz, bu yüzden hiçbiri kopyalanmadı.
    Yerlerine marka cümlesi ve iki doğrulanabilir bilgi geçti: adres
    src/data/site.ts'ten, randevu düzeni ise sitenin kendi çalışma
    biçiminden gelir. Sayı, oran ve puan yoktur. */

export function AboutIntro() {
  // Şerit gerçek hizmet adlarını taşır; sahte marka üretilmez.
  const marqueeItems = services.map((service) => service.name);

  return (
    <section className="pv pv-about" id="hakkimizda" aria-labelledby="pv-about-title">
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
              <p className="pv-fact__lead">Küçükyalı</p>
              <p className="pv-fact__body">
                {contactAddressLines.join(", ")} adresindeki stüdyomuzda
                karşılıyoruz.
              </p>
            </PvReveal>

            <PvReveal className="pv-fact pv-fact--tint" order={2}>
              <p className="pv-fact__lead">Randevu ile</p>
              <p className="pv-fact__body">
                Her uygulama, önceden birlikte planladığımız bir randevuyla
                başlıyor.
              </p>
            </PvReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
