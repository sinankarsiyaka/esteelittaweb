"use client";

import { useInView } from "motion/react";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/** Ana sayfanın tek giriş hareketi.

    Referansta ölçülen davranış birebir budur: öğe `opacity: 0` ve
    `translateY(40px)` (bölüm blokları) ya da `translateY(20px)` (blok
    içindeki metin) ile başlar, görünüm alanına girince yerine oturur ve
    bir daha oynamaz. Referansta bunun dışında parallax, ölçek değişimi ya
    da yatay sürüklenme yok; burada da yok.

    Görünürlüğü motion/react'in useInView'ı (IntersectionObserver) ölçer;
    hareketin kendisi globals.css'teki CSS geçişidir. Böylece kaydırma
    sırasında hiçbir React state'i her karede güncellenmez ve hareket
    yalnızca transform + opacity üzerinde kalır.

    Ortak `Reveal` bileşeni /hizmetler, /hakkimizda ve footer tarafından
    da kullanıldığı için ona dokunulmadı; bu bileşen yalnızca ana
    sayfanındır.

    prefers-reduced-motion açıkken geçiş kapanır ve içerik son hâlinde
    görünür (bkz. globals.css). */

const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" } as const;

type Props = {
  children: ReactNode;
  /** "block" 40px, "text" 20px yol alır. Referanstaki iki kademe. */
  distance?: "block" | "text";
  /** Kardeşler arası kademe adımı (80 ms). */
  order?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export function PvReveal({
  children,
  distance = "block",
  order = 0,
  as: Tag = "div",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT);

  const classNames = `pv-reveal pv-reveal--${distance}${inView ? " is-in" : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <Tag
      ref={ref}
      className={classNames}
      style={
        order > 0
          ? ({ "--pv-delay": `${order * 80}ms`, ...style } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
