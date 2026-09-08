import Image from "next/image";
import type { ReactNode } from "react";

/** "Özen / Uzmanlık / Güven" hareketli şeritleri.

    Stilla'nın "Joyful / Balance / Wellness" bölümünün Esteelitta
    karşılığı. Yayınlanan sayfada üç ayrı şerit ölçüldü: birinci ve üçüncü
    satır sola, ikinci satır sağa akıyor ve içerik iki kez çoğaltılmış bir
    liste üzerinde taşınıyordu.

    Burada hareket tümüyle CSS keyframes ile üretilir: React state,
    setInterval veya kaydırma dinleyicisi yoktur, bu yüzden bileşen server
    component olarak kalır. Her şerit içeriği dört kez basar ve tam bir
    kopya genişliği kadar ötelenir; döngü başa döndüğünde ikinci kopya
    birincinin yerine oturduğu için birleşme noktası görünmez ve başlangıçta
    boşluk oluşmaz.

    Süreler, kopya genişliği ölçülerek ~60px/s hıza göre satır satır
    ayarlanmıştır (globals.css içindeki --marquee-duration). */

type Item = ReactNode;

/** Şerit içeriğinin kaç kez basılacağı. Bkz. marquee__track yorumu. */
const COPIES = [0, 1, 2, 3];

/** Şerit parçaları: yazı, dolu/açık daireler, yarım daireler, hap ve
    kemer biçimli görsel maskeleri. */
const word = (text: string) => (
  <span className="marquee__word">{text}</span>
);

const disc = (tone: "turquoise" | "mist") => (
  <span className={`marquee__shape marquee__shape--disc marquee__shape--${tone}`} />
);

const half = (tone: "turquoise" | "mist", flip?: boolean) => (
  <span
    className={`marquee__shape marquee__shape--half marquee__shape--${tone}${
      flip ? " is-flipped" : ""
    }`}
  />
);

type Photo = {
  src: string;
  width: number;
  height: number;
  shape: "circle" | "pill" | "arch";
  position?: string;
};

const photo = ({ src, width, height, shape, position }: Photo) => (
  <span className={`marquee__photo marquee__photo--${shape}`}>
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      sizes="(min-width: 650px) 230px, 128px"
      style={position ? { objectPosition: position } : undefined}
    />
  </span>
);

const CILT = {
  src: "/media/esteelitta-hizmet-gorselleri-v3/02-cilt-bakimi.webp",
  width: 1024,
  height: 1215,
} as const;

const KAS = {
  src: "/media/esteelitta-hizmet-gorselleri-v3/07-kas-tasarimi.webp",
  width: 793,
  height: 941,
} as const;

const KIRPIK = {
  src: "/media/esteelitta-hizmet-gorselleri-v3/06-ipek-kirpik.webp",
  width: 1024,
  height: 1215,
} as const;

const UZMAN = {
  src: "/media/hakkimizda-gorseller-v1/01-cilt-bakimi-uzman.png",
  width: 1024,
  height: 1536,
} as const;

const RESEPSIYON = {
  src: "/media/hakkimizda-gorseller-v1/02-resepsiyon-temsili.png",
  width: 1448,
  height: 1086,
} as const;

const ODA = {
  src: "/media/hakkimizda-gorseller-v1/03-bakim-odasi-temsili.png",
  width: 1448,
  height: 1086,
} as const;

const rows: { label: string; direction: "left" | "right"; items: Item[] }[] = [
  {
    label: "Özen",
    direction: "left",
    items: [
      half("turquoise"),
      photo({ ...CILT, shape: "circle", position: "50% 30%" }),
      word("Özen"),
      disc("mist"),
      photo({ ...KAS, shape: "pill", position: "50% 42%" }),
      half("turquoise", true),
    ],
  },
  {
    label: "Uzmanlık",
    direction: "right",
    items: [
      photo({ ...UZMAN, shape: "pill", position: "50% 34%" }),
      half("mist"),
      disc("turquoise"),
      word("Uzmanlık"),
      photo({ ...ODA, shape: "arch" }),
      half("turquoise", true),
    ],
  },
  {
    label: "Güven",
    direction: "left",
    items: [
      half("turquoise"),
      photo({ ...RESEPSIYON, shape: "arch" }),
      word("Güven"),
      disc("mist"),
      photo({ ...KIRPIK, shape: "circle", position: "50% 40%" }),
      half("turquoise", true),
    ],
  },
];

export function ExperienceMarquee() {
  return (
    <section className="deneyim" aria-labelledby="deneyim-basligi">
      <p className="iletisim-kicker deneyim__kicker" id="deneyim-basligi">
        <span className="iletisim-hero__dot" aria-hidden="true" />
        Esteelitta Deneyimi
      </p>

      <div className="deneyim__rows">
        {rows.map((row, rowIndex) => (
          <div
            key={row.label}
            className={`marquee marquee--${row.direction}`}
            data-row={rowIndex + 1}
          >
            {/* İçerik dört kez basılır ve şerit tam bir kopya genişliği
                (%25) kadar ötelenir; döngü başa döndüğünde ikinci kopya
                birincinin yerine oturduğu için birleşme noktası
                görünmez. Dört kopya, döngü sonunda satırın sağ ucunda
                boşluk kalmaması için gerekir: geriye kalan üç kopya
                (~3500px) her masaüstü genişliğini kapatır.
                Ekran okuyucular için tek okunur metin yeterli olduğundan
                görsel şerit aria-hidden'dır. */}
            <div className="marquee__track" aria-hidden="true">
              {COPIES.map((copy) => (
                <div className="marquee__group" key={copy}>
                  {row.items.map((item, index) => (
                    <span className="marquee__cell" key={index}>
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <span className="visually-hidden">{row.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
