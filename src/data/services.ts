export type Service = {
  id: string;
  name: string;
  shortName: string;
  video: string;
  poster: string;
  focalPoint: string;
};

export const services: Service[] = [
  {
    id: "01",
    name: "Lazer Epilasyon",
    shortName: "Lazer",
    video: "/media/services/01-lazer-epilasyon.mp4",
    poster: "/media/posters/01-lazer-epilasyon.jpg",
    focalPoint: "50% 50%",
  },
  {
    id: "02",
    name: "Cilt Bakımı",
    shortName: "Cilt Bakımı",
    video: "/media/services/02-cilt-bakimi.mp4",
    poster: "/media/posters/02-cilt-bakimi.jpg",
    focalPoint: "50% 46%",
  },
  {
    id: "03",
    name: "Bölgesel İncelme",
    shortName: "İncelme",
    video: "/media/services/03-bolgesel-incelme.mp4",
    poster: "/media/posters/03-bolgesel-incelme.jpg",
    focalPoint: "50% 48%",
  },
  {
    id: "04",
    name: "Kalıcı Makyaj",
    shortName: "Kalıcı Makyaj",
    video: "/media/services/04-kalici-makyaj.mp4",
    poster: "/media/posters/04-kalici-makyaj.jpg",
    focalPoint: "50% 44%",
  },
  {
    id: "05",
    name: "Saç Tasarımı",
    shortName: "Saç Tasarımı",
    video: "/media/services/05-sac-tasarimi.mp4",
    poster: "/media/posters/05-sac-tasarimi.jpg",
    focalPoint: "50% 48%",
  },
  {
    id: "06",
    name: "İpek Kirpik",
    shortName: "İpek Kirpik",
    video: "/media/services/06-ipek-kirpik.mp4",
    poster: "/media/posters/06-ipek-kirpik.jpg",
    focalPoint: "50% 45%",
  },
  {
    id: "07",
    name: "Kaş Tasarımı",
    shortName: "Kaş Tasarımı",
    video: "/media/services/07-kas-tasarimi.mp4",
    poster: "/media/posters/07-kas-tasarimi.jpg",
    focalPoint: "50% 44%",
  },
  {
    id: "08",
    name: "El ve Tırnak Bakımı",
    shortName: "El Bakımı",
    video: "/media/services/08-el-tirnak-bakimi.mp4",
    poster: "/media/posters/08-el-tirnak-bakimi.jpg",
    focalPoint: "50% 50%",
  },
];
