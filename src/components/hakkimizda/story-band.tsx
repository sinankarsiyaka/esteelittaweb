"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Geniş görsel bandı: alttan yukarı açılan perde ve ölçülü parallax.

    İki ayrı hareket taşır ve ikisi de amaçlıdır:

    1. Açılış maskesi. Bant alt kenarından yukarı doğru açılır. Künyenin
       altındaki görselin perde gibi açılması, okuma sırasını yukarıdan
       aşağı kurar. Bir kez oynar.
    2. Ölçülü parallax. Kaydırma boyunca yalnızca maskenin içindeki
       görsel dikeyde birkaç yüzde kayar. Bandın kendi kutusu yerinde
       durduğu için düzen hiç oynamaz.

    Maske, sitenin başka yerlerinde de kullanılan yöntemle çalışır:
    görünürlüğü motion/react'in useInView'ı ölçer, geçişi CSS yapar
    (globals.css).

    Kırpma bilinçli olarak ayrı bir iç katmana uygulanır. Gözlenen
    elemanın kendisi kırpılırsa görünür alanı sıfır olur;
    IntersectionObserver de onu hiçbir zaman görünür saymaz ve maske
    asla açılmaz. Dıştaki kutu kırpılmadan durur, maske içeride
    animasyonlanır.

    Kaydırma değeri motion value olarak okunur; hiçbir React state'i kare
    başına güncellenmez. useInView tek seferlik olduğu için de kaydırma
    sırasında yeniden render tetiklenmez. */

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  /** Kenardan kenara kullanım gibi ölçü farkları için ek sınıf. */
  className?: string;
};

export function StoryBand({
  src,
  alt,
  width,
  height,
  priority,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Görsel maskeden biraz büyük tutulur; kayma sırasında kenarda boşluk
  // açılmaz. Aralık kasıtlı olarak dar: hareket fark edilir ama dikkat
  // dağıtmaz.
  const y = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);

  return (
    <div
      ref={ref}
      className={`story-band${isOpen ? " is-open" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="story-band__mask">
        <motion.div className="story-band__inner" style={{ y }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={
              className
                ? "100vw"
                : "(min-width: 1288px) 1240px, calc(100vw - 36px)"
            }
            quality={90}
            priority={priority}
          />
        </motion.div>
      </div>
    </div>
  );
}
