"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { getLenis } from "@/components/lenis-store";
import { SiteLink } from "@/components/site-link";
import {
  appointmentHref,
  brandHref,
  navItems,
  type NavId,
} from "@/components/site-navigation";
import { contactPhoneHref } from "@/data/site";

/** Bütün sayfaların paylaştığı tek header.

    Kompozisyon Vantara referansından ölçülerek alındı: sayfanın üstünde
    yüzen, scroll boyunca yerinde kalan tek parça kapsül. 1280 px'te
    referans 10 px üst boşluk, 40 px yan boşluk, 1200×66 px kapsül ve
    80 px radius kullanıyor; aynı formül burada Esteelitta jetonlarıyla
    (porselen yüzey, petrol yazı, turkuaz sınır) kurulur.

    Kapsül `position: fixed` olduğu için akıştan çıkar. Sayfalar onun
    yerine <HeaderSlot /> yerleştirir; slot yükseklikleri header'ın
    önceki satır yüksekliğiyle aynıdır, böylece hero yerinden oynamaz.

    Mobilde aynı kapsül büyüyerek panele dönüşür: yeni bir kutu açılmaz,
    kapalı yüzeyin kendisi uzar. Büyüme CSS ile (grid-template-rows
    0fr → 1fr) yapılır; kesilebilir, ölçüm gerektirmez ve blur değerini
    animate etmez. */

/** Rota → aktif menü öğesi. Header layout'ta durduğu için aktif durum
    sayfadan prop olarak değil, adresten okunur. */
function activeFromPath(pathname: string): NavId | undefined {
  const match = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.id;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const active = activeFromPath(pathname);
  const isHome = pathname === "/";

  // Randevu akışı henüz kurulmadığı için ana sayfada "Randevu Al" şimdilik
  // doğrudan arama başlatır; hiçbir rotaya gitmez. Diğer sayfalarda
  // /iletisim'e giden eski davranış korunur.
  const randevuHref = isHome ? contactPhoneHref : appointmentHref;

  const [open, setOpen] = useState(false);
  const panelId = useId();
  const capsuleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Rota değişince panel kapanır; tarayıcının geri/ileri düğmesiyle
  // gezinildiğinde de açık takılmaz. Efekt yerine render sırasında
  // düzeltilir: fazladan bir tur render tetiklenmez.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    if (open) setOpen(false);
  }

  // Menü yalnızca mobil ölçüde vardır; pencere masaüstüne genişletilirse
  // açık kalan panel kilidi bırakmadan yok olmasın.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 920px)");
    const sync = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const capsule = capsuleRef.current;

    // Arka sayfa kaymaz. Kaydırma çubuğu genişliği telafi edilir, aksi
    // hâlde kilit anında sayfa yatayda sıçrar (layout shift).
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPad = document.body.style.paddingRight;
    root.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    // Lenis programatik kaydırır; overflow kilidi onu durdurmaz.
    const lenis = getLenis();
    lenis?.stop();

    // Panel görsel olarak sayfanın tamamını kaplayabilir ama arkadaki
    // <main>, footer ve (varsa) skip-link Tab dışı yollarla (ekran
    // okuyucunun sanal imleci gibi) hâlâ erişilebilir kalırdı. Native
    // `inert` her ikisini de (odak sırası + erişilebilirlik ağacı) tek
    // seferde kapatır; ayrı bir aria-hidden katmanına gerek yok.
    // Header ve kapsül bu listenin dışındadır.
    const inertTargets = [
      document.querySelector("main"),
      document.querySelector(".site-footer"),
      document.querySelector(".skip-link"),
    ].filter((node): node is HTMLElement => node !== null);
    const prevInert = inertTargets.map((node) => node.hasAttribute("inert"));
    inertTargets.forEach((node) => node.setAttribute("inert", ""));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== "Tab" || !capsule) return;

      // Panel tam ekranı kaplayabildiği için odak kapsülün içinde tutulur.
      const items = [
        ...capsule.querySelectorAll<HTMLElement>(FOCUSABLE),
      ].filter(
        (item) => item.offsetParent !== null || item === buttonRef.current,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (!capsule.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (capsule?.contains(event.target as Node)) return;
      close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      root.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      lenis?.start();
      // Açılıştan önceki inert durumu geri yüklenir (normalde hiçbiri
      // inert değildi, ama başka bir kaynaktan gelmiş olabilecek bir
      // durumu ezmemek için kaydedilen değer geri yazılır).
      inertTargets.forEach((node, index) => {
        if (prevInert[index]) node.setAttribute("inert", "");
        else node.removeAttribute("inert");
      });
    };
  }, [open, close]);

  return (
    <>
      {/* Ana sayfada "ana içeriğe geç" bağlantısı header'ın önünde durur:
          klavye kullanıcısı logoyu, menüyü ve randevu düğmesini tek
          adımda geçer. Header artık layout'ta olduğu için bu bağlantı da
          onunla birlikte taşındı; hedefi değişmedi. */}
      {isHome ? (
        <a className="skip-link" href="#hakkimizda">
          Ana içeriğe geç
        </a>
      ) : null}

      <header className="site-header">
        <div
          className="site-header__capsule"
          data-open={open ? "true" : "false"}
          ref={capsuleRef}
        >
          <div className="site-header__bar">
            <SiteLink
              className="brand"
              href={brandHref(isHome ? "home" : "page")}
              aria-label="Esteelitta ana sayfa"
            >
              <Image
                src="/brand/esteelitta-logo.png"
                alt="Esteelitta"
                width={1841}
                height={1247}
                sizes="(max-width: 649px) 68px, (max-width: 919px) 77px, 80px"
                priority
              />
            </SiteLink>

            <nav className="desktop-nav" aria-label="Ana menü">
              {navItems.map((link) => (
                <SiteLink
                  key={link.id}
                  href={link.href}
                  aria-current={link.id === active ? "page" : undefined}
                >
                  {link.label}
                </SiteLink>
              ))}
            </nav>

            {isHome ? (
              <a className="button button--compact" href={randevuHref}>
                Randevu Al
              </a>
            ) : (
              <SiteLink className="button button--compact" href={randevuHref}>
                Randevu Al
              </SiteLink>
            )}

            <button
              className="menu-link"
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              Menü
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                <path
                  d="M1 1l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Kapalıyken satır yüksekliği 0fr'dir; içerik hem görsel olarak
            hem de odak sırasından (inert) çıkar. */}
          <div className="site-header__drawer" id={panelId} inert={!open}>
            <div className="site-header__drawer-inner">
              <nav className="mobile-nav" aria-label="Mobil menü">
                {navItems.map((link) => (
                  <SiteLink
                    key={link.id}
                    href={link.href}
                    aria-current={link.id === active ? "page" : undefined}
                    onClick={() => close()}
                  >
                    {link.label}
                  </SiteLink>
                ))}
              </nav>

              {isHome ? (
                <a
                  className="button"
                  href={randevuHref}
                  onClick={() => close()}
                >
                  Randevu Al
                </a>
              ) : (
                <SiteLink
                  className="button"
                  href={randevuHref}
                  onClick={() => close()}
                >
                  Randevu Al
                </SiteLink>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
