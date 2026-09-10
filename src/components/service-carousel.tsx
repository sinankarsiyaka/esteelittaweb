"use client";

import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { services, type Service } from "@/data/services";

type LayoutMode = "center" | "phone";

type CarouselLayout = {
  mode: LayoutMode;
  cardWidth: number;
  cardHeight: number;
  radius: number;
  depth: number;
  farDepth: number;
  lift: number;
  lead: number;
  controlGap: number;
  spreadPower: number;
  outerShrink: number;
  offset: number;
  perspective: number;
};

const SLOT_ANGLE = 45;

// 768px'teki tablet kompozisyonundan türetilen oranlar. Sahnenin tamamı
// kart genişliğine bağlandığı için dizilim her genişlikte aynı kalır:
// baskın merkez kart, iki destek kartı, iki kısmi devam kartı.
const RADIUS_RATIO = 1.345;
// Geniş ekranda referanstaki dizilim: kartlar birbirinden ayrılır ve dış
// kartlar kenarlara yaklaşır. Dairesel yay bu oranı tek başına veremediği
// için yatay eşleme |sin|^p ile yassılaştırılır. p ve yarıçap oranı 920px'ten
// 1440px'e doğru rampalanır, böylece tablet kompozisyonu birebir korunur.
const WIDE_RADIUS_RATIO = 1.9;
const WIDE_SPREAD_POWER = 1.76;
const WIDE_OUTER_SHRINK = 0.133;
const DEPTH_RATIO = 0.674;
const FAR_DEPTH_RATIO = 0.247;
const LIFT_RATIO = 0.0808;
const PERSPECTIVE_RATIO = 4.85;

// Tablet ölçeğinin üst sınırı ve 1200px'ten sonra eklenen genişlik.
const BASE_MAX_CARD = 238;
const WIDE_EXTRA_CARD = 102;
// Baskın kartın üst kenarı ortalanmış CTA satırına dayanmasın diye sahne
// aşağı alınır. Merkez kompozisyonun tamamında aynı değerdir; kırılıma bağlı
// olmadığı için 919/920 geçişinde dikey sıçrama oluşturmaz.
const LEAD = 22;
const WIDE_LEAD = 4;

// Kart ile kontrol şeridi arasındaki boşluk. Kısa pencerelerde şerit
// fold'un altına düşmesin diye daralır; 844px ve üzeri yükseklikte 48px.
const CONTROL_GAP_MIN = 24;
const CONTROL_GAP_RANGE = 24;

// Sürükleme: 1 hizmet = 45 derece. 0.19 ile 150-250px'lik normal bir
// sürükleme 28-48 dereceye denk gelir, yani tam olarak bir hizmet.
// Momentum payı yalnızca uzun ve hızlı sürüklemelerde ikinci hizmete
// taşıyacak kadar bırakılmıştır.
const DRAG_SENSITIVITY = { phone: 0.18, center: 0.19 } as const;
// Telefonda flick davranışı korunur; fare sürüklemesinde momentum payı
// yalnızca uzun ve hızlı hareketlerde ikinci hizmete taşıyacak kadardır.
const MOMENTUM_PROJECTION = { phone: 0.08, center: 0.03 } as const;

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Kart posteri /_next/image üzerinden anlık üretilmiyor: ilk istekte
 * optimizer'ın kaynağı (1.7-2.6 MB) o an sıkıştırması iOS Safari'de kartın
 * 130-200ms boş görünmesine yol açıyordu. Bunun yerine build zamanında
 * hazırlanmış, 720px genişliğinde statik WebP dosyaları kullanılır
 * (bkz. public/media/posters/carousel/). Kart geometrisi değişmez.
 */
function carouselPosterUrl(src: string) {
  const stem = src.split("/").pop()!.replace(/\.[^.]+$/, "");
  return `/media/posters/carousel/${stem}.webp`;
}

type DragState = {
  active: boolean;
  pointerId: number | null;
  lastX: number;
  lastTime: number;
  velocity: number;
  // Bırakma sonrası yerleşme (spring) animasyonu sürüyor mu. Yeni merkez
  // kartın videosu yalnızca sürükleme bitip bu da false olduğunda başlar.
  settling: boolean;
};

function getControlGap(viewportHeight: number) {
  return (
    CONTROL_GAP_MIN + clamp01((viewportHeight - 700) / 144) * CONTROL_GAP_RANGE
  );
}

