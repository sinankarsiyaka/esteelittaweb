"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import {
  contactAddressLines,
  contactEmail,
  contactEmailHref,
  contactPhone,
  contactPhoneHref,
  mapsEmbedSrc,
  mapsHref,
} from "@/data/site";

/** Üç iletişim kartı, kaydırma ilerlemesine bağlı olarak büyüyerek gelir.

    Stilla'nın "We're Here to Help" bölümü ölçüldüğünde kartların başlangıç
    durumu scale(0.8) / opacity(0), bitiş durumu scale(1) / opacity(1)
    olarak okundu; masaüstünde üç kart arasında küçük bir kademe vardı
    (uçuş sırasında 0.975 / 0.949 / 0.895).

    Burada hareket basit bir whileInView geçişi değil, useScroll +
    useTransform ile kaydırma ilerlemesine bağlanmış sürekli bir dönüşümdür.
    Her kart kendi elemanını hedef alır:

    - Masaüstünde üç kart aynı satırda olduğu için ilerlemeleri aynıdır ve
      kartlar tek kompozisyon gibi hareket eder; kademe, giriş aralığının
      karta göre kaydırılmasıyla verilir.
    - Mobilde kartlar alt alta olduğu için her kart doğal olarak kendi
      ilerlemesini izler.

    useTransform varsayılan olarak aralığı kırptığından değerler 1'de
    kalır; animasyon bittikten sonra kaydırmada titreme olmaz. */

/** Kademe adımı: 0 / 0.08 / 0.16 (spec'teki saniye kademesinin ilerleme
    karşılığı). */
const STAGGER = 0.08;
const SCALE_SPAN = 0.72;
const OPACITY_SPAN = 0.5;

type CardProps = {
  index: number;
  title: string;
  icon: ReactNode;
  iconTone: "turquoise";
  info: ReactNode;
  href: string;
  linkLabel: string;
  external?: boolean;
  media: ReactNode;
};

function ContactCard({
  index,
  title,
  icon,
  iconTone,
  info,
  href,
  linkLabel,
  external,
  media,
}: CardProps) {
  const ref = useRef<HTMLElement>(null);
  // Kart üstü viewport'un altındayken 0, viewport'un %62'sine geldiğinde 1.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.62"],
  });

  const from = index * STAGGER;
  const scale = useTransform(scrollYProgress, [from, from + SCALE_SPAN], [0.8, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [from, from + OPACITY_SPAN],
    [0, 1],
  );

  return (
    <motion.article
      ref={ref}
      className="contact-card"
      /* Stil azaltılmış hareket tercihine göre dallandırılmaz: bu, sunucu
         (useReducedMotion → null) ile tarayıcı çıktısını ayırıp hidrasyon
         uyuşmazlığı üretiyordu. Tercih açıkken kartların görünürlüğünü
         globals.css'teki reduced-motion bloğu garanti eder
         (opacity: 1 !important; transform: none !important). */
      style={{ scale, opacity }}
    >
      <div className="contact-card__head">
        <div className="contact-card__text">
          <h3 className="contact-card__title">{title}</h3>
          <div className="contact-card__info">{info}</div>
        </div>
        <span
          className={`contact-card__icon contact-card__icon--${iconTone}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      <div className="contact-card__media">{media}</div>

      {/* Kartın tamamı tıklanabilir: bağlantı kartı kaplar, böylece harita
          iframe'i etkileşimli bir öğenin içine yerleştirilmez. */}
      <a
        className="contact-card__link"
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        <span className="visually-hidden">{linkLabel}</span>
      </a>
    </motion.article>
  );
}

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path
      d="M6.4 3.6h3l1.4 3.5-2 1.4a11.5 11.5 0 0 0 4.7 4.7l1.4-2 3.5 1.4v3a1.8 1.8 0 0 1-2 1.8A14.8 14.8 0 0 1 4.6 5.6a1.8 1.8 0 0 1 1.8-2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2.4" />
    <path d="m4.4 7.6 7.6 5.2 7.6-5.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path
      d="M12 3.2c-3.6 0-6.5 2.8-6.5 6.4 0 4.8 5.3 9.6 6.1 10.3a.6.6 0 0 0 .8 0c.8-.7 6.1-5.5 6.1-10.3 0-3.6-2.9-6.4-6.5-6.4Z"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

/** Kart görsellerinin ortak ölçüleri. Masaüstünde kart 1/3 sütun, mobilde
    kartın sağ sütunu; her iki durumda da doğal çözünürlüğün üstüne
    büyütülmez. */
const MEDIA_SIZES =
  "(min-width: 1000px) 373px, (min-width: 650px) 34vw, 140px";

export function ContactCards() {
  return (
    <div className="contact-cards">
      <ContactCard
        index={0}
        title="Bizi Arayın"
        icon={PhoneIcon}
        iconTone="turquoise"
        info={<p>{contactPhone}</p>}
        href={contactPhoneHref}
        linkLabel={`Bizi arayın: ${contactPhone}`}
        media={
          <Image
            src="/media/impeccable-final-v1/iletisim-karsilama-eli-v1.png"
            alt="Esteelitta resepsiyonunda misafire uzatılan bir bardak suyla karşılama anının temsili görseli."
            width={1122}
            height={1402}
            sizes={MEDIA_SIZES}
            className="contact-card__image"
            style={{ objectPosition: "50% 40%" }}
          />
        }
      />

      <ContactCard
        index={1}
        title="E-posta Gönderin"
        icon={MailIcon}
        iconTone="turquoise"
        info={<p>{contactEmail}</p>}
        href={contactEmailHref}
        linkLabel={`E-posta gönderin: ${contactEmail}`}
        media={
          /* Bu yuvada eskiden /hakkimizda'daki resepsiyon görseli vardı;
             aynı dosya iki sayfada birden kullanılıyordu. Havuzdaki
             kullanılmayan tek marka uyumlu görselle değiştirildi:
             gün ışığı alan bir bakım odası. İletişim sayfasında "bize
             ulaşınca geleceğiniz yer" anlamını taşır ve resepsiyon
             görseli artık yalnızca /hakkimizda'ya ait. */
          <Image
            src="/media/homepage-v2/06-kapanis-atmosfer-v1.webp"
            alt="Esteelitta bakım odasının temsili görünümü: tül perdeli geniş pencere, gün ışığı ve arkada İstanbul manzarası."
            width={1774}
            height={887}
            sizes={MEDIA_SIZES}
            className="contact-card__image"
            style={{ objectPosition: "50% 45%" }}
          />
        }
      />

      <ContactCard
        index={2}
        title="Bizi Ziyaret Edin"
        icon={PinIcon}
        iconTone="turquoise"
        info={
          <p>
            {contactAddressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        }
        href={mapsHref}
        external
        linkLabel="Adresimizi Google Maps'te açın (yeni sekmede)"
        media={
          <>
            {/* Anahtarsız gömme; yalnızca konumu gösterir. loading="lazy"
                ile kart görünüm alanına yaklaşmadan indirilmez ve
                pointer-events: none sayesinde kaydırmayı ele geçirmez. */}
            <iframe
              className="contact-card__map"
              src={mapsEmbedSrc}
              title="Esteelitta konumu — Google Haritalar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              aria-hidden="true"
            />
            <span className="contact-card__map-pill" aria-hidden="true">
              Google Maps’te Açın
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3.6 8.4 8.4 3.6M4.6 3.6h3.8v3.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </>
        }
      />
    </div>
  );
}
