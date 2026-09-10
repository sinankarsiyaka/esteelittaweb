# Esteelitta — Tasarım sistemi (TASLAK)

> **Durum: taslak / önerilen hedef.** Bu dosya Aşama 1 analizinin çıktısıdır ve
> onaylanmış sınırlara göre revize edilmiştir. Bağlayıcı bir spesifikasyon değil,
> üzerinde anlaşılmış bir yöndür.
>
> **Kapsam kuralı:** Bu doküman görsel sistemi tarif eder. Onay olmadan
> **içerik, CTA metni, bağlantı hedefi veya iletişim yönlendirmesi değiştirmez**
> (bkz. `PRODUCT.md`). Ayrıca büyük ölçekli CSS yeniden yazımına, ölü kod
> temizliğine veya alakasız refactor'e gerekçe oluşturmaz; bunlar ayrı bir
> çalışmadır.

## 1. Karakter

Gün ışığı alan bir stüdyo. Klinik güven + kişisel bakım. Ferah, ölçülü, zarif.
Ağır, koyu, dramatik değil. Gösteriş değil, sükûnet.

**Anti-referans:** parlak "premium" gölgeler, aşırı yuvarlatılmış kapsüller,
işlevsel bölüm başlıklarına veya küçük gövde metnine sızan magenta italik,
dekoratif kayan dev yazılar, kart içinde kart. Bunlar Esteelitta'nın
karakteri değil, üretim tortusudur. (Editoryal slogan başlıklarındaki
Magenta vurgusu bunun dışındadır — bkz. §2 "Magenta kuralı".)

## 2. Renk — tek kaynak

Aşağıdakiler **tek** palettir. Sayfaya özel palet (`--pv-*`, `--il-*`) yoktur.
Ham hex yalnızca bu tabloda geçer; başka hiçbir yerde yazılmaz.

### Beş ana marka rengi (bağlayıcı — `public/brand/marka-kimligi.png`)

Marka kimliği görselindeki palet **beş** renktir. Bağlayıcı kaynak odur.

| Jeton | Değer | Rol |
|---|---|---|
| `--porcelain` | `#FCFBFD` | **Sitenin ana zemini.** Sayfaların çoğunluğunda baskın yüzey |
| `--mist` | `#EAF9FC` | İkincil bölüm bandı, yumuşak vurgu alanı, porselen üzerindeki kart. Her bölümde tekrarlanan bağımsız arka plana dönüşmez |
| `--turquoise` | `#49BED2` | Dekoratif çizgi, küçük yüzey, ikon, motion izi, marka detayı. **Normal boyutlu beyaz metin taşıyan buton zemini olamaz** (beyazla 2.13:1) |
| `--deep-teal` | `#176B78` | Ana metin vurgusu, **erişilebilir birincil CTA zemini**, bağlantılar, kontrollü güçlü vurgular |
| `--magenta` | `#D71986` | Logodaki **imza vurgu**. Geniş arka plan ya da standart buton dolgusu değil |

### Yardımcı tonlar

Yalnızca erişilebilirlik, ikincil metin, hover, focus, kenarlık ve çok küçük
arayüz rolleri içindir. **Geniş bölüm zemini oluşturamaz ve yeni bir marka
rengi gibi davranamaz.**

| Jeton | Değer | Rol |
|---|---|---|
| `--white` | `#ffffff` | Tonlu band üzerindeki yükseltilmiş kart |
| `--mist-strong` | `#d7f2f7` | İkon kuyusu, dolu dekoratif form (gövde metni taşımaz) |
| `--ink` | `#123f48` | **Öncelikle metin rengi.** Kontrast ihtiyacı için yardımcı ton; büyük bölüm zemini veya baskın renk **olamaz** |
| `--muted` | `#567279` | İkincil metin (porselen, beyaz, mist üzerinde) |
| `--footer-muted` | `#4a666d` | Footer ikincil metni |

### Yüzey merdiveni (derinlik korunur — hepsi tek renge indirgenmez)

Yüzeyler **tek tona düzleştirilmez**; sayfa bir derinlik merdiveni taşır.
Merdivenin her basamağı marka paletinden gelir. **Yeni bağımsız hue yok** —
yalnızca mevcut marka renkleri ve onların opaklık türevleri.

