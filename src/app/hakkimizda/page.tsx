import type { Metadata } from "next";

import {
  ApproachStage,
  type ApproachItem,
} from "@/components/hakkimizda/approach-stage";
import { SpaceDuet } from "@/components/hakkimizda/space-duet";
import { StoryBand } from "@/components/hakkimizda/story-band";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteLink } from "@/components/site-link";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StickyHeader } from "@/components/sticky-header";
import { appointmentHref } from "@/components/site-navigation";

export const metadata: Metadata = {
  title: "Hakkımızda | Esteelitta",
  description:
    "Esteelitta, Küçükyalı'daki stüdyosunda bakımı acele etmeden, kişiye özel ve ölçülü biçimde planlar. Yaklaşımımızı, hijyen anlayışımızı ve mekânımızı tanıyın.",
};

const TOP_ID = "hakkimizda-basi";

/** Sayfanın imza bölümündeki üç ilke. Görseller, metnin anlattığı şeyin
    karşılığıdır: uzman eli, hazırlanmış oda, uygulama anı. */
const approach: ApproachItem[] = [
  {
    title: "Kişiye özel plan",
    body: "Aynı uygulama herkese aynı biçimde uygulanmaz. Önce cildinizi, alışkanlıklarınızı ve beklentinizi konuşuyor, planı birlikte kuruyoruz.",
    src: "/media/hakkimizda-gorseller-v1/01-cilt-bakimi-uzman.png",
    alt: "Uzmanın, dinlenen danışana yüz bakımı uyguladığı temsili an.",
    width: 1024,
    height: 1536,
    objectPosition: "50% 34%",
  },
  {
    title: "Hijyen ve şeffaflık",
    body: "Her uygulama öncesi oda ve malzeme yeniden hazırlanır. Hangi ürünü neden kullandığımızı sorulmadan anlatırız.",
    src: "/media/hizmetler-page-support-v2/surec-bakim-odasi.webp",
    alt: "Uygulama öncesi hazırlanmış temsili bakım odası: temiz havlular ve düzenli tezgâh.",
    width: 1122,
    height: 1194,
  },
  {
    title: "Ölçülü uzmanlık",
    body: "Abartısız, doğal sonuçlar hedefliyoruz. Size uygun olmayan bir uygulamayı önermek yerine nedenini açıklamayı tercih ediyoruz.",
    src: "/media/hizmetler-page-support-v2/cta-cilt-bakimi.webp",
    alt: "Yüz bakımı sırasında gözleri kapalı, rahatlamış bir danışanın temsili görseli.",
    width: 952,
    height: 1536,
    objectPosition: "50% 30%",
  },
];

/** Sayfa server component'tir. Yalnızca hareket taşıyan üç küçük parça
    (görsel bandı, yapışkan sahne, mekân ikilisi) ve paylaşılan header
    kabuğu tarayıcıda çalışır; başlıklar ve metin sunucuda render edilir. */
