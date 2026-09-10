export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  /** Hizmeti tek nefeste özetleyen mikro bilgi. /hizmetler galerisinde
      başlığın altında küçük, harf aralıklı bir satır olarak okunur. */
  micro: string;
  video: string;
  poster: string;
  focalPoint: string;
  /** Hizmetler ızgarasındaki yatay kırpım için dikey odak. Hero kartları
      focalPoint'i kullanmaya devam eder. Kubbe maskesi sol üstü geniş bir
      yayla kestiği için hizmeti tanıtan detay orta bantta kalmalıdır. */
  tileFocalPoint: string;
  /** Hizmet kartına özel görsel. Tanımlıysa poster yerine bu kullanılır;
      hero video posterleri etkilenmez. */
  tileImage?: string;
  /** /hizmetler galerisine özel görsel: v2 orijinalinden lens oranında
      (268/318) kırpılmış v3 WebP türevi. Yatay kaynaklar dikey lens
      içinde büyütülmesin diye kırpım dosyaya sabitlendi; orijinaller
      v2 klasöründe durmaya devam eder. Ana sayfadaki kartlar tileImage
      (v1) kullanmaya devam eder. */
  sceneImage: string;
  /** Onaylı V4 referansındaki object-position değeri. Kırpım artık
      dosyada olduğu için yalnızca lens oranının mobilde çok az
      farklılaştığı yerdeki payı aynı yöne kaydırır. */
  sceneFocalPoint: string;
  /** /hizmetler düetindeki açıklama. Ana sayfadaki kartlar daha kısa olan
      description alanını kullanmaya devam eder. */
  sceneDescription: string;
  /** Eski galeri kadrajı. Bileşen artık sceneFocalPoint kullanıyor; alan
      ana sayfa dışındaki olası kullanımlar için veri setinde kalıyor. */
  galleryFocalPoint: string;
  /** Yalnızca gerektiğinde: çerçeve içinde kontrollü yakınlaştırma.
      ox/oy sabit kalan noktadır; görüntü oradan büyür. Kaynak dosya
      değişmez. */
  tileFrame?: { zoom: number; ox: string; oy: string };
  /** Ana sayfa v2 kompozisyonuna özel görsel. Yalnızca öne çıkan dört
      hizmette doludur; hero posterleri, /hizmetler galerisi ve kart
      görselleri bu alandan etkilenmez. */
  homeImage?: string;
  /** homeImage'in masaüstü kadrajı. Bileşen bunu figure üzerinde
      --focal olarak yayar; mobilde farklı kadraj gereken panel kuralı
      aynı değişkeni img üzerinde yeniden tanımlar (bkz. globals.css). */
  homeFocalPoint?: string;
};

