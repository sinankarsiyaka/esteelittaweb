"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Mekân bölümünün iki fotoğrafı.

    İki görsel farklı hızlarda kayar: geniş olan yavaş yukarı, küçük
    olan biraz daha hızlı aşağı. Amaç gösteriş değil derinlik; iki
    düzlem arasında ölçülü bir aralık açılınca kompozisyon durağan bir
    kolaj olmaktan çıkıp mekân hissi veriyor.

    Kayma yalnızca transform üzerinde ve yalnızca birkaç düzine piksel.
    Görsellerin kendi kutuları yerinde durduğu için düzen kaymaz, yatay
    taşma oluşmaz.

    Mobilde ve azaltılmış hareket tercihinde kayma CSS tarafında
    nötrlenir (globals.css). Render çıktısı her iki durumda da aynıdır;
    useReducedMotion sunucuda null döndüğü için ona göre dallanmak
    hidrasyon uyuşmazlığı üretiyordu. */

export function SpaceDuet() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wideY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const tallY = useTransform(scrollYProgress, [0, 1], [-34, 34]);

  return (
    <div className="mekan__duet" ref={ref}>
      <motion.figure
        className="mekan__wide"
        style={{ y: wideY }}
      >
        <Image
          src="/media/hakkimizda-gorseller-v1/02-resepsiyon-temsili.png"
          alt="Esteelitta karşılama alanının temsili görünümü: açık renkli tezgâh, yeşil bitkiler ve yumuşak gün ışığı."
          width={1448}
          height={1086}
          sizes="(min-width: 1288px) 730px, (min-width: 920px) 59vw, calc(100vw - 36px)"
          quality={90}
        />
      </motion.figure>

      <motion.figure
        className="mekan__tall"
        style={{ y: tallY }}
      >
        <Image
          src="/media/hakkimizda-gorseller-v1/03-bakim-odasi-temsili.png"
          alt="Bakım odasının temsili görünümü: yuvarlak ışıklı ayna, beyaz dolaplar ve tek bir bakım koltuğu."
          width={1448}
          height={1086}
          sizes="(min-width: 1288px) 490px, (min-width: 920px) 39vw, calc(100vw - 36px)"
          quality={90}
        />
      </motion.figure>
    </div>
  );
}