| Basamak | Jeton | Değer | Nerede |
|---|---|---|---|
| L0 | `--surface-page` | `--porcelain` `#fcfbfd` | Varsayılan bölüm zemini |
| L1 | `--surface-tint` | `--mist` `#eaf9fc` | Tonlu bölüm bandı |
| L2 | `--surface-raised` | `--white` `#ffffff` | **Tonlu band üzerindeki** kart |
| L1′ | `--surface-card` | `--mist` `#eaf9fc` | **Porselen üzerindeki** kart |
| L3 | `--surface-well` | `--mist-strong` `#d7f2f7` | Yoğun kuyu: ikon zemini, dolu dekoratif form |
| A | `--deep-teal` | `#176B78` | **Tek güçlü yüzey rolü**: küçük vurgu kartı, birincil CTA |

> **`--ink` geniş bölüm zemini olarak kullanılmaz.** Marka kimliğinde koyu
> yüzey yoktur; Ink yalnızca metin ve kontrast rolünü taşıyan yardımcı bir
> tondur. Güçlü bir yüzeye ihtiyaç varsa `--deep-teal` kullanılır ve yalnızca
> küçük ölçekte (kart, buton) — tam genişlik bölüm olarak değil.

**Kuyu yüzeyinin metin kısıtı (ölçülmüş):** `--surface-well` üzerinde
`--muted` 4.40:1 verir ve AA'yı kıl payı kaçırır. Bu yüzeydeki ikincil metin
`--deep-teal` (5.26) veya `--ink` (9.80) kullanır. Ölçülen değerler:

| Metin | porselen | beyaz | mist | mist-strong |
|---|---|---|---|---|
| `--muted` | 4.99 | 5.15 | 4.77 | **4.40 ✗** |
| `--deep-teal` | 5.97 | 6.16 | 5.70 | 5.26 |
| `--ink` | 11.12 | 11.47 | 10.63 | 9.80 |
| `--magenta` | 4.66 | 4.80 | **4.45 ✗** | **4.10 ✗** |

`--magenta` mist ve kuyu üzerinde gövde metni olarak kullanılmaz; porselen
ve beyaz üzerinde kullanılabilir.

**Derinlik kuralı (bağlayıcı):** Bir kart, ebeveyninin yüzeyini asla tekrar
kullanmaz.
`porselen → kart mist` · `mist → kart beyaz` · `porselen → kart beyaz + --line kontur`.

### Sayfa yüzey ritmi

Referans sitelerden (Purevia/Vantara) gelen **açık → açık → koyu** ritmi bir
marka kuralı değildir ve korunmaz. Esteelitta'nın ritmi baştan sona açıktır;
tonlu bandlar porselen alanları ayırır.

Ana sayfa (hero hariç — hero'ya dokunulmaz):

| # | Bölüm | Yüzey |
|---|---|---|
| 1 | Hakkımızda | Mist |
| 2 | Hizmetler | Porselen (kartlar Mist) |
| 3 | Atmosfer | Porselen + sınırlandırılmış Mist panel |
| 4 | Süreç | Porselen (kartlar beyaz + Mist kuyular) |
| 5 | Deneyim | Mist (kartlar beyaz) |
| 6 | Merak Edilenler | Porselen |
| 7 | Footer | Porselen |

**Bölüm geçişleri.** Aynı açık yüzey devam ediyorsa yalnızca boşluk ya da ince
bir ayırıcı kullanılır. Mist → Porselen geçişi gerekiyorsa kısa ve fark
edilmeyecek kadar yumuşak olur. **Uzun, bulanık gradient bandı ya da sis lekesi
kurulmaz** — footer öncesindeki 64–124px'lik gradient bu yüzden kaldırıldı.

### Metin ve çizgi jetonları

| Jeton | Değer | Kullanım kuralı |
|---|---|---|
| `--line` | `rgba(23,107,120,0.16)` | Dekoratif ayırıcı çizgi |
| `--line-ui` | `rgba(23,107,120,0.7)` | **Yalnızca** UI bileşeninin tek sınırı olduğunda |

#### `--line-ui` — ölçülmüş gerekçe

Aşama 1 raporunda `rgba(23,107,120,0.28)` için "3:1'i geçer" yazmıştım;
**bu yanlıştı — gerçek değer 1.52:1.** Doğru ölçüm:

| Aday | Porselen üzerinde |
|---|---|
| `rgba(23,107,120,0.28)` | 1.51 ✗ |
| `rgba(23,107,120,0.50)` | 2.20 ✗ |
| **`rgba(23,107,120,0.70)`** | **3.22 ✓** |
| `rgba(73,190,210,0.70)` (turkuaz) | 1.70 ✗ — turkuaz hiçbir opaklıkta 3:1'e ulaşmaz (%100'de bile 2.13) |

