"use client";

import { useState } from "react";

/** About Us bloğunun altındaki yatay şerit.

    Referansta bu banda sonsuz kayan bir logo duvarı oturur. Esteelitta'nın
    iş ortağı logosu yok ve sahte marka üretmek yasak; bant aynı yerde,
    aynı hareketle kalır ama içeriği gerçek hizmet adlarıdır.

    Hareket tamamen CSS animasyonudur (transform): sayfa meşgulken bile
    ana iş parçacığı dışında akar, kaydırma dinleyicisi gerektirmez. Şerit
    iki kez basılır; ilk kopya ekran okuyucuya okunur, ikinci kopya
    aria-hidden ile yalnızca döngüyü dikişsiz kapatmak için vardır.

    Duraklatma denetimi referansta yok; erişilebilirlik gereği eklendi.
    Beş saniyeden uzun süren otomatik hareket WCAG 2.2.2 gereği
    duraklatılabilmelidir. Duraklatma yalnızca bir data niteliği
    değiştirir, animasyonu CSS durdurur — her karede React state'i
    güncellenmez.

    prefers-reduced-motion açıkken animasyon hiç başlamaz ve şerit tam
    okunur biçimde kalır (bkz. globals.css). */

function Track({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <span className="pv-marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span className="pv-marquee__item" key={item}>
          {item}
          <span className="pv-marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </span>
  );
}

export function BrandMarquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="pv-marquee" data-paused={paused || undefined}>
      <div className="pv-marquee__viewport">
        <Track items={items} />
        <Track items={items} hidden />
      </div>

      <button
        className="pv-marquee__toggle"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Hizmet şeridini oynat" : "Hizmet şeridini duraklat"}
        aria-pressed={paused}
      >
        {paused ? (
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3.6 2.1v9.8a1 1 0 0 0 1.53.85l7.7-4.9a1 1 0 0 0 0-1.7l-7.7-4.9A1 1 0 0 0 3.6 2.1Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2" y="1.6" width="3.4" height="10.8" rx="1.1" />
            <rect x="8.6" y="1.6" width="3.4" height="10.8" rx="1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}