function getLayout(viewportWidth: number, viewportHeight: number): CarouselLayout {
  if (viewportWidth < 650) {
    const cardWidth = Math.min(248, viewportWidth * 0.64);
    return {
      mode: "phone",
      cardWidth,
      cardHeight: cardWidth * 1.43,
      radius: Math.min(270, viewportWidth * 0.68),
      depth: 92,
      farDepth: 55,
      lift: 18,
      lead: 0,
      controlGap: getControlGap(viewportHeight),
      spreadPower: 1,
      outerShrink: 0,
      offset: 0,
      perspective: 920,
    };
  }

  // 650px ve üzerinde tek bir kompozisyon var. 1200px'e kadar tablet
  // ölçeği geçerlidir; sonrasında aynı hiyerarşi geniş ekrana açılır.
  const base = Math.min(BASE_MAX_CARD, viewportWidth * 0.29);
  // 920px'te 0, 1440px'te 1. 919/920 sınırında değeri 0 olduğu için o
  // geçişte hiçbir parametre sıçramaz.
  const wide = clamp01((viewportWidth - 920) / 520);
  // Kart, hero'nun carousel satırına sığmalı; kısa pencerelerde tablet
  // ölçeğinin altına inmeden büyümeyi durdurur.
  const byHeight = (viewportHeight - 300) / 1.43;
  const cardWidth = Math.max(base, Math.min(base + wide * WIDE_EXTRA_CARD, byHeight));

  return {
    mode: "center",
    cardWidth,
    cardHeight: cardWidth * 1.43,
    radius: cardWidth * (RADIUS_RATIO + wide * (WIDE_RADIUS_RATIO - RADIUS_RATIO)),
    depth: cardWidth * DEPTH_RATIO,
    farDepth: cardWidth * FAR_DEPTH_RATIO,
    lift: cardWidth * LIFT_RATIO,
    lead: LEAD + wide * WIDE_LEAD,
    controlGap: getControlGap(viewportHeight),
    spreadPower: 1 + wide * (WIDE_SPREAD_POWER - 1),
    outerShrink: wide * WIDE_OUTER_SHRINK,
    offset: -45,
    perspective: cardWidth * PERSPECTIVE_RATIO,
  };
}

function normalizeAngle(value: number) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function cardAngle(rotation: number, index: number, offset: number) {
  return normalizeAngle(rotation + index * SLOT_ANGLE + offset);
}

/**
 * Merkezdeki kart ile onun iki komşusunun index'lerini döndürür. Yalnızca
 * carousel boştayken (ilk hazır oluşta ve yerleşme tamamlandığında)
 * çağrılır — sürükleme sırasında hiçbir zaman değil — böylece video
 * ön-hazırlığı sürekli genişleyen bir küme yerine sabit, küçük bir kümede
 * kalır (bkz. ServiceCarousel'deki refreshWarmIndices).
 */
function nearIndices(rotation: number, offset: number, total: number) {
  const raw = Math.round(-(rotation + offset) / SLOT_ANGLE);
  const center = ((raw % total) + total) % total;
  const prev = (center - 1 + total) % total;
  const next = (center + 1) % total;
  return [prev, center, next];
}