**Nerede kullanılır:** yalnızca `.button--ghost`. Bu butonun tek görsel sınırı
konturudur; bugünkü `rgba(73,190,210,0.7)` **1.70:1** ile WCAG 1.4.11'i
(UI bileşeni sınırı ≥ 3:1) karşılamıyor. Deep-teal %70 markada kalır ve geçer.

**Nerede kullanılmaz:** dekoratif konturlar. `/hizmetler` galerisindeki lens
halkası (`.duet__figure::before`, turkuaz %60 = 1.57:1) **dekoratiftir** —
formu fotoğrafın kendisi tanımlar, halka 8px dışarıda süs olarak durur.
Aşama 1'de bunu "form görünmüyor" diye raporlamıştım; **doğru değildi** —
o ölçüm, fotoğrafı gizleyen reveal hatası (D1) yüzünden boş görünen lensle
yapılmıştı. D1 düzelince halka dekoratif kalır ve **WCAG 3:1 gereksinimi
uygulanmaz.** Bu yüzden değiştirilmiyor.

### Kaldırılan kopyalar

`--pv-tint` `#e9f0f1` · `--pv-card` `#eef3f4` · `--pv-muted` `#4b686f` ·
`--il-turquoise` `#4bb0c6` · `--il-magenta` `#cf1b7d` · `--il-contact-bg` `#eefafb` ·
`--il-muted` `#5b767d` · `--il-page-bg` `#fcfbfd` · `--il-ink` `#123f48` ·
`#254d55` · `#0d3038` · `#7fdfe9` · `#d9f1f5` · `#ddf2f6` · `#fbe2ef` · `#f4fcfd`

Hiçbiri işlevsel bir ihtiyaç karşılamıyor; hepsi yukarıdaki jetonlara bağlanır.

### Magenta kuralı — sayaçla değil, anlamla

Magenta logodaki **imza vurgu rengidir.** Kullanımına sayısal bir sayaçla
değil, **anlamsal rolle** karar verilir.

> **Slogan veya editoryal anlatı cümlesi niteliğindeki her büyük başlıkta**,
> cümlenin ana fikrini taşıyan tam bir kelime ya da kısa ifade Magenta
> olabilir. Bu bir "sayfa başına tek vurgu" bütçesi değildir — sayfadaki
> her slogan kendi vurgusunu taşır.

**Ortak uygulama:** tüm slogan vurguları `<em className="brand-emphasis">`
ile işaretlenir (bkz. `globals.css` — `.brand-emphasis`). Sınıf yalnızca
renk ve stil belirler (Magenta + italik); punto, satır yüksekliği ve hareket
ebeveyn başlıktan miras kalır. Hero'ların yapısal nedenlerle ayrı kalan kendi
vurgu seçicileri (`.hero h1 span`, `.hk-hero__title em`,
`.hizmetler-hero__title em`, `.iletisim-hero__title em`) aynı görünümü
üretir; bu istisna yalnızca hero'ların dokunulmaması gereken yapısındandır.

Bugün taşınan imzalar:

