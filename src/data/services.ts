export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
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
  /** Yalnızca gerektiğinde: çerçeve içinde kontrollü yakınlaştırma.
      ox/oy sabit kalan noktadır; görüntü oradan büyür. Kaynak dosya
      değişmez. */
  tileFrame?: { zoom: number; ox: string; oy: string };
};

export const services: Service[] = [
  {
    id: "01",
    name: "Lazer Epilasyon",
    shortName: "Lazer",
    description: "İstenmeyen tüylere yönelik bakım uygulaması.",
    video: "/media/services/01-lazer-epilasyon.mp4",
    poster: "/media/posters/01-lazer-epilasyon.jpg",
    focalPoint: "50% 50%",
    tileFocalPoint: "50% 44%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/01-lazer-epilasyon.png",
  },
  {
    id: "02",
    name: "Cilt Bakımı",
    shortName: "Cilt Bakımı",
    description: "Cilt tipine göre planlanan temizlik ve bakım.",
    video: "/media/services/02-cilt-bakimi.mp4",
    poster: "/media/posters/02-cilt-bakimi.jpg",
    focalPoint: "50% 46%",
    tileFocalPoint: "52% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/02-cilt-bakimi.png",
  },
  {
    id: "03",
    name: "Bölgesel İncelme",
    shortName: "İncelme",
    description: "Vücut bakımına yönelik bölgesel uygulamalar.",
    video: "/media/services/03-bolgesel-incelme.mp4",
    poster: "/media/posters/03-bolgesel-incelme.jpg",
    focalPoint: "50% 48%",
    tileFocalPoint: "50% 50%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/03-bolgesel-incelme.png",
  },
  {
    id: "04",
    name: "Kalıcı Makyaj",
    shortName: "Kalıcı Makyaj",
    description: "Kaş, göz ve dudakta kalıcı makyaj uygulaması.",
    video: "/media/services/04-kalici-makyaj.mp4",
    poster: "/media/posters/04-kalici-makyaj.jpg",
    focalPoint: "50% 44%",
    tileFocalPoint: "54% 44%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/04-kalici-makyaj.png",
  },
  {
    id: "05",
    name: "Saç Tasarımı",
    shortName: "Saç Tasarımı",
    description: "Kesim, renk ve şekillendirme uygulamaları.",
    video: "/media/services/05-sac-tasarimi.mp4",
    poster: "/media/posters/05-sac-tasarimi.jpg",
    focalPoint: "50% 48%",
    tileFocalPoint: "57% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/05-sac-tasarimi.png",
  },
  {
    id: "06",
    name: "İpek Kirpik",
    shortName: "İpek Kirpik",
    description: "Kirpik uzatma ve dolgunlaştırma uygulaması.",
    video: "/media/services/06-ipek-kirpik.mp4",
    poster: "/media/posters/06-ipek-kirpik.jpg",
    focalPoint: "50% 45%",
    tileFocalPoint: "46% 42%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/06-ipek-kirpik.png",
  },
  {
    id: "07",
    name: "Kaş Tasarımı",
    shortName: "Kaş Tasarımı",
    description: "Yüz hatlarına göre kaş şekillendirme.",
    video: "/media/services/07-kas-tasarimi.mp4",
    poster: "/media/posters/07-kas-tasarimi.jpg",
    focalPoint: "50% 44%",
    tileFocalPoint: "50% 46%",
    tileImage: "/media/esteelitta-hizmet-gorselleri-v1/07-kas-tasarimi.png",
  },
  {
    id: "08",
    name: "El ve Tırnak Bakımı",
    shortName: "El Bakımı",
    description: "El ve tırnaklar için bakım uygulamaları.",
    video: "/media/services/08-el-tirnak-bakimi.mp4",
    poster: "/media/posters/08-el-tirnak-bakimi.jpg",
    focalPoint: "50% 50%",
    tileFocalPoint: "52% 56%",
    tileImage:
      "/media/esteelitta-hizmet-gorselleri-v1/08-el-tirnak-bakimi.png",
    // Eller kadrajın sağ altında kalıyor, solda geniş bir havlu boşluğu
    // oluşuyordu. Sağ alt köşeden hafifçe büyütünce eller ortaya geliyor,
    // tırnaklar okunur boyuta çıkıyor.
    tileFrame: { zoom: 1.18, ox: "100%", oy: "100%" },
  },
];
