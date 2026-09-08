"use client";

import { motion, useReducedMotion } from "motion/react";

/** Sayfa açılışında hero içerikleri sırayla yerine oturur.

    Stilla'nın giriş hareketiyle aynı yapı: yalnızca opacity ve transform,
    yay tabanlı bir yerleşme ve etiket → başlık → açıklama sırasında artan
    gecikme. Sayfanın tamamı client component'e çevrilmez; yalnızca bu
    küçük parça tarayıcıda çalışır.

    prefers-reduced-motion: reduce açıkken hiçbir öğe gizlenmez, içerik
    doğrudan son konumunda gösterilir. */

const SPRING = {
  type: "spring",
  stiffness: 205,
  damping: 60,
  mass: 1,
} as const;

const DELAYS = { kicker: 0.2, title: 0.4, lead: 0.6 } as const;

export function ContactHero() {
  const reduceMotion = useReducedMotion();

  // Azaltılmış hareket açıkken içerik doğrudan son konumunda görünür.
  // initial ve animate her iki durumda da verilir; yalnızca geçiş kalkar.
  // Aksi hâlde sunucuda basılan initial değeri yerinde kalır ve içerik
  // görünmez olur.
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { ...SPRING, delay },
  });

  return (
    <div className="iletisim-hero__inner section-shell">
      <motion.p className="iletisim-hero__kicker" {...enter(DELAYS.kicker)}>
        <span className="iletisim-hero__dot" aria-hidden="true" />
        İletişim
      </motion.p>

      <motion.h1 className="iletisim-hero__title" {...enter(DELAYS.title)}>
        Size yardımcı olmak
        <br />
        için <em>buradayız.</em>
      </motion.h1>

      <motion.p className="iletisim-hero__lead" {...enter(DELAYS.lead)}>
        Sorularınız, randevu planınız veya yol tarifi için size en uygun
        iletişim kanalını seçin.
      </motion.p>
    </div>
  );
}
