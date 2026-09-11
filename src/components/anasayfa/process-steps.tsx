import Image from "next/image";

import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { processSteps } from "@/data/home";

/** 5. durak — nasıl ilerliyoruz.

    Referanstaki How We Work bölümünün yapısı: solda başlık bloğu, sağda
    alt alta dizilen koyu adım kartları. Sol blok yapışkandır ve sağdaki
    kartlar altından akarken ekranda kalır.

    Yapışkanlık sayfadaki tek sticky davranıştır — referansta da öyle,
    ölçüldü: bütün sayfada `position: sticky` olan tek öğe bu başlık
    bloğuydu. Ana sayfada sabit bir header olmadığı için üst boşluk
    referanstaki 100px yerine biraz daha dar tutuldu.

    Kart anatomisi birebir: büyük serif rakam, serif başlık, sans
    açıklama, iki küçük etiket ve en altta sabit yükseklikli görsel.

    809px altında yapışkanlık kalkar, başlık kartların üstüne normal
    akışta oturur. Yapışkan alan hiçbir kırılımda kaydırmayı ele
    geçirmez; kartlar kendi hızlarında akar. */

export function ProcessSteps() {
  return (
    <section className="pv pv-process" id="surec" aria-labelledby="pv-process-title">
      <div className="pv-shell pv-process__grid">
        <div className="pv-process__aside">
          <div className="pv-process__sticky">
            <PvReveal className="pv-kicker" distance="text">
              <span className="pv-kicker__dot" aria-hidden="true" />
              Süreç
            </PvReveal>

            <PvReveal as="h2" className="pv-h2" distance="text" order={1}>
              <span id="pv-process-title">Nasıl ilerliyoruz?</span>
            </PvReveal>
          </div>
        </div>

        <ol className="pv-process__list">
          {processSteps.map((step) => (
            <PvReveal as="li" className="pv-step" key={step.id}>
              <p className="pv-step__index" aria-hidden="true">
                {step.index}
              </p>

              <h3 className="pv-h3">{step.title}</h3>
              <p className="pv-step__body">{step.body}</p>

              <ul className="pv-step__tags">
                {step.tags.map((tag) => (
                  <li className="pv-tag" key={tag}>
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="pv-tag__icon">
                      <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      <path
                        d="m5.4 8.2 1.8 1.8 3.4-3.6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {tag}
                  </li>
                ))}
              </ul>

              <span className="pv-step__media hover-zoom">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  /* Ölçüldü: .pv-shell 1200px'te tavana ulaştığı için
                     bu kolon ≥1200px'te viewport'tan bağımsız ~630px'te
                     sabitleniyor. Eski "423px" ipucu gerçek genişlikten
                     ~200px azdı; tarayıcı bu yüzden gereğinden küçük bir
                     srcset adayı seçip görseli hafifçe büyütüyordu. */
                  sizes="(min-width: 1200px) 630px, (min-width: 810px) 44vw, calc(100vw - 88px)"
                  quality={90}
                  style={{ objectPosition: step.focalPoint }}
                />
              </span>
            </PvReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
