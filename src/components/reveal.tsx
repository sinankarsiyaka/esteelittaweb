"use client";

import { useInView } from "motion/react";
import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";

/** Bölüm içerikleri görünüm alanına girerken sakin biçimde yerlerine oturur.
    Görünürlük motion/react'in useInView'ı ile ölçülür; hareketin kendisi
    globals.css'teki CSS geçişidir. Böylece kaydırma sırasında hiçbir React
    state'i her karede güncellenmez, hareket transform/opacity üzerinde
    kalır ve mesafe/süre medya sorgularıyla (mobilde daha kısa) ayarlanır.

    once verilmediği için durum iki yönlü çalışır: yukarı kaydırıp geri
    inildiğinde içerik yeniden yerine oturur. */
const VIEWPORT = { amount: 0.16, margin: "0px 0px -6% 0px" } as const;

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Aynı anda giren kardeşler için kademe (yaklaşık 75 ms adım). */
  order?: number;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  as = "div",
  order = 0,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);
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
