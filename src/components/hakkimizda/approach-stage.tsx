"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";

/** Sayfanın imza kaydırma anı: sabit duran görsel, okunan ilkeye cevap
    verir.

    Masaüstünde soldaki görsel sütunu yapışkandır ve üç fotoğraf üst üste
    durur. Sağdaki ilke bloklarından hangisi okunuyorsa ona ait fotoğraf
    açılır. Hareketin gerekçesi dekorasyon değil: metin ile görsel
    arasındaki bağı kaydırma sırasında canlı tutar.

    Fotoğraflar katman gibi çalışır. En alttaki hep opaktır, üsttekiler
    kaydırma ilerledikçe onun üzerine açılır. Böylece geçiş sırasında iki
    görselin arasından zemin sızmaz, yani ara karede parlama olmaz.

    Dönüşümler bilinçli olarak fonksiyon biçiminde yazılmıştır
    (useTransform(() => ...)). Giriş/çıkış aralığı verilen biçimi Motion
    WAAPI keyframe animasyonuna çevirebiliyor; o yol bu kurulumda
    kaydırmaya değil zamana bağlı çalışıp opaklığı kendi başına
    oynatıyordu. Fonksiyon biçimi keyframe'e çevrilemediğinden değer her
    zaman kaydırma ilerlemesinden okunur.

    Mobilde yapışkanlık ve çapraz geçiş kapanır. DOM sırası zaten
    "görsel, blok, görsel, blok..." olduğu için düzen tek sütuna
    düştüğünde metin ve görsel doğal biçimde sırayla okunur; ikinci bir
    görsel kümesi basılmaz.

    Azaltılmış hareket tercihi CSS tarafında ele alınır (globals.css):
    üç fotoğraf da tam opaklıkta kalır, ray dolu görünür ve hiçbir içerik
    gizlenmez. useReducedMotion sunucuda null, tarayıcıda true döndüğü
    için render çıktısını ona göre dallandırmak hidrasyon uyuşmazlığı
    üretiyordu. */

export type ApproachItem = {
  title: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

/** İkinci ve üçüncü fotoğrafın üstteki katman olarak açıldığı kaydırma
    eşikleri. Birinci fotoğraf zemin katmanıdır, eşiği yoktur. */
const THRESHOLDS: [number, number][] = [
  [0, 0],
  [0.3, 0.42],
  [0.62, 0.74],
];

/** from ile to arasında 0'dan 1'e giden, dışında kırpılan doğrusal rampa. */
function ramp(value: number, from: number, to: number) {
  if (value <= from) return 0;
  if (value >= to) return 1;
  return (value - from) / (to - from);
}

function StageFigure({
  item,
  index,
  progress,
}: {
  item: ApproachItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const [from, to] = THRESHOLDS[index];
  const opacity = useTransform(() =>
    index === 0 ? 1 : ramp(progress.get(), from, to),
  );

  return (
    <motion.figure className="approach__figure" style={{ opacity }}>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1288px) 640px, (min-width: 920px) 53vw, calc(100vw - 36px)"
        quality={90}
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
      />
    </motion.figure>
  );
}

export function ApproachStage({ items }: { items: ApproachItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Metin sütununun kenarındaki ince ilerleme çizgisi: bölümün neresinde
  // olunduğunu gösterir.
  const railScale = useTransform(() => scrollYProgress.get());

  return (
    <div className="approach__grid" ref={ref}>
      <motion.span
        className="approach__rail"
        aria-hidden="true"
        style={{ scaleY: railScale }}
      />

      {items.map((item, index) => (
        <Fragment key={item.title}>
          <StageFigure
            item={item}
            index={index}
            progress={scrollYProgress}
          />

          <motion.div
            className="approach__block"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="approach__title">{item.title}</h3>
            <p className="approach__body">{item.body}</p>
          </motion.div>
        </Fragment>
      ))}
    </div>
  );
}
