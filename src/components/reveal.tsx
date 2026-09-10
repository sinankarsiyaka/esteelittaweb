"use client";

import { useInView } from "motion/react";
import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";

/** Bölüm içerikleri görünüm alanına girerken sakin biçimde yerlerine oturur.
    Görünürlük motion/react'in useInView'ı ile ölçülür; hareketin kendisi
    globals.css'teki CSS geçişidir. Böylece kaydırma sırasında hiçbir React
    state'i her karede güncellenmez, hareket transform/opacity üzerinde
    kalır ve mesafe/süre medya sorgularıyla (mobilde daha kısa) ayarlanır.

    once verilmediğinde durum iki yönlüdür: görünüm alanından çıkan içerik
    yeniden gizlenir. Bu davranış sistemin motion kuralıyla çelişiyordu
    ("görünür olan içerik bir daha gizlenmez"), çünkü .reveal opacity: 0 ile
    başlar ve /hizmetler galerisinde ayrıca clip-path maskesi taşır: sekiz
    hizmet görseli yukarı kaydırılıp geri dönüldüğünde tamamen kayboluyordu.

    Varsayılan bilinçli olarak değiştirilmedi; bunun yerine mevcut bütün
    çağrı noktaları açıkça `once` veriyor. Böylece davranış her kullanım
    yerinde okunur kalır ve ileride gerçekten iki yönlü bir hareket
    gerekirse bu bileşen hâlâ onu sunabilir. */
const VIEWPORT = { amount: 0.16, margin: "0px 0px -6% 0px" } as const;
/** Büyük giriş hareketleri geri kaydırınca yeniden oynamamalıdır. */
const VIEWPORT_ONCE = { ...VIEWPORT, once: true } as const;

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Aynı anda giren kardeşler için kademe (yaklaşık 75 ms adım). */
  order?: number;
  /** Bir kez oynayıp yerinde kalsın: ana sayfadaki büyük panel ve tuval
      açılışları için. Verilmezse davranış eskisi gibi iki yönlüdür. */
  once?: boolean;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  as = "div",
  order = 0,
  once = false,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, once ? VIEWPORT_ONCE : VIEWPORT);
  const setNode = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  const classNames = `reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`;
  const mergedStyle =
    order > 0
      ? ({ "--reveal-delay": `${order * 75}ms`, ...style } as CSSProperties)
      : style;

  if (as === "li") {
    return (
      <li ref={setNode} className={classNames} style={mergedStyle}>
        {children}
      </li>
    );
  }

  return (
    <div ref={setNode} className={classNames} style={mergedStyle}>
      {children}
    </div>
  );
}