export const services: Service[] = [
  {
    id: "01",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/01-lazer-epilasyon.webp",
    // Lens dikey kaynağın üst yarısını alıyor; kadraj uygulama başlığında
    // kalmalı.
    sceneFocalPoint: "48% 45%",
    name: "Lazer Epilasyon",
    shortName: "Lazer",
    description: "İstenmeyen tüylere yönelik bakım uygulaması.",
    sceneDescription:
      "İstenmeyen tüylere yönelik, bölgeye özel planlanan bakım uygulaması.",
    micro: "Bölgeye özel · Kişisel planlama",
    video: "/media/services/01-lazer-epilasyon.mp4",
    poster: "/media/posters/01-lazer-epilasyon.jpg",
    focalPoint: "50% 50%",
    tileFocalPoint: "50% 44%",
    galleryFocalPoint: "52% 42%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/01-lazer-epilasyon.png",
    homeImage: "/media/homepage-v2/01-lazer-epilasyon-v1.webp",
    homeFocalPoint: "62% 50%",
  },
  {
    id: "02",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/02-cilt-bakimi.webp",
    // Kadraj fırçanın maskeyi sürdüğü bandı ortalıyor.
    sceneFocalPoint: "50% 43%",
    name: "Cilt Bakımı",
    shortName: "Cilt Bakımı",
    description: "Cilt tipine göre planlanan temizlik ve bakım.",
    sceneDescription:
      "Cilt tipine göre planlanan temizlik, denge ve bakım deneyimi.",
    micro: "Cilt tipine göre · Temizlik & bakım",
    video: "/media/services/02-cilt-bakimi.mp4",
    poster: "/media/posters/02-cilt-bakimi.jpg",
    focalPoint: "50% 46%",
    tileFocalPoint: "52% 46%",
    galleryFocalPoint: "56% 44%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/02-cilt-bakimi.png",
    homeImage: "/media/homepage-v2/02-cilt-bakimi-v1.webp",
    homeFocalPoint: "50% 50%",
  },
  {
    id: "03",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/03-bolgesel-incelme.webp",
    // Geniş kaynaktan dikey lens kesiliyor: kadraj cihaz ve uygulama
    // bölgesinde kalmalı.
    sceneFocalPoint: "47% 52%",
    name: "Bölgesel İncelme",
    shortName: "İncelme",
    description: "Vücut bakımına yönelik bölgesel uygulamalar.",
    sceneDescription:
      "Vücut bakımına yönelik, hedeflenen bölgeye özel uygulamalar.",
    micro: "Vücuda özel · Bölgesel uygulama",
    video: "/media/services/03-bolgesel-incelme.mp4",
    poster: "/media/posters/03-bolgesel-incelme.jpg",
    focalPoint: "50% 48%",
    tileFocalPoint: "50% 50%",
    galleryFocalPoint: "50% 50%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/03-bolgesel-incelme.png",
  },
  {
    id: "04",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/04-kalici-makyaj.webp",
    // Kare kaynak; lens kalemi, kaşı ve yüzü birlikte tutuyor.
    sceneFocalPoint: "51% 43%",
    name: "Kalıcı Makyaj",
    shortName: "Kalıcı Makyaj",
    description: "Kaş, göz ve dudakta kalıcı makyaj uygulaması.",
    sceneDescription:
      "Kaş, göz ve dudakta yüz hatlarıyla uyumlu kalıcı dokunuşlar.",
    micro: "Kaş · Göz · Dudak · Kalıcı dokunuş",
    video: "/media/services/04-kalici-makyaj.mp4",
    poster: "/media/posters/04-kalici-makyaj.jpg",
    focalPoint: "50% 44%",
    tileFocalPoint: "54% 44%",
    galleryFocalPoint: "50% 38%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/04-kalici-makyaj.png",
    homeImage: "/media/homepage-v2/04-kalici-makyaj-v1.webp",
    // Kaynak 2.33 oranında; dört kolonlu (0.89) ve mobil (1.09) kadrajda
    // 50% yatay odakta kare boş havluyla doluyor, kaş sağ kenardan
    // taşıyordu. Odak konuya kaydırıldı.
    homeFocalPoint: "80% 55%",
  },
  {
    id: "05",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/05-sac-tasarimi.webp",
    // Saç kütlesi kadrajın hafif solunda.
    sceneFocalPoint: "45% 47%",
    name: "Saç Tasarımı",
    shortName: "Saç Tasarımı",
    description: "Kesim, renk ve şekillendirme uygulamaları.",
    sceneDescription:
      "Kesim, renk ve şekillendirmeyi buluşturan kişisel saç tasarımı.",
    micro: "Kesim & renk · Şekillendirme",
    video: "/media/services/05-sac-tasarimi.mp4",
    poster: "/media/posters/05-sac-tasarimi.jpg",
    focalPoint: "50% 48%",
    tileFocalPoint: "57% 46%",
    galleryFocalPoint: "58% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/05-sac-tasarimi.png",
    homeImage: "/media/homepage-v2/03-sac-tasarimi-v1.webp",
    // Sabit yükseklikli hizmet bandı 809px altında tek kolona düşüp
    // 2.27 orana çıkıyor; 50% dikey odakta gözler kadraj dışında
    // kalıyordu. Odak yukarı alınınca yüz her kırılımda kadrajda kalır.
    homeFocalPoint: "50% 18%",
  },
  {
    id: "06",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/06-ipek-kirpik.webp",
    // Kadraj göz ve cımbız ucunu merkezde tutuyor.
    sceneFocalPoint: "53% 43%",
    name: "İpek Kirpik",
    shortName: "İpek Kirpik",
    description: "Kirpik uzatma ve dolgunlaştırma uygulaması.",
    sceneDescription:
      "Bakışlara doğal uzunluk ve dengeli dolgunluk kazandıran uygulama.",
    micro: "Uzatma · Dolgunlaştırma",
    video: "/media/services/06-ipek-kirpik.mp4",
    poster: "/media/posters/06-ipek-kirpik.jpg",
    focalPoint: "50% 45%",
    tileFocalPoint: "46% 42%",
    // Dar dikey kesitte kadraj yalnızca göz bandını almalı.
    galleryFocalPoint: "30% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/06-ipek-kirpik.png",
  },
  {
    id: "07",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/07-kas-tasarimi.webp",
    // Geniş kaynaktan dar lens: kadraj yüzün sağ yarısına oturuyor.
    sceneFocalPoint: "62% 47%",
    name: "Kaş Tasarımı",
    shortName: "Kaş Tasarımı",
    description: "Yüz hatlarına göre kaş şekillendirme.",
    sceneDescription:
      "Yüz hatlarına göre ölçülendirilen dengeli kaş şekillendirme.",
    micro: "Yüz hatlarına göre · Şekillendirme",
    video: "/media/services/07-kas-tasarimi.mp4",
    poster: "/media/posters/07-kas-tasarimi.jpg",
    focalPoint: "50% 44%",
    tileFocalPoint: "50% 46%",
    galleryFocalPoint: "44% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/07-kas-tasarimi.png",
  },
  {
    id: "08",
    sceneImage:
      "/media/esteelitta-hizmet-gorselleri-v3/08-el-tirnak-bakimi.webp",
    // Lens iki eli ve bakım aracını birlikte almalı.
    sceneFocalPoint: "50% 54%",
    name: "El ve Tırnak Bakımı",
    shortName: "El Bakımı",
    description: "El ve tırnaklar için bakım uygulamaları.",
    sceneDescription:
      "El ve tırnaklara temiz, bakımlı ve zarif bir görünüm kazandıran uygulamalar.",
    micro: "El & tırnak · Düzenli bakım",
    video: "/media/services/08-el-tirnak-bakimi.mp4",
    poster: "/media/posters/08-el-tirnak-bakimi.jpg",
    focalPoint: "50% 50%",
    tileFocalPoint: "52% 56%",
    galleryFocalPoint: "60% 56%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/08-el-tirnak-bakimi.png",
    // Eller kadrajın sağ altında kalıyor, solda geniş bir havlu boşluğu
    // oluşuyordu. Sağ alt köşeden hafifçe büyütünce eller ortaya geliyor,
    // tırnaklar okunur boyuta çıkıyor.
    tileFrame: { zoom: 1.18, ox: "100%", oy: "100%" },
  },
];

/** Ana sayfada gösterilen hizmetler.

    Seçim kimlik üzerindendir, dizinin ilk dördü değildir: sıra buradaki
    sıradır ve bir hizmeti değiştirmek tek bir id'yi değiştirmek demektir.
    Saç Tasarımı (05) üçüncü, Kalıcı Makyaj (04) dördüncü sırada durur;
    numaralar sıralamayı değil kimliği taşır. */
export const featuredServiceIds = ["01", "02", "05", "04"] as const;

export const featuredServices: Service[] = featuredServiceIds.map((id) => {
  const service = services.find((item) => item.id === id);
  if (!service) {
    throw new Error(`Öne çıkan hizmet bulunamadı: ${id}`);
  }
  return service;
});