function getTransform(angle: number, layout: CarouselLayout) {
  const radians = (angle * Math.PI) / 180;
  const distance = Math.abs(angle) / SLOT_ANGLE;

  const sine = Math.sin(radians);
  const x =
    Math.sign(sine) * Math.abs(sine) ** layout.spreadPower * layout.radius;
  const centerProgress = Math.min(distance, 1);
  const outer = Math.max(distance - 1, 0);
  const scale = Math.max(
    1 -
      centerProgress * (layout.mode === "phone" ? 0.28 : 0.22) -
      outer * layout.outerShrink,
    0.2,
  );
  const z = -centerProgress * layout.depth - outer * layout.farDepth;
  const y = centerProgress * layout.lift;
  const yaw = -angle * 0.34;

  return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}deg) scale(${scale})`;
}

function getOpacity(angle: number, mode: LayoutMode) {
  const absolute = Math.abs(angle);
  const full = mode === "center" ? 56 : 22;
  const hidden = mode === "center" ? 104 : 72;

  if (absolute <= full) return 1;
  if (absolute >= hidden) return 0;
  return 1 - (absolute - full) / (hidden - full);
}

function ServiceCard({
  service,
  index,
  rotation,
  interactionTick,
  layout,
  playing,
  warm,
  dragState,
}: {
  service: Service;
  index: number;
  rotation: MotionValue<number>;
  interactionTick: MotionValue<number>;
  layout: CarouselLayout;
  playing: boolean;
  warm: boolean;
  dragState: React.RefObject<DragState>;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const transform = useTransform(rotation, (value) =>
    getTransform(cardAngle(value, index, layout.offset), layout),
  );
  const opacity = useTransform(rotation, (value) =>
    getOpacity(cardAngle(value, index, layout.offset), layout.mode),
  );
  // Merkez kart en üstte, uzaklaştıkça arkaya doğru sıralanır. Değer,
  // sürekli açıya değil "kaç yuva uzakta" olduğuna bağlıdır; böylece
  // z-index yalnızca sıralama gerçekten değiştiğinde yeni bir değer alır.
  const zIndex = useTransform(rotation, (value) => {
    const angle = cardAngle(value, index, layout.offset);
    const slot = Math.min(Math.round(Math.abs(angle) / SLOT_ANGLE), 4);
    return 200 - slot * 10;
  });

  // Medya kaynağının yaşam döngüsü. <video> öğesi `warm` değiştiğinde
  // key üzerinden baştan kurulur: eski öğe DOM'dan çıkar (arabelleği ve
  // dinleyicileriyle birlikte), yeni öğede data-revealed bulunmadığı için
  // poster aynı render'da yeniden görünür olur — efektin çalışmasını
  // beklemeye gerek kalmaz. Bu efekt yalnızca `warm` değiştiğinde çalışır;
  // `warm` de yalnızca ilk viewport ölçümünde ve yerleşme tamamlandığında
  // değişir, yani sürükleme sırasında hiçbir kaynak eklenmez/kaldırılmaz.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let revealed = false;
    const reveal = () => {
      // Videoyu yalnızca kart hâlâ warm iken ve gerçekten bu öğeye bağlı
      // güncel kaynağın ilk karesi hazırken görünür yap. Eski bir kaynağın
      // geç gelen olayı yeni posteri gizleyemez.
      if (revealed || !warm || !video.currentSrc || video.readyState < 2) return;
      revealed = true;
      video.dataset.revealed = "true";
    };

    if (warm) {
      video.addEventListener("loadeddata", reveal);
      video.addEventListener("playing", reveal);

      type VideoWithFrameCallback = HTMLVideoElement & {
        requestVideoFrameCallback?: (callback: () => void) => number;
      };
      (video as VideoWithFrameCallback).requestVideoFrameCallback?.(reveal);

      reveal();
    }

    return () => {
      video.removeEventListener("loadeddata", reveal);
      video.removeEventListener("playing", reveal);
      // Ayrılan öğeyi gerçekten boşalt: önce kaynağı kaldır, sonra load().
      // Kaynak dururken load() çağırmak yeniden indirmeye yol açardı;
      // kaynaksız load() ise readyState'i 0'a düşürür ve arabelleği bırakır.
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [warm]);

  useEffect(() => {
    // Bu kapanıştaki son-uygulanan durumlar: rotasyon her karede değişse
    // de aria-hidden/play/pause komutları yalnızca gerçekten değiştiğinde
    // DOM'a/medyaya yazılır.
    let lastHidden: boolean | undefined;
    let lastFaded: boolean | undefined;
    let lastPlaying: boolean | undefined;
    // Her play/pause yön değişiminde artar (yalnızca play'de değil). Geç
    // gelen bir play() isteği çözüldüğünde bu değer ilerlemişse, aradan
    // başka bir karar geçmiş demektir.
    let requestId = 0;

    const update = (value: number) => {
      const angle = cardAngle(value, index, layout.offset);
      const absAngle = Math.abs(angle);

      const card = cardRef.current;
      if (card) {
        const cardOpacity = getOpacity(angle, layout.mode);
        const hidden = cardOpacity === 0;
        if (hidden !== lastHidden) {
          lastHidden = hidden;
          if (hidden) card.setAttribute("aria-hidden", "true");
          else card.removeAttribute("aria-hidden");
        }

        // Dış halkadaki kartlar kompozisyonun derinlik ipucudur ve
        // opaklıkları 1'in altına iner (dış yuvada ~0.29). Opaklık
        // kartın tamamına uygulandığı için içindeki başlık bunu aşamaz:
        // hiçbir kontrast perdesi o metni okunur yapamaz, yalnızca
        // kartın kendi opaklığını değiştirmek yapabilirdi — o da hero
        // kompozisyonunu değiştirmek olurdu.
        //
        // Bu yüzden okunamayacak kadar solmuş kartın başlığı gizlenir.
        // Kart, görseli ve derinlikteki yeri aynen kalır; yalnızca
        // okunamayan (ve mobilde kelime ortasından kırpılan) metin
        // düşer. Tam opak kartların başlıkları etkilenmez.
        const faded = cardOpacity < 0.9;
        if (faded !== lastFaded) {
          lastFaded = faded;
          if (faded) card.setAttribute("data-faded", "true");
          else card.removeAttribute("data-faded");
        }
      }

      const video = videoRef.current;
      if (!video) return;

      const visibleLimit = layout.mode === "center" ? 58 : 24;
      // Mobilde sürükleme veya yerleşme animasyonu sürerken aynı anda en
      // fazla bir video (zaten oynayan) aktif kalır; gelen kart videosu
      // yalnızca parmak kalkıp yerleşme bittikten sonra başlar.
      const suspendedByDrag =
        layout.mode === "phone" &&
        (dragState.current.active || dragState.current.settling);
      const shouldPlay = playing && !suspendedByDrag && absAngle <= visibleLimit;

      if (shouldPlay === lastPlaying) return;
      lastPlaying = shouldPlay;
      const id = ++requestId;

      if (shouldPlay) {
        video
          .play()
          .then(() => {
            // Safari'de play() isteği beklerken araya giren bir pause()
            // her zaman gerçek oynatmayı engellemez: veri hazır olduğunda
            // video, aradaki pause() çağrısına rağmen başlayabilir. Bu
            // yüzden token eşleşse de eşleşmese de, isteğin sonunda kartın
            // GÜNCEL durumuna göre gerçekten oynaması gerekip gerekmediği
            // yeniden hesaplanır; mobilde sürükleme veya yerleşme hâlâ
            // sürüyorsa video mutlaka duraklatılır.
            const liveAngle = Math.abs(cardAngle(rotation.get(), index, layout.offset));
            const liveSuspended =
              layout.mode === "phone" &&
              (dragState.current.active || dragState.current.settling);
            const stillShouldPlay =
              playing && !liveSuspended && liveAngle <= visibleLimit;

            if (!stillShouldPlay) {
              if (id === requestId) lastPlaying = false;
              video.pause();
            }
          })
          .catch(() => undefined);
      } else {
        video.pause();
      }
    };

    update(rotation.get());
    const unsubscribeRotation = rotation.on("change", update);
    // interactionTick yalnızca sürükleme/yerleşme durumu, rotasyonun kendisi
    // değişmeden değiştiğinde (bkz. bumpInteractionTick) bir kez artar; bu
    // durumlarda da aynı update() en güncel rotasyon değeriyle çalıştırılır.
    const unsubscribeTick = interactionTick.on("change", () => update(rotation.get()));

    return () => {
      unsubscribeRotation();
      unsubscribeTick();
    };
    // `warm` bağımlılıkta: kart yeniden ısındığında <video> öğesi baştan
    // kurulduğu için oynatma kararı yeni öğe üzerinde tekrar verilmelidir
    // (ör. çok yuvalık bir atlayıştan sonra merkeze gelen soğuk kart).
  }, [index, layout.mode, layout.offset, playing, warm, rotation, interactionTick, dragState]);

  return (
    <motion.article
      ref={cardRef}
      className="service-card"
      style={{
        width: layout.cardWidth,
        height: layout.cardHeight,
        marginLeft: -layout.cardWidth / 2,
        transform,
        opacity,
        zIndex,
      }}
    >
      {/* Kaynak yalnızca warm kartlarda bağlıdır; cool kartta src hiç
          render edilmez, böylece öğe gerçekten boş kalır (readyState 0).
          key, warm/cool geçişinde öğeyi baştan kurar. */}
      <video
        key={warm ? "media-warm" : "media-cool"}
        ref={videoRef}
        className="service-card__media"
        src={warm ? service.video : undefined}
        style={{ objectPosition: service.focalPoint }}
        preload={warm ? "auto" : "none"}
        muted
        loop
        playsInline
        disablePictureInPicture
      />
      {/* Poster her kartta koşulsuz render edilir ve hiçbir zaman
          imperative olarak gizlenmez; yalnızca üstündeki video kendi
          güncel kaynağının ilk karesini sunduğunda CSS ile kalkar. */}
      <img
        className="service-card__poster"
        src={carouselPosterUrl(service.poster)}
        alt=""
        aria-hidden="true"
        style={{ objectPosition: service.focalPoint }}
      />
      <div className="service-card__shade" />
      <p className="service-card__title">{service.name}</p>
    </motion.article>
  );
}

export function ServiceCarousel() {
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  // null = sistem tercihini izle. Kullanıcı düğmeye bastığında tercih
  // sabitlenir, böylece azaltılmış hareket açıkken de elle oynatabilir.
  const [autoplay, setAutoplay] = useState<boolean | null>(null);
  // useReducedMotion sunucuda null, istemcide ilk render'da gerçek değeri
  // döndürür. Düğmenin ikonu ve etiketi buna bağlı olduğundan, ölçüm
  // tamamlanana kadar iki tarafta da duraklatılmış hâl render edilir;
  // aksi hâlde hidrasyon uyuşmazlığı oluşur (React #418).
  const playing = ready ? autoplay ?? reducedMotion === false : false;
  const rotation = useMotionValue(0);
  // rotation yalnızca değeri gerçekten değiştiğinde "change" yayınlar.
  // Sürükleme/yerleşme durumu (dragState) rotasyonun kendisi değişmeden de
  // değişebildiği için (ör. yerleşme tam hedefte biterken veya parmak
  // kıpırdamadan indiğinde), kartların oynatma efektini bu durumlarda
  // yeniden tetiklemek için ayrı, her seferinde gerçekten artan bir sinyal
  // kullanılır.
  const interactionTick = useMotionValue(0);
  const bumpInteractionTick = () => interactionTick.set(interactionTick.get() + 1);
  const dragState = useRef<DragState>({
    active: false,
    pointerId: null,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    settling: false,
  });
  // settle() üst üste çağrılırsa (ör. sürükleme bitmeden ok tuşuna
  // basılırsa) yalnızca en güncel çağrının tamamlanma bildirimi geçerli
  // sayılır; eski bir animasyonun geç gelen "bitti" sinyali settling
  // bayrağını yanlışlıkla erken kapatmaz.
  const settleGeneration = useRef(0);
  const layout = getLayout(viewport.width, viewport.height);
  // Ön hazırlığı yalnızca merkez + iki komşuyla sınırlı tutar. Bu küme
  // animasyonun her karesinde değil, yalnızca ilk hazır oluşta (aşağıdaki
  // viewport efekti) ve her yerleşme tamamlandığında (refreshWarmIndices)
  // yeniden hesaplanır.
  const [warmIndices, setWarmIndices] = useState<number[]>([]);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });
      setReady(true);
      // `ready`'e tepki veren ayrı bir efekt yerine gerçek viewport'u
      // doğrudan burada, window'dan okuyarak hesaplanır — bu, React
      // state'ini başka bir state'ten yansıtan bir efekt değil, dış
      // sistemi (pencere boyutu) React'e senkronize eden tek bir efekttir.
      setWarmIndices(nearIndices(rotation.get(), getLayout(width, height).offset, services.length));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [rotation]);

  function refreshWarmIndices() {
    setWarmIndices(nearIndices(rotation.get(), layout.offset, services.length));
  }

  function settle(target: number, velocity = 0) {
    const snapped = Math.round(target / SLOT_ANGLE) * SLOT_ANGLE;
    const generation = ++settleGeneration.current;

    if (reducedMotion) {
      rotation.set(snapped);
      dragState.current.settling = false;
      // Hedef zaten mevcut değere eşitse (ör. kart hareket ettirilmeden
      // bırakıldıysa) rotation.set() "change" yayınlamaz, dolayısıyla
      // kartların play/pause efekti kendiliğinden tetiklenmez. Aynı fonksiyon
      // pointer cancel tarafından da çağrıldığı için bu düzeltme onu da kapsar.
      bumpInteractionTick();
      // Carousel yeniden boşta: ön hazırlık kümesi burada, animasyon
      // sırasında değil, yeniden hesaplanır.
      refreshWarmIndices();
      return;
    }

    dragState.current.settling = true;
    const controls = animate(rotation, snapped, {
      type: "spring",
      duration: 0.5,
      bounce: 0.2,
      velocity,
    });

    void controls.then(() => {
      if (settleGeneration.current === generation) {
        dragState.current.settling = false;
        // Yerleşme bittiğinde rotasyonun kendisi artık değişmiyor, bu yüzden
        // kartların play/pause efekti bir daha tetiklenmez; yeni merkez
        // kartın videosu tam bu anda, yerleşme bittikten hemen sonra başlar.
        bumpInteractionTick();
        // Carousel yeniden boşta: ön hazırlık kümesi burada, animasyon
        // sırasında değil, yeniden hesaplanır.
        refreshWarmIndices();
      }
    });
  }

  function move(direction: -1 | 1) {
    settle(rotation.get() + direction * SLOT_ANGLE);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // İkinci bir parmak veya eski bir pointer olayı, devam eden sürüklemeyi
    // bozmasın diye yalnızca aktif pointer yokken yeni bir sürükleme başlar.
    if (dragState.current.active && event.pointerId !== dragState.current.pointerId) {
      return;
    }

    // Yeni geçerli dokunuş, sürmekte olan yerleşme animasyonunu olduğu
    // konumda durdurur; kontrol gecikmeden parmağa geçer.
    rotation.stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      settling: false,
    };
    // Parmak henüz kıpırdamamış olsa bile oynayan videoyu hemen duraklat;
    // rotation değişmediği sürece kartların efekti kendiliğinden tetiklenmez.
    bumpInteractionTick();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || event.pointerId !== dragState.current.pointerId) {
      return;
    }

    const now = performance.now();
    const deltaX = event.clientX - dragState.current.lastX;
    const elapsed = Math.max(now - dragState.current.lastTime, 8);
    const sensitivity = DRAG_SENSITIVITY[layout.mode];
    rotation.set(rotation.get() + deltaX * sensitivity);
    dragState.current.lastX = event.clientX;
    dragState.current.lastTime = now;
    dragState.current.velocity = (deltaX / elapsed) * 1000;
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || event.pointerId !== dragState.current.pointerId) {
      return;
    }

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const sensitivity = DRAG_SENSITIVITY[layout.mode];
    const projected =
      rotation.get() +
      dragState.current.velocity * sensitivity * MOMENTUM_PROJECTION[layout.mode];
    settle(projected, dragState.current.velocity * sensitivity);
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || event.pointerId !== dragState.current.pointerId) {
      return;
    }
    dragState.current.active = false;
    settle(rotation.get());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") move(1);
    if (event.key === "ArrowRight") move(-1);
  }

  return (
    <div
      className={`service-carousel ${ready ? "is-ready" : ""}`}
      style={
        {
          perspective: layout.perspective,
          "--card-height": `${layout.cardHeight}px`,
          "--carousel-lead": `${layout.lead}px`,
          "--control-gap": `${layout.controlGap}px`,
        } as CSSProperties
      }
    >
      <motion.div
        className="service-carousel__stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-label="Hizmet videoları. Ok tuşlarıyla veya sürükleyerek gezinin."
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            rotation={rotation}
            interactionTick={interactionTick}
            layout={layout}
            playing={playing}
            warm={warmIndices.includes(index)}
            dragState={dragState}
          />
        ))}
      </motion.div>

      <div
        className="carousel-controls"
        role="group"
        aria-label="Hizmet carousel kontrolleri"
      >
        <button
          className="carousel-arrow carousel-pause"
          type="button"
          onClick={() => setAutoplay(!playing)}
          aria-label={playing ? "Videoları duraklat" : "Videoları oynat"}
        >
          {playing ? (
            <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
              <rect x="2" y="1.6" width="3.4" height="10.8" rx="1.1" />
              <rect x="8.6" y="1.6" width="3.4" height="10.8" rx="1.1" />
            </svg>
          ) : (
            <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
              <path d="M3.6 2.1v9.8a1 1 0 0 0 1.53.85l7.7-4.9a1 1 0 0 0 0-1.7l-7.7-4.9A1 1 0 0 0 3.6 2.1Z" />
            </svg>
          )}
        </button>
        <button
          className="carousel-arrow carousel-direction"
          type="button"
          onClick={() => move(1)}
          aria-label="Önceki hizmet"
        >
          <svg viewBox="0 0 64 24" aria-hidden="true"><path d="M60 12H4m7-7-7 7 7 7" /></svg>
        </button>
        <p className="drag-cue">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M12 17V7a2 2 0 0 1 4 0v8-3a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v6c0 5-3 8-8 8h-1c-3 0-5-1.5-7-4l-5-6a2 2 0 0 1 3-3l3 3" />
            <path d="M8 4H3m0 0 2-2M3 4l2 2M22 4h5m0 0-2-2m2 2-2 2" />
          </svg>
          <span>Keşfetmek için sürükleyin</span>
        </p>
        <button
          className="carousel-arrow carousel-direction"
          type="button"
          onClick={() => move(-1)}
          aria-label="Sonraki hizmet"
        >
          <svg viewBox="0 0 64 24" aria-hidden="true"><path d="M4 12h56m-7-7 7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
