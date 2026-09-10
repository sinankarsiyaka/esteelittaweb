import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SiteLink } from "@/components/site-link";
import {
  appointmentHref,
  brandHref,
  navItems,
  type SiteContext,
} from "@/components/site-navigation";
import {
  contactAddress,
  contactAddressLines,
  contactEmail,
  contactEmailHref,
  contactPhone,
  contactPhoneHref,
  instagramHref,
  mapsHref,
} from "@/data/site";

type Props = {
  context: SiteContext;
  /** "Yukarı dön" bağlantısının hedefi; her sayfanın kendi tepesi. */
  topHref: string;
};

/** Dışa açılan bağlantıların ucundaki köşegen ok. /iletisim sayfasındaki
    ok ile aynı çizim; hover'da yönüne doğru birkaç piksel kayar. */
function ArrowOut() {
  return (
    <svg className="footer__arrow" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M4 10 10 4M5.4 4H10v4.6" />
    </svg>
  );
}

/** Etiket + turkuaz nokta: sitenin bölüm etiketleriyle aynı dil, footer
    ölçeğinde küçültülmüş hâli. */
function GroupLabel({ children }: { children: string }) {
  return <p className="footer__label">{children}</p>;
}

/** Tüm sayfaların paylaştığı kapanış bölümü.

    Kompozisyon iki katmandır: solda marka (logo, marka cümlesi, randevu
    eylemi), sağda iki bilgi kümesi (sayfalar ve iletişim). Altta ince bir
    çizgiyle ayrılan telif satırı. Zemin sayfanın kendi porselen yüzeyidir;
    ayrı bir panel, fotoğraf ya da koyu blok yoktur — alttan yükselen sakin
    bir sis yıkaması hero'daki ışıkla aynı dili kurar.

    İletişim bilgileri burada ikinci kez yazılmaz; hepsi src/data/site.ts
    içindeki ortak sabitlerden gelir. */
export function SiteFooter({ context, topHref }: Props) {
  const homeHref = brandHref(context);
  const isHome = context === "home";

  // Header'daki "Randevu Al" mantığıyla aynı geçici kural: randevu akışı
  // kurulana kadar ana sayfada bu düğme doğrudan arama başlatır, hiçbir
  // rotaya gitmez. Diğer sayfalarda /iletisim'e giden eski davranış
  // korunur.
  const randevuHref = isHome ? contactPhoneHref : appointmentHref;

  return (
    <footer className="site-footer">
      <div className="section-shell footer__inner">
        <div className="footer__grid">
          <Reveal once className="footer__brand-block">
            <SiteLink
              className="footer__brand"
              href={homeHref}
              aria-label="Esteelitta ana sayfa"
            >
              <Image
                src="/brand/esteelitta-logo.png"
                alt="Esteelitta"
                width={1841}
                height={1247}
                sizes="(min-width: 920px) 176px, (min-width: 650px) 156px, 132px"
              />
            </SiteLink>

            <p className="footer__statement">
              Güzelliğe sakin, güvenli ve{" "}
              <em className="brand-emphasis">kişisel</em> bir dokunuş.
            </p>

            <div className="footer__actions">
              {isHome ? (
                <a className="button footer__cta" href={randevuHref}>
                  Randevu Al
                </a>
              ) : (
                <SiteLink className="button footer__cta" href={randevuHref}>
                  Randevu Al
                </SiteLink>
              )}
              <a
                className="footer__social"
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Esteelitta Instagram hesabı (yeni sekmede açılır)"
              >
                <svg
                  className="footer__social-mark"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <rect x="5" y="5" width="22" height="22" rx="6.5" />
                  <circle cx="16" cy="16" r="5.4" />
                  <path d="M22.2 9.8h.01" />
                </svg>
                <span>Instagram</span>
                <ArrowOut />
              </a>
            </div>
          </Reveal>

          <div className="footer__ledger">
            <Reveal once className="footer__group" order={1}>
              <nav aria-label="Alt menü">
                <GroupLabel>Sayfalar</GroupLabel>
                <ul className="footer__list footer__list--pages">
                  <li>
                    <SiteLink href={homeHref}>Ana Sayfa</SiteLink>
                  </li>
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <SiteLink href={item.href}>{item.label}</SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>

            <Reveal once className="footer__group" order={2}>
              <GroupLabel>Ulaşın</GroupLabel>
              <ul className="footer__list footer__list--contact">
                <li>
                  <a
                    href={contactPhoneHref}
                    aria-label={`Telefon: ${contactPhone}`}
                  >
                    {contactPhone}
                  </a>
                </li>
                <li>
                  <a
                    className="footer__email"
                    href={contactEmailHref}
                    aria-label={`E-posta: ${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </li>
              </ul>

              {/* Adres ve harita bağlantısı tek grup. Sarmalayıcı masaüstü ve
                  tablette display:contents ile saydamdır, yerleşimi
                  değiştirmez; yalnızca mobilde tek satıra alınır. */}
              <div className="footer__place">
                <address className="footer__address">
                  {contactAddressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>

                <a
                  className="footer__map"
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Haritada aç: ${contactAddress} (yeni sekmede açılır)`}
                >
                  Haritada aç
                  <ArrowOut />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal once className="footer__meta" order={3}>
          <p>© {new Date().getFullYear()} Esteelitta. Tüm hakları saklıdır.</p>
          <SiteLink className="footer__to-top" href={topHref}>
            Yukarı dön
            <svg className="footer__to-top-arrow" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 11V3M3.4 6.6 7 3l3.6 3.6" />
            </svg>
          </SiteLink>
        </Reveal>
      </div>
    </footer>
  );
}
