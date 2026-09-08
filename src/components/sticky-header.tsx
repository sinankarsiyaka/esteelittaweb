"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/** Aşağı kaydırırken gizlenen, yukarı kaydırırken geri gelen header.

    Stilla'nın iletişim sayfasındaki header ölçüldüğünde gizli konumu
    y: -120, opacity: 0 olarak okundu; aynı değerler burada yön duyarlı
    biçimde uygulanır. Yalnızca bu bileşeni saran sayfa (/iletisim)
    etkilenir; ana sayfa ve /hizmetler SiteHeader'ı doğrudan kullanmayı
    sürdürür.

    Kaydırma dinleyicisi hiçbir React state'i güncellemez: hedef değer bir
    motion value'ya yazılır, ara kareleri Motion'ın spring'i üretir.
    Opaklık ayrı bir animasyon değil, konumdan türetilir. */

const HIDDEN_Y = -120;
/** Küçük titremelerde açılıp kapanmayı önleyen yön eşiği. */
const DIRECTION_THRESHOLD = 8;
/** Bu mesafenin üstüne çıkılmadan header hiç gizlenmez. */
const REVEAL_ZONE = 96;

const SPRING = { stiffness: 300, damping: 40, mass: 1 } as const;

export function StickyHeader({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(0);
  const y = useSpring(target, SPRING);
  const opacity = useTransform(y, [HIDDEN_Y, HIDDEN_Y * 0.4, 0], [0, 0.55, 1]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      target.set(0);
      return;
    }

    // Mobil menü açıkken header gizlenmemeli. Menü kendi state'ini tutar;
    // buradan yalnızca aria-expanded işareti izlenir, böylece MobileMenu
    // değiştirilmeden davranış paylaşılır.
    const root = rootRef.current;
    let menuOpen = false;
    let last = window.scrollY;
    let hidden = false;
    let ticking = false;

    const readMenu = () => {
      menuOpen = Boolean(root?.querySelector('[aria-expanded="true"]'));
      if (menuOpen) {
        hidden = false;
        target.set(0);
      }
    };

    const observer = new MutationObserver(readMenu);
    if (root) {
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["aria-expanded"],
        subtree: true,
      });
    }

    readMenu();

    const update = () => {
      ticking = false;
      const current = window.scrollY;
      const delta = current - last;

      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      last = current;

      // Sayfanın ilk konumunda ve mobil menü açıkken header görünür kalır.
      const next = !menuOpen && current > REVEAL_ZONE && delta > 0;
      if (next === hidden) return;

      hidden = next;
      target.set(hidden ? HIDDEN_Y : 0);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [reduceMotion, target]);

  return (
    <motion.div ref={rootRef} className="sticky-header" style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