| Sayfa | Slogan | Magenta ifade |
|---|---|---|
| `/` | Işığını ortaya **çıkar.** | `çıkar.` — hero, dokunulmaz |
| `/` | Güzelliği bir hedef değil, kendinize ayırdığınız **zaman** olarak görüyoruz. | `zaman` |
| `/` | Bakımı acele etmeyen, **size göre** planlanan bir düzen | `size göre` |
| `/hakkimizda` | Bakımı bir **zanaat** gibi düşünüyoruz. | `zanaat` — hero, dokunulmaz |
| `/hakkimizda` | Güzelliği bir hedef değil, kendinize ayırdığınız **zamanın** sonucu sayıyoruz. | `zamanın` |
| `/hakkimizda` | Sakin, ölçülü ve **size özel.** | `size özel.` |
| `/hakkimizda` | Kapıdan girdiğiniz an **yavaşlar.** | `yavaşlar.` |
| `/hakkimizda` | Uygulamadan sonra da **yanınızdayız.** | `yanınızdayız.` |
| `/hizmetler` | Bakımın size **özel** hali. | `özel` — hero, dokunulmaz |
| `/hizmetler` | Bakımın **sekiz** hali. | `sekiz` |
| `/hizmetler` | Her adımda özen, her dokunuşta **güven.** | `güven.` |
| `/hizmetler` | Hangi bakımın **size uygun** olduğundan emin değil misiniz? | `size uygun` |
| `/iletisim` | Size yardımcı olmak için **buradayız.** | `buradayız.` — hero, dokunulmaz |
| `/iletisim` | Nasıl çalıştığımızı **üç kelimede** toplayabiliriz. | `üç kelimede` |
| `/iletisim` | Kendinize ayıracağınız zamanı **birlikte** planlayalım. | `birlikte` |
| footer (ortak) | Güzelliğe sakin, güvenli ve **kişisel** bir dokunuş. | `kişisel` — sistemin ortak kapanış imzası |

**İşlevsel durum — yukarıdaki tablonun dışında, ayrı bir izin**

> Magenta, editoryal slogan vurgularının yanında, kullanıcının bulunduğu
> sayfayı belirten aktif navigasyon durumunda da kullanılabilir. Bu işlevsel
> kullanım yalnızca `aria-current="page"` durumuyla sınırlıdır.

Bu, yukarıdaki "Bugün taşınan imzalar" tablosunun bir parçası değildir —
tablo yalnızca editoryal slogan vurgularını listeler. Aktif navigasyon
durumu ayrı ve tek bir işlevsel izindir: `.desktop-nav`/`.mobile-nav`
içindeki `a[aria-current="page"]` metni ve altındaki çizgi Magenta olur;
pasif menü öğeleri mevcut Deep Teal sistemini sürdürür. Bu izin başka bir
UI bileşenine (kicker, buton, ikon, sayaç, kart başlığı) yayılmaz.

**Kurallar**

- Her editoryal slogan başlığında tam bir anlamsal kelime veya kısa ifade
  Magenta olabilir.
- **İşlevsel bölüm başlıkları** (bölümün içeriğini adlandıran başlıklar —
  örn. "Öne çıkan dört uygulama", "Nasıl ilerliyoruz?", "Merak edilenler",
  "Bizimle İletişime Geçin") tek renk Deep Teal/Ink kalır; Magenta almaz.
- Aynı slogan içinde birden fazla bağımsız Magenta parça kullanılmaz.
- Vurgu kelimenin yalnızca bir kısmına uygulanmaz — tam kelime ya da tam
  kısa ifade vurgulanır.
- Magenta küçük gövde metninde kullanılmaz (footer'ın büyük, Playfair
  Display marka cümlesi bunun dışındadır — bkz. aşağı).
- Footer'daki marka cümlesi sistemin **ortak kapanış imzasıdır**; tüm
  sayfalarda aynı biçimde görünür.

**Olmayacaklar**

- Hizmet kartı, süreç kartı, FAQ sorusu, iletişim kartı ve değer kartı
  ("Özen", "Uzmanlık", "Güven") başlıklarına Magenta eklemek.
- Buton dolgusu, kicker noktası, dekoratif sayaç, ikon veya chevron'a
  Magenta vermek.
- Vurgunun cümlenin ana fikriyle ilgisiz bir kelimeye düşmesi.

`:focus-visible` konturu ve marka logosunun kendi magentası bu değerlendirmenin
dışındadır.

**Amaç Magenta'yı yok etmek değil:** logodaki gibi kontrollü fakat görünür bir
marka imzası olarak tutmaktır.

### Kontrast tabanı

- Gövde ve ikincil metin: **≥ 4.5:1**. `--muted` `--mist` üzerinde 4.61 — geçer.
- **UI bileşeninin tek sınırı olan** kontur: ≥ 3:1 → `--line-ui`.
- **Dekoratif** çizgi ve kontur: eşik uygulanmaz. Bunlar için WCAG 3:1
  gerekliymiş gibi rapor yazılmaz.
