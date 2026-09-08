import Image from "next/image";

import { SiteLink } from "@/components/site-link";
import { navItems, brandHref, type SiteContext } from "@/components/site-navigation";
import { instagramHref } from "@/data/site";

type Props = {
  context: SiteContext;
  /** "Yukarı dön" bağlantısının hedefi; her sayfanın kendi tepesi. */
  topHref: string;
};

/** Ana sayfadaki footer bileşeninin kendisi; klinik arka planı, koyu teal
    iç paneli, logosu, menüsü ve telif satırı değişmeden paylaşılır. */
export function SiteFooter({ context, topHref }: Props) {
  const links = navItems;

  return (
    <footer className="site-footer">
      <div className="section-shell footer__inner">
        <div className="footer__top">
          <div className="footer__identity">
            <SiteLink
              className="footer__brand"
              href={brandHref(context)}
              aria-label="Esteelitta ana sayfa"
            >
              <Image
                src="/brand/esteelitta-logo.png"
                alt="Esteelitta"
                width={1841}
                height={1247}
                sizes="(min-width: 650px) 250px, 196px"
              />
            </SiteLink>
            <p className="footer__tagline">
              Güzelliğe sakin, güvenli ve kişisel bir dokunuş.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Alt menü">
            <SiteLink href="/hizmetler">Hizmetler</SiteLink>
            <SiteLink href={links[0].href}>Hakkımızda</SiteLink>
            <SiteLink href={links[2].href}>İletişim</SiteLink>
            <a
              className="footer__instagram"
              href={instagramHref}
              aria-label="Esteelitta Instagram hesabı (yeni sekmede açılır)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <rect x="5" y="5" width="22" height="22" rx="6" />
                <circle cx="16" cy="16" r="5.6" />
                <path d="M22 10h.01" />
              </svg>
            </a>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Esteelitta. Tüm hakları saklıdır.</p>
          <SiteLink href={topHref}>
            Yukarı dön <span aria-hidden="true">↑</span>
          </SiteLink>
        </div>
      </div>
    </footer>
  );
}
