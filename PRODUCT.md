# Esteelitta — Ürün bağlamı (TASLAK)

> **Durum: taslak.** Bu dosya mevcut uygulamadan çıkarıldı (kod, içerik,
> `docs/BRAND.md`, `src/data/*`). Uydurma bilgi içermez; doğrulanamayan hiçbir
> sayı, oran, puan veya vaat eklenmedi.
>
> **Okuma kuralı:** Aşağıda "Ürün gerçeği" başlığı altındakiler koddan
> **doğrulanabilir** olgulardır. "Varsayım" olarak işaretlenenler ise koddan
> yapılmış çıkarımlardır; işletme sahibi tarafından **henüz onaylanmamıştır** ve
> tasarım kararı için bağlayıcı değildir. Bir varsayım doğrulanana kadar ona
> dayanarak içerik, CTA metni veya yönlendirme değiştirilmez.

## Ne

Esteelitta, İstanbul Küçükyalı'da (Maltepe) tek bir stüdyoda çalışan yerel
bir güzellik ve estetik salonu. Site bir tanıtım ve dönüşüm sitesidir; e-ticaret,
üyelik veya online randevu sistemi yoktur.

## Kim için

⚠️ **Varsayım — doğrulanmadı.** Kodda hedef kitle tanımı yok. Metinlerin tonundan
(*"acele etmeyen randevu"*, *"size uygun olmayanı önermeyiz"*) ve konumdan
(Küçükyalı) çıkarılan tahmin: bölgede bakım hizmeti arayan kişiler. Karar
kriterinin ne olduğu (fiyat, güven, konum, tavsiye) **bilinmiyor**.

## Dönüşüm kanalları

**Doğrulanabilir olgu:** Sitede üç iletişim kanalı var — telefon
(`tel:+905305922416`), e-posta (`mailto:info@esteelitta.com`) ve Instagram.
Online randevu akışı **henüz kurulmamıştır**; bu yüzden ana sayfadaki
"Randevu Al" doğrudan arama başlatır, diğer sayfalarda `/iletisim`'e gider
(`src/components/site-header.tsx:328`, kod yorumunda açıkça geçici olarak
tanımlanmış).

⚠️ **Varsayım — doğrulanmadı.** Hangi kanalın birincil dönüşüm olduğu
işletme tarafından belirtilmemiştir. Telefonun ana sayfa hero'sunda ve header'da
durması bunu düşündürür, ancak ölçüm veya işletme beyanı yoktur.

> **Bağlayıcı kural:** Mevcut CTA metinleri, hedefleri ve iletişim yönlendirmeleri
> **ayrıca onay alınmadan değiştirilmez.** Buna "Randevu Al" metni ve davranışı,
> "Tüm Hizmetleri Keşfet" → `/hizmetler`, "Hakkımızda" → `/hakkimizda` ve
> iletişim CTA'sı → `/iletisim` dahildir. Telefon numarası CTA metnine
> dönüştürülmez.

## Yüzeyler ve modları

⚠️ **Varsayım — doğrulanmadı.** Mod atamaları sayfa içeriğinden çıkarıldı;
işletme onayı yoktur. Tasarım tonunu yönlendirir, içerik kararı vermez.

| Yüzey | Mod | Ziyaretçinin başarısı (tahmin) |
|---|---|---|
| `/` | Persuade | Markaya güvenip iletişime geçmek |
| `/hizmetler` | Persuade | Sekiz uygulamayı tanıyıp kendine uygun olanı bulmak |
| `/hakkimizda` | Persuade | Çalışma biçimine ve mekâna güven duymak |
| `/iletisim` | Operate | En uygun kanalı seçip ulaşmak |

## Ürün gerçeği (koddan doğrulanabilir)

- **Sekiz hizmet**, tek kaynakta: `src/data/services.ts`.
  01 Lazer Epilasyon · 02 Cilt Bakımı · 03 Bölgesel İncelme · 04 Kalıcı Makyaj ·
  05 Saç Tasarımı · 06 İpek Kirpik · 07 Kaş Tasarımı · 08 El ve Tırnak Bakımı
- **İletişim**, tek kaynakta: `src/data/site.ts`.
  Telefon 0530 592 24 16 · info@esteelitta.com ·
  Çınar, Bağdat Cad. No 195/12, 34841 Maltepe / İstanbul ·
  Instagram `@esteelitta_kucukyali`
- **Ana sayfa hero'su korunur**: sekiz hizmet videosunu taşıyan içbükey 3B
  carousel markanın imza öğesidir (`docs/BRAND.md`, ilke 3).
- **Ana sayfada yalnızca dört hizmet** öne çıkar; tamamı `/hizmetler`'dedir.

## İçerik dürüstlüğü kuralı (mevcut ve korunacak)

Kod içi yorumlar bunu tekrar tekrar kayda geçiriyor ve uygulama buna uyuyor:
**doğrulanmamış hiçbir istatistik, danışan yorumu, isim, avatar, yıldız puanı,
başarı oranı, seans sayısı taahhüdü veya tıbbi vaat üretilmez.** Referans
sitelerdeki bu bloklar kopyalanmak yerine gerçek marka ilkeleriyle
doldurulmuştur. Bu, sitenin en güçlü kararlarından biridir ve korunur.

Tüm mekân ve uygulama fotoğrafları yapay üretimdir; sayfalarda
"Görseller temsilidir." notu ve alt metinlerde "temsili" ifadesi bunu açıkça
söyler.

## Teknik kısıtlar

- Next.js 16.3.4 (App Router) · React 19.2 · Tailwind v4 (yalnızca `@import`;
  yardımcı sınıf kullanılmıyor, tüm stil `src/app/globals.css` içinde el yazımı)
- Motion (`motion/react`) 13.1 · Lenis 1.3 (yalnızca ince işaretçi + reduced-motion
  kapalıyken)
- Tipografi: Playfair Display (başlık) + Poppins (gövde), `next/font/google`
- Dil `tr`, tek dilli. i18n yok.
- Tema: yalnızca açık tema (`docs/BRAND.md`, ilke 1). Koyu tema hedef değil.
- Paket yöneticisi pnpm.
