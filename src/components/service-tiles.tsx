import Image from "next/image";

import { services } from "@/data/services";

/**
 * Hizmet başına çizgi ikon. Sekiz ikon da 32×32 kutuda ve tek ortak çizgi
 * kalınlığıyla çizilir (bkz. globals.css, .service-tile__badge svg);
 * kutu 0.78 × rozet çapı. Yalnızca dekoratif olduğu için rozet seviyesinde
 * aria-hidden veriliyor; anlam h3 başlığında taşınıyor.
 */
const icons: Record<string, React.ReactNode> = {
  // 01 — kıl kökü: ince, uzun, içi açık kıl konturu; yuvarlak ve derin U
  //      kök; kısa deri kolları.
  "01": (
    <>
      <path d="M21.5 3.5C16 9 14.5 15.4 14.5 22c0 2.2.6 3 1.5 3s1.5-.8 1.5-3c0-6.6.6-12.5 4-18.5Z" />
      <path d="M4 20h6v3c0 4 2.5 6 6 6s6-2 6-6v-3h6M4 23h3m18 0h3" />
    </>
  ),
  // 02 — bandanalı yüz
  "02": (
    <>
      <path d="M7 17V13a9 9 0 0 1 18 0v4M8 12c4-5 12-5 16 0" />
      <path d="M9 13v4c0 5 3.5 9 7 9s7-4 7-9v-4M12 25v2l-5 2m13-4v2l5 2" />
      <path d="M11.5 16c.9-.7 1.8-.7 2.7 0m3.6 0c.9-.7 1.8-.7 2.7 0M16 17v3h-1m-.8 2c1.1.8 2.5.8 3.6 0" />
    </>
  ),
  // 03 — bel konturu ve yön çizgileri
  "03": (
    <>
      <path d="M10 4c1 3.5 2 6 1 9l-2 5c-1.4 4-.5 7 1 10M22 4c-1 3.5-2 6-1 9l2 5c1.4 4 .5 7-1 10" />
      <path d="M15 18c.6.6 1.4.6 2 0M12 23c1.5.2 2.8 1 4 2 1.2-1 2.5-1.8 4-2M16 25v4" />
      <path d="M4 10v7m-2-2 2 2 2-2M28 17v-7m-2 2 2-2 2 2" />
    </>
  ),
  // 04 — kapalı gözlü yüz ve kalıcı makyaj kalemi
  "04": (
    <>
      <path d="M24 13c0-6-3.5-9-8-9S8 7 8 13v5c0 5 4 10 8 10 2.5 0 5-2 6.5-5" />
      <path d="M8.5 12c3-1 5.5-3 7-5 2 2.5 4.5 4 8 5M11 16c1 1 2.3 1 3.3 0M17.7 16c1 1 2.3 1 3.3 0M16 17v3h-1M13.8 23c1.5-.9 2.9-.9 4.4 0-1.4 1.5-3 1.5-4.4 0Z" />
      <path d="m23 22 5-7 2 1.5-5 7-2 .5Z" />
    </>
  ),
  // 05 — saç kütlesi: tepede kubbe, aşağı akan tutamlar, uçlarda kıvrım ve
  //      sağda kütleden ayrılıp dışa savrulan tutam
  "05": (
    <>
      <path d="M24 18v-6a9 9 0 0 0-18 0v8c0 4-.5 6-2 8 3 .8 5.5.5 7-1M16 4c-5 3-5 7-5 12s1 10-3 13" />
      <path d="M17 7c-3 3-3 6-3 10s1 8-1 11M19.5 9c-2 3-2 6-2 10 0 3 .5 6-1 9M22 12v5c0 4 1 6 5 7-1 3-3 4-6 4" />
      <path d="M20 17c0 5-1 7 3 9" />
    </>
  ),
  // 06 — kapalı göz ve kirpikler
  "06": (
    <>
      <path d="M4 12c6 7 18 7 24 0M5.5 15 3 17m6-1-2 4m6-2.5-1 4m4-3.5V23m3-5.5 1 4m3-5.5 2 4m1.5-5L29 17" />
    </>
  ),
  // 07 — kaş: iç uç (sol alt) kalın ve küt, yay yükselip sağa doğru
  //      incelerek sivri kuyrukta biter.
  "07": (
    <>
      <path d="M4 21c4-5 9-9 14-10 4-.8 8 2 11 6-5-3-8-4-11-2-4 2-7 5-11 9-1.3 1-3-1-3-3Z" />
      <path d="m7 20 1-2m2 0 1-2m2 0 1-2" />
    </>
  ),
  // 08 — yumuşak el konturu ve manikürü temsil eden oje şişesi
  "08": (
    <>
      <path d="M10 29v-4c-2-3-3-6-3-9v-5a1.5 1.5 0 0 1 3 0v5-10a1.5 1.5 0 0 1 3 0v9-11a1.5 1.5 0 0 1 3 0v11-8a1.5 1.5 0 0 1 3 0v13l2-3a1.8 1.8 0 0 1 3 2l-3 7v3" />
      <path d="M24 26v-3a2 2 0 0 1 4 0v3m-4 0h4v3h-4Z" />
    </>
  ),
};

export function ServiceTiles() {
  return (
    <ul className="services__grid">
      {services.map((service) => (
        <li className="service-tile" key={service.id}>
          <div className="service-tile__media">
            <figure className="service-tile__figure">
              <Image
                src={service.tileImage ?? service.poster}
                alt=""
                fill
                /* Gerçek kart genişliği .services__grid'deki --bolen/--rozet
                   formülünden gelir; rozet 66px'te sınırlanınca (kart ~273px'i
                   geçince) kolon genişliği artık --w0'a eşit değildir, bu
                   yüzden her kademe globals.css'teki gerçek payıştan ayrı
                   türetildi ve canlı ölçümle doğrulandı (±1px):
                     ≥1200px  (4 sütun)         269px tavanına kadar
                     920–1199 (2 sütun, geniş)  ~390–519px
                     650–919  (2 sütun, dar)    ~272–339px
                     <650     (1 sütun)         ~270–538px */
                sizes="(min-width: 1200px) min(269px, calc((100vw - 48px) / 4.617)), (min-width: 920px) calc(46.06vw - 33.3px), (min-width: 650px) min(339px, calc(46.06vw - 27.8px)), min(538px, calc(100vw - 50px))"
                style={
                  {
                    objectPosition: service.tileFocalPoint,
                    ...(service.tileFrame && {
                      "--zoom": service.tileFrame.zoom,
                      "--ox": service.tileFrame.ox,
                      "--oy": service.tileFrame.oy,
                    }),
                  } as React.CSSProperties
                }
              />
            </figure>
            <span className="service-tile__badge" aria-hidden="true">
              <svg viewBox="0 0 32 32">{icons[service.id]}</svg>
            </span>
          </div>

          <div className="service-tile__meta">
            <span className="service-tile__num" aria-hidden="true">
              {service.id}
            </span>
            <div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
