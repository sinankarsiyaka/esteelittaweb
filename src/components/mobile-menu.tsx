"use client";

import { useEffect, useId, useRef, useState } from "react";

const links = [
  ["#hakkimizda", "Hakkımızda"],
  ["#hizmetler", "Hizmetler"],
  ["#galeri", "Galeri"],
  ["#iletisim", "İletişim"],
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div className="mobile-menu" ref={rootRef}>
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

      {/* Panel akıştan çıkarılmıştır: açılması arkadaki sayfayı kaydırmaz. */}
      <div className="mobile-menu__panel" id={panelId} hidden={!open}>
        <nav aria-label="Mobil menü">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button" href="#iletisim" onClick={() => setOpen(false)}>
          Randevu Al
        </a>
      </div>
    </div>
  );
}
