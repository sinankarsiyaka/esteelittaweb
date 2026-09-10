"use client";

import { motion, useReducedMotion } from "motion/react";

/** Sayfa açılışında kicker ve açıklama sırayla yerine oturur.

    Stilla'nın giriş hareketiyle aynı yapı: yalnızca opacity ve transform,
    yay tabanlı bir yerleşme ve kicker → açıklama sırasında artan gecikme.
    Başlık (h1) sayfanın LCP adayıdır; statiktir ve ilk boyamada doğrudan
    görünür, hiçbir giriş hareketi taşımaz. Sayfanın tamamı client
    component'e çevrilmez; yalnızca bu küçük parça tarayıcıda çalışır.

    prefers-reduced-motion: reduce açıkken kicker ve açıklama da gizlenmez,
    doğrudan son konumunda gösterilir. */

const SPRING = {
  type: "spring",
  stiffness: 205,
  damping: 60,
  mass: 1,
} as const;

const DELAYS = { kicker: 0.2, lead: 0.6 } as const;

export function ContactHero() {
  const reduceMotion = useReducedMotion();

  // Azaltılmış hareket açıkken kicker ve açıklama doğrudan son konumunda
  // görünür: yalnızca geçiş kalkar (duration 0), initial ve animate her
  // iki durumda da aynı verilir.
  //
  // initial'ı reduceMotion'a göre dallandırmak hidrasyon uyuşmazlığı
  // üretiyordu: useReducedMotion sunucuda null döner, bu yüzden sunucu
  // opacity:0/translateY(60px) basar; tarayıcı tercihi açık olan
  // kullanıcıda ise initial={false} ile hiç stil basılmaz ve React iki
  // çıktıyı eşleştiremez. İçerik CSS'teki reduced-motion bloğu
  // (opacity:1 !important) sayesinde gizli kalmıyordu ama konsola
  // hidrasyon hatası düşüyordu. Dallanma kaldırıldı; görünürlüğü yine
  // CSS garanti eder.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { ...SPRING, delay },
  });

  return (
    <div className="iletisim-hero__inner section-shell">
      <motion.p className="iletisim-hero__kicker" {...enter(DELAYS.kicker)}>
        <span className="iletisim-hero__dot" aria-hidden="true" />
        İletişim
      </motion.p>

      {/* Sayfanın LCP adayı: sunucu çıktısında doğrudan görünür render
          edilir, gecikmeli giriş hareketi taşımaz. Kicker ve açıklama
          hâlâ hafif bir giriş hareketiyle geliyor; yalnızca bu başlık
          animasyonun beklemesine bağlı kalmasın diye statik bırakıldı. */}
      <h1 className="iletisim-hero__title">
        Size yardımcı olmak
        <br />
        için <em>buradayız.</em>
      </h1>

      <motion.p className="iletisim-hero__lead" {...enter(DELAYS.lead)}>
        Sorularınız, randevu planınız veya yol tarifi için size en uygun
        iletişim kanalını seçin.
      </motion.p>
    </div>
  );
}
