import Image from "next/image";

import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { experienceLead, principles } from "@/data/home";

/** 6. durak — danışan deneyimi.

    Referanstaki Testimonials bölümünün görsel kabuğu korunur: ortalanmış
    başlık, solda fotoğraflı büyük öne çıkan kart (alttan koyulaşan perde
    ve üstüne oturan metin), sağda dört küçük kartlık ızgara.

    İçerik farkı zorunludur. Esteelitta'nın gerçek ve onaylanmış danışan
    yorumu bulunmuyor; bu yüzden referanstaki yıldızlar, avatar
    fotoğrafları, isimler, meslek satırları ve yorum metinleri
    kopyalanmadı. Hiçbiri uydurulmadı da. Bölüm aynı kompozisyonda gerçek
    marka ilkelerini anlatır.

    Öne çıkan görsel yapay üretimdir ve gerçek bir danışan olarak
    sunulmaz; alt metni bunu açıkça söyler. */

export function ExperienceWall() {
  return (
    <section
      className="pv pv-experience"
      id="deneyim"
      aria-labelledby="pv-experience-title"
    >
      <div className="pv-shell">
        {/* Kicker kaldırıldı: "Danışan deneyimi" etiketi hemen altındaki
            başlıkta ("Danışan deneyiminde önem verdiklerimiz") birebir
            tekrarlanıyordu. */}
        <div className="pv-head pv-head--center">
          <PvReveal as="h2" className="pv-h2" distance="text" order={1}>
            <span id="pv-experience-title">
              Danışan deneyiminde önem verdiklerimiz
            </span>
          </PvReveal>
        </div>

        <div className="pv-experience__grid">
          <PvReveal className="pv-featured">
            <span className="pv-featured__media">
              <Image
                src="/media/homepage-v3/04-deneyim-portre-v1.webp"
                alt="Sakin bir dinlenme anını canlandıran temsili görsel: aydınlık bir odada gözleri kapalı duran bir kişi."
                fill
                sizes="(min-width: 1200px) 419px, (min-width: 810px) 46vw, calc(100vw - 40px)"
                style={{ objectPosition: "50% 34%" }}
              />
            </span>
            <span className="pv-featured__scrim" aria-hidden="true" />
            <p className="pv-featured__text">{experienceLead}</p>
          </PvReveal>

          <ul className="pv-principles">
            {principles.map((principle, index) => (
              <PvReveal
                as="li"
                className="pv-principle"
                key={principle.id}
                order={index}
              >
                <h3 className="pv-principle__title">{principle.title}</h3>
                <p className="pv-principle__body">{principle.body}</p>
              </PvReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
