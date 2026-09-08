"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Stilla'nın masaüstü kaydırma hissi: tekerlek hareketi yumuşatılır,
    dokunmatik kaydırma tarayıcının kendi davranışında bırakılır.

    Kritik kural syncTouch: false — iPhone ve diğer dokunmatik cihazlarda
    parmakla kaydırma doğal tarayıcı kaydırması olarak kalır, Lenis araya
    girmez. Kaba işaretçili (dokunmatik) cihazlarda Lenis hiç başlatılmaz;
    prefers-reduced-motion: reduce açıkken de devre dışı kalır.

    RAF döngüsü Lenis'in kendi zaman tabanıyla sürülür ve unmount'ta hem
    döngü hem de örnek temizlenir. Hiçbir React state'i her karede
    güncellenmez. */
export function SmoothScroll() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      // Zaten çalışıyorsa ikinci bir örnek açılmaz.
      if (lenis) return;

      lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        // Sayfa içi çıpalar ve "Yukarı dön" bağlantısı Lenis üzerinden
        // yürür; aksi hâlde yerel atlama ile yumuşatma çakışır.
        anchors: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const sync = () => {
      // Yumuşatma yalnızca ince işaretçili (fare/trackpad) cihazlarda ve
      // azaltılmış hareket kapalıyken çalışır.
      if (pointerQuery.matches && !motionQuery.matches) start();
      else stop();
    };

    sync();
    motionQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);

    return () => {
      motionQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
