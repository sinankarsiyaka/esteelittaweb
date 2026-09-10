import type Lenis from "lenis";

/** Çalışan Lenis örneğinin tek kayıt noktası.

    Mobil menü açıkken arka sayfanın kaymaması gerekir. `overflow: hidden`
    yalnızca kullanıcı kaydırmasını durdurur; Lenis ise `window.scrollTo`
    ile programatik kaydırma yaptığı için ayrıca durdurulmalıdır. Dar
    pencereye küçültülmüş masaüstü tarayıcıda (ince işaretçi) Lenis
    çalıştığından bu durum gerçekten oluşur. */

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
