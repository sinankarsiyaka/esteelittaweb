/** Header, mobil menü ve footer aynı bağlantı listesini buradan alır.
    Hakkımızda ve İletişim artık kendi sayfalarıdır; her bağlamda kendi
    rotalarına gider. Ana sayfadaki #hakkimizda ve #iletisim bölümleri
    yerinde durmayı sürdürür, yalnızca menüden hedeflenmezler. */

export type SiteContext = "home" | "page";

export type NavId = "hakkimizda" | "hizmetler" | "iletisim";

export type NavItem = { id: NavId; href: string; label: string };

export const navItems: NavItem[] = [
  { id: "hakkimizda", href: "/hakkimizda", label: "Hakkımızda" },
  { id: "hizmetler", href: "/hizmetler", label: "Hizmetler" },
  { id: "iletisim", href: "/iletisim", label: "İletişim" },
];

export function brandHref(context: SiteContext) {
  return context === "home" ? "#anasayfa" : "/";
}

/** Randevu düğmesi her sayfada iletişim sayfasına götürür. */
export const appointmentHref = "/iletisim";
