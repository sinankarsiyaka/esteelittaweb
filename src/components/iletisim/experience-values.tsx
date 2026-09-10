import { Reveal } from "@/components/reveal";

/** İletişim sayfasının değerler bölümü.

    Önceki hâli üç satırlı sonsuz kayan şeritti: dev geometrik sans
    kelimeler, doygun düz turkuaz bloklar ve altı fotoğraf (üçü sitenin
    başka yerlerinden tekrar) ekranı boydan boya geçiyordu. Kenar maskesi
    olmadığı için kelimeler "zmanlık", "U" diye kesiliyor; bölüm sitenin
    geri kalanının serif/editoryal dilinden tamamen kopuyordu. Üç şeridin
    hiçbirinde duraklatma denetimi yoktu (WCAG 2.2.2).

    Yerine tek bir editoryal bölüm geldi. Zenginlik hareketten değil
    tipografik hiyerarşiden, ölçülü asimetriden ve negatif alandan gelir:

    - Üç değer eşit satırlar değil; ilki en büyük ölçekte, sonrakiler
      kademeli olarak küçülür ve sağa doğru girintilenir.
    - Her satır ince bir çizgiyle ayrılır; çizginin başındaki kısa turkuaz
      parça bölümün tek dekoratif işaretidir.
    - Otomatik hareket yoktur; bu yüzden duraklatma denetimi de gerekmez.
      Tek hareket, kaydırmada bir kez oynayan sakin giriş kademesidir.

    Yeni görsel üretilmedi ve bölüme fotoğraf konmadı: tekrar eden altı
    kullanım böylece tamamen ortadan kalktı. */

type Value = { id: string; title: string; body: string };

/* NOT: Bu üç açıklama cümlesi bu turda yazıldı. Şeritte yalnızca üç
   kelime vardı, destekleyici metin yoktu. Cümleler sitenin mevcut
   taahhütleriyle uyumludur; hiçbiri sayı, oran, süre, seans sayısı ya da
   sonuç vaadi içermez. Onaya tabidir — kendi metinlerinizle
   değiştirilebilir. */
const values: Value[] = [
  {
    id: "ozen",
    title: "Özen",
    body: "Randevunuz için ayrılan süre yalnızca uygulamayı değil, öncesindeki hazırlığı ve sonrasındaki konuşmayı da kapsar.",
  },
  {
    id: "uzmanlik",
    title: "Uzmanlık",
    body: "Uygulamayı yapan kişi, size neyi neden önerdiğini açıklayabilen kişidir.",
  },
  {
    id: "guven",
    title: "Güven",
    body: "Bir uygulamanın size uygun olmadığını düşündüğümüzde bunu söyler ve nedenini açıklarız.",
  },
];

export function ExperienceValues() {
  return (
    <section className="degerler" aria-labelledby="degerler-basligi">
      <div className="section-shell degerler__inner">
        <Reveal once className="degerler__head">
          <p className="iletisim-kicker">
            <span className="iletisim-hero__dot" aria-hidden="true" />
            Esteelitta Deneyimi
          </p>

          <h2 className="degerler__title" id="degerler-basligi">
            Nasıl çalıştığımızı{" "}
            <em className="brand-emphasis">üç kelimede</em> toplayabiliriz.
          </h2>
        </Reveal>

        <ol className="degerler__list">
          {values.map((value, index) => (
            <Reveal
              once
              as="li"
              key={value.id}
              className="deger"
              order={index + 1}
            >
              <h3 className="deger__title">{value.title}</h3>
              <p className="deger__body">{value.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
