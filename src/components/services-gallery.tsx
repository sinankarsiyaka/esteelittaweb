import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/reveal";
import { services } from "@/data/services";

/* Editoryal Hizmet Düeti (V4) — onaylı referanstan ölçülerek kuruldu.

   Bir satır = tek bir editoryal düet. Soldaki hizmetin görseli satırın
   dış-solunda, metni merkeze doğru; sağdaki hizmette ilişki aynalanır.
   Görseller serbest duran organik lenslerdir: kart zemini, panel, gölge,
   rozet, CTA veya tıklanabilir hizmet bağlantısı yoktur.

   Metin her iki blokta da kendi ızgara kolonundadır; hiçbir genişlikte
   fotoğrafın üzerine binmez. DOM sırası ikisinde de görsel → metin;
   aynalama yalnızca ızgarada yapıldığı için mobil akış ve okuma sırası
   bozulmadan dört sıra × iki sütuna iner. Yatay carousel kullanılmaz. */

const TOTAL = String(services.length).padStart(2, "0");

/** Referanstaki iki satırlık editoryal ölçek: başlık son boşluktan
    kırılır — "Lazer / Epilasyon", "El ve Tırnak / Bakımı". */
function titleLines(name: string): [string, string] {
  const at = name.lastIndexOf(" ");
  return at === -1 ? [name, ""] : [name.slice(0, at), name.slice(at + 1)];
}

/* Çizilen gerçek lens genişliği; tarayıcı doğru srcset adayını buradan
   seçer. Masaüstünde clamp() 268px'te durur; 620px ve üzerinde lens
   min(100%, 260px) ile sınırlıdır; altında ledger'ın iki sütunundan biri
   ≈45vw olur (390px'te 168px). */
const FIGURE_SIZES = [
  "(min-width: 1024px) 268px",
  "(min-width: 620px) 260px",
  "45vw",
].join(", ");

/* V3 türevleri zaten lens oranında ve dosya boyutları küçük; galeri bu
   sayfanın baskın görsel içeriği olduğu için 75 yerine 90 ile sunulur
   (bkz. next.config.ts içindeki images.qualities allowlist'i). */
const FIGURE_QUALITY = 90;

/* Sekiz hizmet dört düete ayrılır; satır ayırıcısı ve iki hizmet
   arasındaki ince dikey aks bu kabuğa aittir. */
const PAIRS = [0, 2, 4, 6].map((start) => services.slice(start, start + 2));

/** Çiftin ikinci hizmeti yaklaşık 100 ms gecikmeli girer. */
const SECOND_DELAY = { "--reveal-delay": "100ms" } as CSSProperties;

export function ServicesGallery() {
  return (
    <div className="duet">
      {PAIRS.map((pair) => (
        <div className="duet__pair" key={pair[0].id}>
          {pair.map((service, column) => {
            const [firstLine, secondLine] = titleLines(service.name);

            return (
              <Reveal
                key={service.id}
                className={`duet__entry duet__entry--${
                  column === 0 ? "left" : "right"
                }`}
                style={column === 1 ? SECOND_DELAY : undefined}
              >
                <figure className="duet__figure">
                  <span className="duet__lens">
                    <Image
                      className="duet__photo"
                      src={service.sceneImage}
                      alt={`${service.name} uygulamasını gösteren temsili görsel`}
                      fill
                      sizes={FIGURE_SIZES}
                      quality={FIGURE_QUALITY}
                      style={{ objectPosition: service.sceneFocalPoint }}
                    />
                  </span>
                </figure>

                <div className="duet__copy">
                  <p className="duet__number">
                    {service.id} <span>/ {TOTAL}</span>
                  </p>

                  <h3 className="duet__name">
                    {firstLine}
                    {secondLine ? (
                      <>
                        <br />
                        {secondLine}
                      </>
                    ) : null}
                  </h3>

                  <p className="duet__desc">{service.sceneDescription}</p>
                  <p className="duet__micro">{service.micro}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}