export default function HakkimizdaPage() {
  return (
    <main className="hakkimizda-main" id={TOP_ID}>
      {/* JavaScript kapalıyken giriş hareketleri uygulanmaz; içerik
          doğrudan okunur durumda kalır. */}
      <noscript>
        <style>{
          ".story-band__mask{clip-path:none!important}.approach__figure,.approach__block{opacity:1!important;transform:none!important}"
        }</style>
      </noscript>

      <SmoothScroll />

      <StickyHeader>
        <SiteHeader context="page" active="hakkimizda" />
      </StickyHeader>

      {/* 1. Masthead. Etiket sol kenarda, başlık içeri girintili: sayfanın
          ilk bakışta bir dergi künyesi gibi okunmasını sağlar. */}
      <section className="hk-hero">
        <div className="section-shell hk-hero__inner">
          <p className="hk-hero__eyebrow">Hakkımızda</p>

          <h1 className="hk-hero__title">
            Bakımı bir <em>zanaat</em>
            <br />
            gibi düşünüyoruz.
          </h1>

          <p className="hk-hero__lead">
            Küçükyalı’daki stüdyomuzda her uygulamayı acele etmeden, size özel
            planlıyoruz.
          </p>
        </div>

        <div className="section-shell">
          <StoryBand
            src="/media/hakkimizda-page-v1/hero-studio-panorama.webp"
            alt="Esteelitta bakım odasının temsili panoramik görünümü: tül perdeli geniş pencere, beyaz bakım koltuğu ve açık yeşil dolaplar."
            width={2560}
            height={1080}
            priority
          />
        </div>
      </section>

      {/* 2. Manifesto. Metin tarafı bilinçli olarak görselsizdir; bölüm
          kenardan kenara tek bir kareyle kapanır. */}
      <section className="hk-manifesto" aria-labelledby="manifesto-baslik">
        <div className="section-shell hk-manifesto__inner">
          <Reveal>
            <h2 id="manifesto-baslik" className="hk-manifesto__title">
              <span className="mask-line">Güzelliği bir hedef değil,</span>
              <span className="mask-line">kendinize ayırdığınız</span>
              <span className="mask-line">
                <em>zamanın</em> sonucu sayıyoruz.
              </span>
            </h2>
          </Reveal>

          <Reveal order={1}>
            <p className="hk-manifesto__body">
              Cildinizi, ritminizi ve beklentinizi dinliyoruz. Sonra yalnızca
              gerekeni, gerektiği kadar uyguluyoruz. Amacımız görünüşünüzü
              değiştirmek değil, kendinizi rahat hissettiğiniz hâli korumak.
            </p>
          </Reveal>
        </div>

        {/* Manifestonun karşılığı: kenardan kenara tek bir sessiz kare.
            Bölüm salt tipografi olarak başlayıp görsel bir nefesle
            kapanır; sayfadaki tek tam genişlik görseli budur. */}
        <StoryBand
          className="hk-bleed"
          src="/media/hakkimizda-page-v1/detay-hazirlik-makro.webp"
          alt="Uygulama öncesi hazırlık: temiz pamuk pedlerin ve çelik kabın taş tezgâhta düzenlendiği temsili an."
          width={2200}
          height={1100}
        />
      </section>

      {/* 3. İmza kaydırma anı: yapışkan görsel, okunan ilkeye cevap verir. */}
      <section className="hk-approach" aria-labelledby="yaklasim-baslik">
        <div className="section-shell">
          <Reveal className="hk-approach__head">
            <h2 id="yaklasim-baslik" className="hk-section-title">
              <span className="mask-line">
                Sakin, ölçülü ve <em>size özel.</em>
              </span>
            </h2>
          </Reveal>

          <ApproachStage items={approach} />
        </div>
      </section>

      {/* 4. Mekân. İki fotoğraf farklı yüksekliklerde ve farklı
          hızlarda: kolaj değil, derinlik. */}
      <section className="hk-mekan" aria-labelledby="mekan-baslik">
        <div className="section-shell hk-mekan__inner">
          <Reveal className="hk-mekan__copy">
            <h2 id="mekan-baslik" className="hk-section-title">
              <span className="mask-line">Kapıdan girdiğiniz an</span>
              <span className="mask-line">
                <em>yavaşlar.</em>
              </span>
            </h2>

            <p className="hk-mekan__body">
              Küçük bir stüdyoyuz ve aynı anda tek kişiyle ilgileniyoruz.
              Bekleme yok, acele yok. Uygulama boyunca oda yalnızca size ait.
            </p>
          </Reveal>

          <SpaceDuet />
        </div>

        <p className="hk-note">Görseller temsilidir.</p>
      </section>

      {/* 5. Kapanış: uygulama sonrası iletişim ve tek bir çağrı. */}
      <section className="hk-kapanis" aria-labelledby="kapanis-baslik">
        <div className="section-shell hk-kapanis__inner">
          <Reveal>
            <h2 id="kapanis-baslik" className="hk-kapanis__title">
              <span className="mask-line">Uygulamadan sonra da</span>
              <span className="mask-line">yanınızdayız.</span>
            </h2>
          </Reveal>

          <Reveal order={1}>
            <p className="hk-kapanis__body">
              Bakım sonrası nelere dikkat etmeniz gerektiğini birlikte
              konuşuyoruz. Aklınıza sonradan bir soru takılırsa yanıtlamak için
              buradayız.
            </p>
          </Reveal>

          <Reveal order={2}>
            <SiteLink className="button hk-kapanis__cta" href={appointmentHref}>
              Randevu Al
            </SiteLink>
          </Reveal>
        </div>
      </section>

      <SiteFooter context="page" topHref={`#${TOP_ID}`} />
    </main>
  );
}
