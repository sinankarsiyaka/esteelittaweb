import Image from "next/image";

import { MobileMenu } from "@/components/mobile-menu";
import { SiteLink } from "@/components/site-link";
import {
  appointmentHref,
  brandHref,
  navItems,
  type NavId,
  type SiteContext,
} from "@/components/site-navigation";

type Props = {
  context: SiteContext;
  /** Bulunulan sayfaya karşılık gelen menü öğesi. */
  active?: NavId;
};

/** Ana sayfa ve alt sayfalar aynı header'ı kullanır. Tasarım ve ölçüler
    ana sayfadaki hâliyle aynıdır; yalnızca bağlantı hedefleri ve aktif
    öğe işareti bağlama göre değişir. */
export function SiteHeader({ context, active }: Props) {
  const links = navItems;
  const randevu = appointmentHref;

  return (
    <header className="site-header">
      <SiteLink
        className="brand"
        href={brandHref(context)}
        aria-label="Esteelitta ana sayfa"
      >
        <Image
          src="/brand/esteelitta-logo.png"
          alt="Esteelitta"
          width={1841}
          height={1247}
          sizes="(max-width: 649px) 145px, (max-width: 919px) 162px, 184px"
          priority
        />
      </SiteLink>

      <nav className="desktop-nav" aria-label="Ana menü">
        {links.map((link) => (
          <SiteLink
            key={link.id}
            href={link.href}
            aria-current={link.id === active ? "page" : undefined}
          >
            {link.label}
          </SiteLink>
        ))}
      </nav>

      <SiteLink className="button button--compact" href={randevu}>
        Randevu Al
      </SiteLink>

      <MobileMenu links={links} appointmentHref={randevu} active={active} />
    </header>
  );
}
