/** Ana sayfanın hero sonrası içeriği tek kaynakta.

    Buradaki hiçbir metin uydurma istatistik, başarı oranı, danışan sayısı,
    ödül, puan ya da tıbbi vaat içermez. Marka ilkeleri /hakkimizda
    sayfasındaki gerçek metinlerden gelir; hizmet adları ve künyeleri
    src/data/services.ts'ten okunur, burada tekrar yazılmaz. */

export type ProcessStep = {
  id: string;
  /** Kartın sol üstündeki büyük rakam. */
  index: string;
  title: string;
  body: string;
  /** Kartın içindeki iki kısa etiket. */
  tags: [string, string];
  image: string;
  /** Sabit yükseklikli banttaki kadraj. */
  focalPoint: string;
  alt: string;
};

/** 5. durak — süreç. Üç adım gerçek çalışma biçimini anlatır; süre, sonuç
    ya da başarı vaadi içermez. */
export const processSteps: ProcessStep[] = [
  {
    id: "01",
    index: "01",
    title: "Sizi dinliyoruz",
    body: "İhtiyacınızı, beklentinizi ve size uygun yaklaşımı birlikte değerlendiriyoruz.",
    tags: ["Ön görüşme", "Beklenti"],
    image: "/media/homepage-v3/01-surec-dinleme-v1.webp",
    focalPoint: "45% 55%",
    alt: "Danışma anını canlandıran temsili görsel: kucakta birleşmiş eller ön planda, dinleyen kişi arkada yumuşak odakta.",
  },
  {
    id: "02",
    index: "02",
    title: "Kişisel plan oluşturuyoruz",
    body: "Uygulamayı ihtiyaçlarınıza göre planlıyor ve süreci açık şekilde anlatıyoruz.",
    tags: ["Planlama", "Bilgilendirme"],
    image: "/media/homepage-v3/02-surec-planlama-v1.webp",
    focalPoint: "50% 62%",
    alt: "Planlama anını canlandıran temsili görsel: taş tezgâhta açık bir deftere not alan eller, yanında katlanmış havlu ve seramik kâse.",
  },
  {
    id: "03",
    index: "03",
    title: "Süreci ve bakım sonrasını takip ediyoruz",
    body: "Uygulama sonrasında bakım ve takip konusunda yanınızda kalıyoruz.",
    tags: ["Bakım", "Takip"],
    image: "/media/homepage-v3/03-surec-takip-v1.webp",
    focalPoint: "52% 40%",
    alt: "Uygulama sonrası bilgilendirmeyi canlandıran temsili görsel: koltukta dinlenen bir kişi ve yanında ayakta duran uygulayıcı.",
  },
];

export type Principle = { id: string; title: string; body: string };

/** 6. durak — danışan deneyimi. Gerçek ve onaylanmış danışan yorumumuz
    bulunmadığı için bu alanda isim, meslek, fotoğraf, puan ya da yorum
    üretilmez; bölüm marka ilkelerini anlatır. */
export const experienceLead =
  "Deneyimi bir uygulama değil, kapıdan girdiğiniz andan çıkışınıza kadar süren bir düzen olarak kuruyoruz.";

export const principles: Principle[] = [
  {
    id: "zaman",
    title: "Acele etmeyen randevu",
    body: "Randevular birbirine yapıştırılmaz. Uygulama kadar hazırlık ve sonrasındaki konuşma için de zaman ayrılır.",
  },
  {
    id: "aciklik",
    title: "Sorulmadan anlatmak",
    body: "Hangi adımın neden atıldığını, hangi ürünün neden seçildiğini siz sormadan anlatırız.",
  },
  {
    id: "sinir",
    title: "Hayır diyebilmek",
    body: "Size uygun olmayan bir uygulamayı önermeyiz. Uygun olmadığını düşündüğümüzde nedenini açıklarız.",
  },
  {
    id: "sonrasi",
    title: "Uygulamadan sonrası",
    body: "İş, siz çıktığınızda bitmiyor. Bakımın nasıl sürdürüleceğini birlikte konuşur, sonrasında da ulaşılabilir kalırız.",
  },
];

export type Faq = { id: string; question: string; answer: string };

/** 7. durak — sık sorulan sorular. Sorular gerçek randevu, hazırlık ve
    bakım sonrası sürecinden gelir. Hiçbir yanıt tıbbi garanti, kesin
    sonuç, seans sayısı taahhüdü ya da doğrulanmamış vaat içermez. */
export const faqs: Faq[] = [
  {
    id: "randevu",
    question: "Randevu nasıl alınıyor?",
    answer:
      "İletişim sayfasındaki telefon ya da e-posta üzerinden ulaşabilirsiniz. Hangi uygulamayı düşündüğünüzü konuşup size uygun günü birlikte belirliyoruz.",
  },
  {
    id: "hazirlik",
    question: "İlk randevuya nasıl hazırlanmalıyım?",
    answer:
      "Özel bir hazırlık gerekmiyor. Uygulamaya göre değişen noktalar varsa randevudan önce ayrıca anlatıyoruz. Kullandığınız ürünleri ve cildinizle ilgili bildiklerinizi paylaşmanız planlamayı kolaylaştırır.",
  },
  {
    id: "sure",
    question: "Bir uygulama ne kadar sürüyor?",
    answer:
      "Süre uygulamaya ve bölgeye göre değişir. Randevuyu planlarken o uygulama için ayrılan süreyi önceden söylüyoruz, böylece gününüzü ona göre ayarlayabilirsiniz.",
  },
  {
    id: "aralik",
    question: "Seans aralıkları nasıl belirleniyor?",
    answer:
      "Aralık, uygulamanın türüne ve cildinizin verdiği tepkiye göre birlikte belirlenir. Önceden sabit bir seans sayısı vermek yerine süreci adım adım değerlendiriyoruz.",
  },
  {
    id: "sonrasi",
    question: "Uygulamadan sonra nelere dikkat etmeliyim?",
    answer:
      "Uygulama sonrası bakım önerilerini çıkışta anlatıyor, gerekirse yazılı olarak paylaşıyoruz. Aklınıza sonradan bir soru gelirse aramanız yeterli.",
  },
  {
    id: "iptal",
    question: "Randevumu değiştirebilir veya iptal edebilir miyim?",
    answer:
      "Elbette. Planınız değiştiğinde mümkün olduğunca önceden haber vermeniz, hem sizin hem de sıradaki randevunun rahat ilerlemesini sağlıyor.",
  },
];