- 12px altı metin yasak (aşağıya bkz.).

### Fotoğraf

Fotoğrafların doğal renkleri zorlanmaz; turkuaz/magenta filtresi uygulanmaz.
Ortak kural yalnızca **ısı**: tüm görseller nötr–serin bandda kalır. Belirgin
sarı/krem baskısı taşıyanlar hafif nötrleştirilir (bkz. rapor, C4).

## 3. Tipografi — tek ölçek

**Başlık:** Playfair Display 400 · **Gövde/arayüz:** Poppins 300/400/500/600.

| Rol | Boyut | Satır | Aralık |
|---|---|---|---|
| `--fs-display` | `clamp(44px, 5.4vw, 84px)` | 1.06 | −0.035em |
| `--fs-h1` | `clamp(40px, 4.6vw, 68px)` | 1.08 | −0.035em |
| `--fs-h2` | `clamp(30px, 3.2vw, 44px)` | 1.16 | −0.03em |
| `--fs-h3` | `clamp(21px, 1.9vw, 28px)` | 1.24 | −0.02em |
| `--fs-lead` | `clamp(16px, 1.2vw, 19px)` | 1.6 | −0.01em |
| `--fs-body` | `clamp(15px, 1.05vw, 16px)` | 1.7 | 0 |
| `--fs-small` | `14px` | 1.6 | 0 |
| `--fs-micro` | `12px` | 1.5 | 0.12em, uppercase |

**Kurallar**

- Ölçek dışı `font-size` yazılmaz. Bugün ~40 farklı `clamp()` var; hedef sekiz.
- **12px altı metin yoktur.** Bugünkü 7px/8px/9px/9.5px/10px/11px değerleri
  `--fs-micro`'ya çıkar.
- `letter-spacing` yalnızca bu tabloda geçen değerleri alır. Bugün 25 farklı
  değer var; hedef altı.
- Serif başlık ölçü kutusu **≤ 700px** (referanstan gelen, korunan kural).
- Uppercase yalnızca `--fs-micro` rolünde.

## 4. Kicker — tek sistem

Sitede bugün **beş** farklı bölüm etiketi dili var. Tek temel sistem kalır:

```
[5px nokta] + [12px uppercase 0.12em micro metin]
```

Rol her yüzeyde aynıdır — ayrı yüzey varyantı yok:

| Öğe | Jeton | Rol |
|---|---|---|
| Kicker metni | `--deep-teal` | Okunabilir metin |
| Kicker noktası | `--turquoise` | Dekoratif — `currentColor` ile metinden miras almaz |

Kaldırılanlar: incelen gradient çizgi + uç noktası (`.rule-kicker::after`),
magenta nokta varyantı, üç farklı tracking değeri, `.atlas-kicker`'ın kendi
ölçeği.

**Formül tekrarı yasağı.** Her bölüm kicker ile başlamak zorunda değildir.
`kicker + serif başlık + paragraf` üçlüsü **arka arkaya gelen bölümlerde
tekrarlanmaz**; sıradaki bölüm ya doğrudan başlıkla açılır ya da kicker'ı
başka bir konuma (kenar, sayaç, satır içi) alır.

## 5. Yüzey, yarıçap, gölge

| Jeton | Değer |
|---|---|
| `--radius-sm` | `8px` — etiket, hap, küçük denetim |
| `--radius-md` | `14px` — kart, panel, görsel kutusu |
| `--radius-lg` | `26px` — büyük panel, bölüm bloğu |
| `--radius-pill` | `999px` — header kapsülü, header butonu, rozet, küçük denetim |
| `--shadow-sm` | `0 1px 2px rgba(23,107,120,.05)` |
| `--shadow-md` | `0 14px 32px rgba(23,107,120,.08)` |

**Kurallar**

- Organik "blob" yarıçapları (`49% 51% 46% 54% / …` ailesi) yalnızca
  **`/hizmetler` galerisindeki lens** için korunur — orada bilinçli bir imzadır.
  Başka hiçbir yerde organik yarıçap yok.
- Gölge yalnızca gerçekten yüzen öğede (header kapsülü, birincil buton).
  Kartlar gölgeyle değil yüzey tonuyla ayrışır.

