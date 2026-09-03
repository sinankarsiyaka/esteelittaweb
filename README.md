# Esteelitta web sitesi

Esteelitta için hazırlanmış açık renkli, responsive ana sayfa şablonu.

## Mevcut yapı

- Sekiz hizmet videosu
- Masaüstünde dört canlı video ve iki kenar ipucu
- Tablette üç canlı video
- Mobilde bir canlı video ve iki yan ipucu
- Mouse, dokunma, ok tuşları ve yön düğmeleriyle carousel kontrolü
- Görünmeyen videoları durduran performans davranışı
- Marka uyumlu hizmet, yaklaşım ve iletişim bölümleri

## Yerel çalıştırma

```bash
pnpm install
pnpm dev
```

Ardından tarayıcıda `http://localhost:3000` adresini açın. Bu adres doluysa terminalin gösterdiği sonraki adresi kullanın.

## Kontroller

```bash
pnpm lint
pnpm build
```

## Düzenleme noktaları

- Hizmet listesi: `src/data/services.ts`
- Carousel: `src/components/service-carousel.tsx`
- Ana sayfa içeriği: `src/app/page.tsx`
- Görsel sistem: `src/app/globals.css`
- Videolar: `public/media/services/`
- Posterler: `public/media/posters/`
- Marka dosyaları: `public/brand/`

İşletme adresi, telefon, WhatsApp bağlantısı ve gerçek randevu hedefi daha sonra iletişim bölümüne bağlanabilir.
