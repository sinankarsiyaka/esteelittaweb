import Image from "next/image";

import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { SiteLink } from "@/components/site-link";

/** 4. durak — büyük atmosfer bölümü.

    Referansta Services ile How We Work arasında duran iki kolonlu blok:
    solda sabit yükseklikli büyük görsel, sağda aynı yükseklikte koyu
    panel. Panelin içinde serif başlık, ortada dört düğümlü bir bant ve en
    altta paneli boydan boya geçen bir buton bulunur. Yapı birebir korunur.

    Referanstaki bantta dört yuvarlak portre fotoğrafı var; bunlar uydurma
    kişilerdir ve kopyalanmadı. Aynı bant, aynı ritimle korunur ama
    düğümler fotoğrafsızdır ve gerçek süreç adımlarını adlandırır.

    809px altında iki kolon üst üste iner: önce görsel, sonra panel. */

export function FeatureCta() {
  return (
    <section className="pv pv-feature" aria-labelledby="pv-feature-title">
      <div className="pv-shell pv-feature__grid">
        <PvReveal className="pv-feature__media hover-zoom">
          <Image
            src="/media/impeccable-final-v1/anasayfa-marka-yaklasimi-renk-v2.webp"
            alt="Danışma anını canlandıran temsili görsel: aydınlık bir odada yan yana oturmuş iki kişi konuşuyor."
            fill
            sizes="(min-width: 1200px) 566px, (min-width: 810px) 46vw, calc(100vw - 40px)"
            quality={90}
          />
        </PvReveal>

        <PvReveal className="pv-feature__panel" order={1}>
          <h2 className="pv-h2" id="pv-feature-title">
            Bakımı acele etmeyen, <em className="brand-emphasis">size göre</em>{" "}
            planlanan bir düzen
          </h2>

          <ul className="pv-nodes" aria-hidden="true">
            {["Dinleme", "Planlama", "Uygulama", "Takip"].map((node, index) => (
              <li
                className="pv-nodes__item"
                key={node}
                style={{ "--pv-i": index } as React.CSSProperties}
              >
                <span className="pv-nodes__mark" />
                <span className="pv-nodes__label">{node}</span>
              </li>
            ))}
          </ul>

          {/* Referansta bu yuvada sayfanın birincil dönüşüm butonu var.
              Bizde "Hakkımızda" marka tanıtımı bölümünde, "İletişime Geç"
              ise kapanışta duruyor; ikisini burada tekrarlamak aynı niyeti
              sayfada ikinci kez basmak olurdu. Buton yapısal olarak
              korunur ama hemen altındaki süreç bölümüne bağlanır. */}
          <SiteLink className="pv-button pv-button--primary pv-feature__cta" href="#surec">
            Süreci İnceleyin
          </SiteLink>
        </PvReveal>
      </div>
    </section>
  );
}