### Yuvarlatılmış yüzey bütçesi (mutlak yasak değil)

Derinlik kaldırılmaz; **gereksiz kutu yığını** temizlenir. Kural bir sayıdır:

> Bir kartın içinde, kartın kendisi dahil **en fazla iki** yuvarlatılmış yüzey
> bulunur.

- Kart içindeki **görsel doğal bir medya alanıdır**: kartın üst köşelerini
  paylaşır (`border-radius: inherit inherit 0 0` etkisi) ya da kartın kenarına
  tam oturur. Bu ikinci yüzey sayılmaz — kartın kendi formunun parçasıdır.
- Ayrı, bağımsız yarıçap taşıyan **iç panel, ikon dairesi, harita kutusu, hap
  etiket** yığını buradan düşer. Bunlardan biri kalabilir; üçü birden kalamaz.
- Örnek: `.contact-card` bugün **kart + görsel kutusu + ikon dairesi + harita
  kutusu + hap** taşıyor (5 yüzey). Hedef: kart + kartın üst köşelerini paylaşan
  medya alanı, ikon dairesiz.

## 6. Buton

**Tutarlılık biçimde değil, davranıştadır.** Bütün butonlar aynı renk, tipografi,
yükseklik, padding, hover ve focus dilini paylaşır. Köşe yarıçapı bağlama göre
iki değer alır — site kapsül butonlarla doldurulmaz.

| Jeton | Değer | Nerede |
|---|---|---|
| `--btn-radius-pill` | `999px` | **Yalnızca header** kapsülünün içindeki "Randevu Al" ve küçük denetimler (şerit duraklatma, carousel okları) |
| `--btn-radius` | `--radius-sm` `8px` | İçerik alanındaki bütün CTA'lar |

Ortak ve değişmez olanlar:

