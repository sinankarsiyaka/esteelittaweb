import Image from "next/image";

import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { SiteLink } from "@/components/site-link";
import { featuredServices } from "@/data/services";

/** 3. durak — hizmetler.

    Referanstaki Services bölümünün kart anatomisi birebir uygulanır:
    üstte sabit yükseklikli görsel bandı, altında serif başlık, sans
    açıklama ve en altta bir aksiyon satırı. Kartın kendi yüzeyi vardır,
    görsel kartın üst kenarına oturur.

    Görsel bandı referanstaki gibi sabit yüksekliktedir (masaüstünde
    320px), genişliği kolonu doldurur ve object-fit: cover ile kırpılır.
    Kırpımın her kırılımda konuyu koruması için her hizmetin kendi odak
    noktası kullanılır (bkz. src/data/services.ts — Saç Tasarımı ve Kalıcı
    Makyaj odakları bu bant için düzeltildi).

    Kolon sayısı referansın kendi ızgarasını izler: 1200px üstünde dört
    (Benefits bölümüyle aynı 4'lü ızgara), 810–1199 arasında iki, 809
    altında tek kolon.

    Referanstaki "(5.0)" puan alanı kopyalanmadı: doğrulanmamış bir
    değerlendirmedir. Aksiyon satırında onun yerine hizmetin kendi künyesi
    (micro) durur.

    Kartların kendi "Detaylar" butonu yoktur; bölümün tek CTA'sı başlık
    satırının sağındadır ve bölümde bir kez geçer. */

const SIZES =
  "(min-width: 1200px) 285px, (min-width: 810px) 46vw, calc(100vw - 40px)";

export function ServicesGrid() {
  return (
    <section className="pv pv-services" id="hizmetler" aria-labelledby="pv-services-title">
      <div className="pv-shell">
        <div className="pv-head pv-head--split">
          {/* Kicker yok: bir önceki bölüm (marka tanıtımı) zaten
              kicker + serif başlık formülüyle açılıyor ve başlığın kendisi
              bölümü adlandırıyor. Ardışık bölümlerde aynı formül
              tekrarlanmaz (bkz. DESIGN.md §4). */}
          <div className="pv-head__text">
            <PvReveal as="h2" className="pv-h2" distance="text" order={1}>
              <span id="pv-services-title">Öne çıkan dört uygulama</span>
            </PvReveal>
          </div>

          <PvReveal className="pv-head__action" distance="text" order={2}>
            <SiteLink className="pv-button pv-button--primary" href="/hizmetler">
              Tüm Hizmetleri Keşfet
            </SiteLink>
          </PvReveal>
        </div>

        <ul className="pv-services__grid">
          {featuredServices.map((service, index) => (
            <PvReveal as="li" className="pv-card" key={service.id} order={index}>
              <span className="pv-card__media">
                {/* Künye görünür metin olarak zaten okunuyor; görsel bu
                    yüzden dekoratif işaretlenir. */}
                <Image
                  src={service.homeImage ?? ""}
                  alt=""
                  fill
                  sizes={SIZES}
                  style={{ objectPosition: service.homeFocalPoint }}
                />
              </span>

              <div className="pv-card__body">
                <h3 className="pv-h3">{service.name}</h3>
                <p className="pv-card__desc">{service.description}</p>

                <div className="pv-card__foot">
                  <span className="pv-card__micro">{service.micro}</span>
                </div>
              </div>
            </PvReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
