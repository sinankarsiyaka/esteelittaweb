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
      <path d="M21.1 3.85c-2.2 4.25-5.1 10.05-6.1 15.35-.4 3.2.2 5.6 1.4 5.6s1.6-2.4 1.6-5.6c.7-5.3 1.7-10.8 3.1-15.35Z" />
      <path d="M6 19.16h5.4c1 0 .7 2.84 1 5.24.4 2.9 2.1 3.75 4 3.75s3.6-.85 4-3.75c.3-2.4 0-5.24 1-5.24H26" />
    </>
  ),
  // 02 — bandanalı yüz
  "02": (
    <>
      <path d="M8.7 15.6c0-5.4 3.3-8.7 7.3-8.7s7.3 3.3 7.3 8.7c0 5.3-3.3 8.9-7.3 8.9s-7.3-3.6-7.3-8.9Z" />
      <path d="M8.8 11.9c1.7-2.6 4.2-3.9 7.2-3.9s5.5 1.3 7.2 3.9" />
      <path d="M8.2 8.6c1.9-3 4.5-4.5 7.8-4.5s5.9 1.5 7.8 4.5" />
      <path d="M9.1 5.6c1.7-1.9 4-2.85 6.9-2.85s5.2.95 6.9 2.85" />
      <path d="M13.2 15.8h.01M18.8 15.8h.01" />
      <path d="M16 17.2v1.9" />
      <path d="M14.4 20.8c1 .8 2.2.8 3.2 0" />
      <path d="M12 24.1 9.2 29.2M20 24.1l2.8 5.1" />
    </>
  ),
  // 03 — vücut hattı: iki yan kontur, ölçü yaprakları ve iç işaretler
  "03": (
    <>
      <path d="M11.8 3.6C9.6 8.6 8.8 13 9.4 16.8c.7 4.4.1 8.2-1.8 11.6" />
      <path d="M20.2 3.6c2.2 5 3 9.4 2.4 13.2-.7 4.4-.1 8.2 1.8 11.6" />
      <path d="M11.8 3.6c2.1 2.4 2.7 4.9 1.8 7.4-.7 2-2.2 2.1-3.2.3-1.2-2.1-.7-4.7 1.4-7.7Z" />
      <path d="M20.2 3.6c-2.1 2.4-2.7 4.9-1.8 7.4.7 2 2.2 2.1 3.2.3 1.2-2.1.7-4.7-1.4-7.7Z" />
      <path d="M14.6 22.2c.9.9 1.9.9 2.8 0" />
    </>
  ),
  // 04 — maske uygulanmış yüz, kapalı gözler
  "04": (
    <>
      <path d="M8.8 16c0-5.6 3.2-9.3 7.2-9.3s7.2 3.7 7.2 9.3c0 5.5-3.2 9.4-7.2 9.4s-7.2-3.9-7.2-9.4Z" />
      <path d="M8.9 12c1.6-3.2 4-4.8 7.1-4.8s5.5 1.6 7.1 4.8" />
      <path d="M8.5 8.4c1.7-3.4 4.2-5.1 7.5-5.1s5.8 1.7 7.5 5.1" />
      <path d="M11.4 16.4c1-1 2.3-1 3.3 0M17.3 16.4c1-1 2.3-1 3.3 0" />
      <path d="M14.3 21.2c1.1 1 2.3 1 3.4 0" />
      <path d="M10.4 24c1.7 2.9 3.6 4.4 5.6 4.4s3.9-1.5 5.6-4.4" />
    </>
  ),
  // 05 — saç kütlesi: tepede kubbe, aşağı akan tutamlar, uçlarda kıvrım ve
  //      sağda kütleden ayrılıp dışa savrulan tutam
  "05": (
    <>
      <path d="M22 19v-5.4C22 8.6 19.3 4.6 16 4.6S10 8.6 10 13.6v13c0 1.6 1.1 2.5 2.3 2" />
      <path d="M12.4 10.4v16.2c0 1.6 1.1 2.5 2.3 2" />
      <path d="M14.8 8.6v18.6c0 1.6 1.1 2.5 2.3 2" />
      <path d="M17.2 8.6v17.4c0 1.6 1.1 2.5 2.3 2" />
      <path d="M19.6 10.4v13.8" />
      <path d="M22 19c2.2 1.6 2.8 3.8 1.8 5.6-.6 1.1-1.6 1.9-2.6 2.6" />
    </>
  ),
  // 06 — kapalı göz ve kirpikler
  "06": (
    <>
      <path d="M4.4 11.2c3.5 4 7.4 6 11.6 6s8.1-2 11.6-6" />
      <path d="m7.6 14.7-1.2 3.3M11 16.7l-.8 3.2M14.4 17.6l-.4 3.3M17.6 17.6l.4 3.3M21 16.7l.8 3.2M24.4 14.7l1.2 3.3" />
    </>
  ),
  // 07 — kaş: iç uç (sol alt) kalın ve küt, yay yükselip sağa doğru
  //      incelerek sivri kuyrukta biter.
  "07": (
    <>
      <path d="M6.4 20.2c1.8-3.8 5.7-6.7 10.7-8.2 5-1.5 9.2-.6 11.6 2.6.3.4.1.8-.5.7-2.5-.4-5.4 0-8.6 1-4.7 1.4-8.2 4.3-10.5 8.6-.7 1.3-2.5.9-2.7-.6-.3-1.3-.3-2.8 0-4.1Z" />
    </>
  ),
  // 08 — el: dört parmak yukarı, tek dış konturda kademeli uçlar; sağ altta
  //      başparmak lobu ve lobun içinde tırnak
  "08": (
    <>
      <path d="M8.6 26.4V11.7a1.3 1.3 0 0 1 2.6 0V7.5a1.3 1.3 0 0 1 2.6 0v-.7a1.3 1.3 0 0 1 2.6 0v3.3a1.3 1.3 0 0 1 2.6 0v6.6" />
      <path d="M19 16.7c2.9.6 4.9 3 4.9 6.1 0 3.4-2.3 6-5.3 6-1.7 0-3-1.3-3-3.1v-3.9" />
      <path d="M19.6 22.2c1 0 1.8 1.1 1.8 2.4s-.8 2.4-1.8 2.4-1.8-1.1-1.8-2.4.8-2.4 1.8-2.4Z" />
      <path d="M11.2 11.7v2.9M13.8 7.5v6.4M16.4 10.1v3.7" />
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