| Rol | Zemin | Metin | Kontur |
|---|---|---|---|
| **Birincil CTA** | `--deep-teal` `#176B78` | `--white` | — |
| Birincil hover | `--deep-teal-deep` (Deep Teal'in erişilebilir koyu türevi) | `--white` | — |
| **İkincil CTA** | `--white` / şeffaf | `--deep-teal` | `--line-ui` (deep-teal %70, 3.22:1) |
| **Metin bağlantısı** | — | `--deep-teal` | alt çizgi |

Ortak ve değişmez olanlar:

| Özellik | Değer |
|---|---|
| Yükseklik | 48px (birincil) · 42px (header compact) |
| Yatay padding | 26px · 22px (compact) |
| Tipografi | 14px / 500 / `0.01em` |
| Basma | `scale(0.98)` |
| Focus | 2px `--magenta` kontur, 4px offset |
| Geçiş | `--dur-fast` `--ease-out-expo` |

**Magenta standart buton dolgusu olarak kullanılmaz.** Turkuaz da normal
boyutlu beyaz metin taşıyan buton zemini olamaz (2.13:1). Birincil CTA'nın tek
zemini Deep Teal'dir.

`.button` ve `.pv-button` **aynı davranış tablosuna** bağlanır; ikisi de içerik
alanında `--btn-radius` kullanır. Header'daki "Randevu Al" mevcut pill biçimini
korur ve bu ayrım bilinçlidir: yüzen kapsülün içindeki eylem, sayfa içi
eylemlerden biçimsel olarak ayrışır.

**CTA metinleri — değiştirilmez.** Aşağıdakiler onaylı içeriktir; metin de hedef
de korunur:

| Metin | Hedef |
|---|---|
| `Tüm Hizmetleri Keşfet` | `/hizmetler` |
| `Hakkımızda` | `/hakkimizda` |
| İletişim CTA'sı | `/iletisim` |
| `Randevu Al` | Mevcut davranış (ana sayfada `tel:`, diğerlerinde `/iletisim`) |

Bu metinler yeniden yazılmaz, telefon numarası CTA metnine dönüştürülmez.
Aşama 1'de önerdiğim "Sekiz hizmeti görün" ve "0530 592 24 16 · Arayın"
değişiklikleri **geri çekilmiştir**. Değişiklik yalnızca ayrı onayla yapılır.

## 7. Ritim ve ızgara

| Jeton | Değer |
|---|---|
| `--shell` | `min(100% - 2*--gutter, 1240px)` |
| `--gutter` | `clamp(20px, 3vw, 40px)` |
| `--section-pad` | `clamp(72px, 7.5vw, 128px)` |
| `--stack-lg` | `clamp(40px, 4.4vw, 64px)` |
| `--stack-md` | `clamp(20px, 2vw, 28px)` |
| `--stack-sm` | `clamp(10px, 1vw, 14px)` |

**Tek kabuk.** Bugün `.section-shell` (1240) ve `.pv-shell` (1200) iki ayrı
kabuk; birleşir.

**Boş alan kuralı:** hiçbir ızgara kolonu yalnızca "dramatik" görünmek için boş
bırakılmaz. 12 kolonluk ızgarada 4 kolondan geniş boşluk ancak yapışkan bir öğe
o alanda **kalıyorsa** kabul edilir; kalmıyorsa ızgara daraltılır.

## 8. Hareket — tek dil

**Hedef hareketi azaltmak değil.** Site premium motion karakterini korur;
amaç onu **tutarlı, sakin, akıcı ve işlevsel** kılmaktır. `docs/BRAND.md`
içindeki hareket yoğunluğu değeri **düşürülmez**; hareketin dağınıklığı
giderilir, miktarı değil.

| Jeton | Değer |
|---|---|
| `--ease-calm` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur-fast` | `200ms` — hover, basma |
| `--dur-base` | `340ms` — durum değişimi, akordeon |
| `--dur-enter` | `640ms` — giriş hareketi |
| `--enter-shift` | `40px` (blok) / `20px` (metin) |
| `--stagger` | `80ms` |

Süreler ve mesafeler ana sayfanın bugünkü `PvReveal` değerleridir — sistem
zaten oradaki karaktere göre hizalanır, yeni ve daha sönük bir karaktere değil.

**Kurallar**

1. **Görünür olan içerik bir daha gizlenmez.** Giriş hareketi bir kez oynar ve
   içerik yerinde kalır. Bu, sistemin tek pazarlıksız motion kuralıdır.
2. Giriş hareketi `opacity` + `translateY` üzerinde yürür. İçeriği tamamen
   gizleyen `clip-path` maskeleri bu amaçla kullanılmaz; **dekoratif** maske ve
   ölçek hareketleri (görsel perdesi, lens açılışı) içerik gizlemediği sürece
   korunabilir.
3. Yapışkanlık ve parallax korunur — ikisi de sitenin karakterinin parçası.
   Yapışkan bölümün yanındaki kolon "dramatik boşluk" olarak bırakılmaz
   (bkz. §7 boş alan kuralı). *(Aşama 2B kapsamı)*
4. `transition: all` hiçbir yerde yok (bugün de yok — korunur).
5. Otomatik hareket (marquee): her sayfada en fazla **bir tane** ve mutlaka
   duraklatma denetimiyle (WCAG 2.2.2). Ana sayfada denetimli — doğru örnek.
   `/iletisim`'deki üç denetimsiz şerit tek kontrollü banda iner.
   *(Aşama 2B kapsamı)*
6. **Ana sayfa hero'sunun motion sistemine dokunulmaz** — carousel, hero giriş
   hareketi ve zamanlaması olduğu gibi kalır.
7. `prefers-reduced-motion: reduce` → tüm giriş hareketleri, parallax, şerit ve
   ölçek değişimleri kapanır; hiçbir içerik gizli kalmaz. (Bugün kapsam iyi;
   korunur.)

## 9. Erişilebilirlik tabanı (mevcut güçlü kararlar — korunur)

- Tek `<h1>`, atlamasız başlık hiyerarşisi.
- Her sayfada `<main>`, adlandırılmış `<nav>`, `aria-labelledby` taşıyan bölümler.
- Dekoratif görsellerde `alt=""`, anlamlı görsellerde tam Türkçe alt metin.
- Mobil panel: `inert`, odak tuzağı, `Escape`, gövde kaydırma kilidi + Lenis
  durdurma, kaydırma çubuğu telafisi.
- Akordeon: gerçek `<button>`, `aria-expanded`, `aria-controls`.
- `noscript` ile JavaScript kapalıyken içerik okunur kalır.
- `:focus-visible` her yerde 2px magenta kontur, 4px offset.
