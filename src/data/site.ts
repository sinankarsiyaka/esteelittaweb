/** Site genelinde paylaşılan sabitler. Ana sayfa, /hizmetler ve /iletisim
    aynı kaynağı kullanır; telefon, e-posta ve adres ikinci kez yazılmaz. */

export const instagramHref = "https://www.instagram.com/esteelitta_kucukyali/";

export const contactPhone = "0530 592 24 16";
export const contactPhoneHref = "tel:+905305922416";

export const contactEmail = "info@esteelitta.com";
export const contactEmailHref = "mailto:info@esteelitta.com";

/** Kart ve listelerde satır satır dizilir; tek satıra sıkıştırılmaz. */
export const contactAddressLines = [
  "Çınar, Bağdat Cad. No 195/12",
  "34841 Maltepe / İstanbul",
] as const;

export const contactAddress = contactAddressLines.join(", ");

/** Salonun doğrulanmış Google Maps kaydı. Kısa bağlantı paylaşım
    hedefidir; gömülü harita anahtarsız embed adresini kullanır. */
export const mapsHref = "https://maps.app.goo.gl/QGb13UsgWJP1EyRD7";

/** API anahtarı gerektirmeyen gömme adresi. Kart içindeki iframe yalnızca
    konumu gösterir; tıklama hedefi her zaman mapsHref'tir. */
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Esteelitta Güzellik Salonu, Bağdat Caddesi No 195/12, Küçükyalı, Maltepe, İstanbul",
)}&z=16&output=embed`;
