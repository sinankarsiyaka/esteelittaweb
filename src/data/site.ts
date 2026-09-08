/** Site genelinde paylaşılan sabitler. Ana sayfa ve /hizmetler aynı
    kaynağı kullanır; adres ve hesap bilgisi ikinci kez yazılmaz. */

export const instagramHref = "https://www.instagram.com/esteelitta_kucukyali/";

export const contactAddress =
  "Çınar Mahallesi, Bağdat Caddesi, Rahmet Apt. No: 195/12, Küçükyalı, Maltepe / İstanbul";

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactAddress,
)}`;
