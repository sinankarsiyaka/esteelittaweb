/** Header, mobil menü ve footer aynı bağlantı listesini buradan alır.
    Ana sayfada Hakkımızda sayfa içi çıpa olarak kalır (mevcut yumuşak
    kaydırma davranışı korunur); alt sayfalarda ana sayfaya döner.
    İletişim artık kendi sayfasıdır ve her bağlamda /iletisim'e gider. */

export type SiteContext = "home" | "page";

export type NavId = "hakkimizda" | "hizmetler" | "iletisim";

export type NavItem = { id: NavId; href: string; label: string };

export function navItems(context: SiteContext): NavItem[] {
  const home = context === "home" ? "" : "/";
  return [
    { id: "hakkimizda", href: `${home}#hakkimizda`, label: "Hakkımızda" },
    { id: "hizmetler", href: "/hizmetler", label: "Hizmetler" },
    { id: "iletisim", href: "/iletisim", label: "İletişim" },
  ];
}

export function brandHref(context: SiteContext) {
  return context === "home" ? "#anasayfa" : "/";
}

/** Randevu düğmesi her sayfada iletişim sayfasına götürür. */
export const appointmentHref = "/iletisim";
