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

type LayoutMode = "desktop" | "tablet" | "phone";

type CarouselLayout = {
  mode: LayoutMode;
  cardWidth: number;
  cardHeight: number;
  radius: number;
  depth: number;
  offset: number;
  perspective: number;
};

const SLOT_ANGLE = 45;

function getLayout(viewportWidth: number): CarouselLayout {
  if (viewportWidth < 650) {
    const cardWidth = Math.min(248, viewportWidth * 0.64);
    return {
      mode: "phone",
      cardWidth,
      cardHeight: cardWidth * 1.43,
      radius: Math.min(270, viewportWidth * 0.68),
      depth: 92,
      offset: 0,
      perspective: 920,
    };
  }

  if (viewportWidth < 920) {
    const cardWidth = Math.min(238, viewportWidth * 0.29);
    return {
      mode: "tablet",
      cardWidth,
      cardHeight: cardWidth * 1.43,
      radius: viewportWidth * 0.39,
      depth: 150,
      offset: -45,
      perspective: 1080,
    };
  }

  const cardWidth = Math.min(286, viewportWidth * 0.19);
  return {
    mode: "desktop",
    cardWidth,
    cardHeight: cardWidth * 1.43,
    radius: Math.min(500, viewportWidth * 0.32),
    depth: 230,
    offset: -67.5,
    perspective: 1280,
  };
}

function normalizeAngle(value: number) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function cardAngle(rotation: number, index: number, offset: number) {
  return normalizeAngle(rotation + index * SLOT_ANGLE + offset);
}

function getTransform(angle: number, layout: CarouselLayout) {
  const radians = (angle * Math.PI) / 180;
  const distance = Math.abs(angle) / SLOT_ANGLE;

  if (layout.mode === "desktop") {
    const edgeProgress = Math.min(Math.abs(angle) / 67.5, 1);
    const visibleAngle = Math.max(-67.5, Math.min(67.5, angle));
    const visibleRadians = (visibleAngle * Math.PI) / 180;
    const overflow =
      Math.max(Math.abs(angle) - 67.5, 0) / 45 * layout.cardWidth * 1.5;
    const x =
      Math.sin(visibleRadians) * layout.radius + Math.sign(angle) * overflow;
    const scale = 0.82 + edgeProgress * 0.29;
    const z = -Math.cos(radians) * layout.depth;
    const y = 16 - edgeProgress * 9;
    const yaw = -angle * 0.27;
    const roll = angle * 0.018;

    return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}deg) rotateZ(${roll}deg) scale(${scale})`;
  }

  const x = Math.sin(radians) * layout.radius;
  const centerProgress = Math.min(distance, 1);
  const scale = 1 - centerProgress * (layout.mode === "phone" ? 0.28 : 0.22);
  const z = -centerProgress * layout.depth - Math.max(distance - 1, 0) * 55;
  const y = centerProgress * 18;
  const yaw = -angle * 0.34;

  return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}deg) scale(${scale})`;
}

function getOpacity(angle: number, mode: LayoutMode) {
  const absolute = Math.abs(angle);
  const full = mode === "desktop" ? 112.5 : mode === "tablet" ? 56 : 22;
  const hidden = mode === "desktop" ? 136 : mode === "tablet" ? 104 : 72;

  if (absolute <= full) return 1;
  if (absolute >= hidden) return 0;
  return 1 - (absolute - full) / (hidden - full);
}

function ServiceCard({
  service,
  index,
  rotation,
  layout,
}: {
  service: Service;
  index: number;
  rotation: MotionValue<number>;
  layout: CarouselLayout;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transform = useTransform(rotation, (value) =>
    getTransform(cardAngle(value, index, layout.offset), layout),
  );
  const opacity = useTransform(rotation, (value) =>
    getOpacity(cardAngle(value, index, layout.offset), layout.mode),
  );
  const zIndex = useTransform(rotation, (value) => {
    const angle = Math.abs(cardAngle(value, index, layout.offset));
    if (layout.mode === "desktop") {
      if (angle <= 78) return Math.round(angle * 2 + 100);
      return Math.round(100 - (angle - 78) * 3);
    }
    return Math.round(200 - angle * 2);
  });

  useEffect(() => {
    const updatePlayback = (value: number) => {
      const video = videoRef.current;
      if (!video) return;

      const visibleLimit =
        layout.mode === "desktop" ? 84 : layout.mode === "tablet" ? 58 : 24;
      const shouldPlay =
        Math.abs(cardAngle(value, index, layout.offset)) <= visibleLimit;

      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    updatePlayback(rotation.get());
    return rotation.on("change", updatePlayback);
  }, [index, layout.mode, layout.offset, rotation]);

  return (
    <motion.article
      className="service-card"
      style={{
        width: layout.cardWidth,
        height: layout.cardHeight,
        marginLeft: -layout.cardWidth / 2,
        transform,
        opacity,
        zIndex,
      }}
      aria-label={service.name}
    >
      <video
        ref={videoRef}
        className="service-card__media"
        src={service.video}
        poster={service.poster}
        style={{ objectPosition: service.focalPoint }}
        preload={index < 4 ? "metadata" : "none"}
        muted
        loop
        playsInline
        disablePictureInPicture
      />
      <div className="service-card__shade" />
      <h2 className="service-card__title">{service.name}</h2>
    </motion.article>
  );
}

export function ServiceCarousel() {
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const rotation = useMotionValue(0);
  const dragState = useRef({
    active: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const layout = getLayout(viewportWidth);

  useEffect(() => {
    const update = () => {
      setViewportWidth(window.innerWidth);
      setReady(true);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function settle(target: number, velocity = 0) {
    const snapped = Math.round(target / SLOT_ANGLE) * SLOT_ANGLE;

    if (reducedMotion) {
      rotation.set(snapped);
      return;
    }

    animate(rotation, snapped, {
      type: "spring",
      duration: 0.5,
      bounce: 0.2,
      velocity,
    });
  }

  function move(direction: -1 | 1) {
    settle(rotation.get() + direction * SLOT_ANGLE);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      active: true,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active) return;

    const now = performance.now();
    const deltaX = event.clientX - dragState.current.lastX;
    const elapsed = Math.max(now - dragState.current.lastTime, 8);
    const sensitivity = layout.mode === "phone" ? 0.18 : 0.115;
    rotation.set(rotation.get() + deltaX * sensitivity);
    dragState.current.lastX = event.clientX;
    dragState.current.lastTime = now;
    dragState.current.velocity = (deltaX / elapsed) * 1000;
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const sensitivity = layout.mode === "phone" ? 0.18 : 0.115;
    const projected =
      rotation.get() + dragState.current.velocity * sensitivity * 0.08;
    settle(projected, dragState.current.velocity * sensitivity);
  }

  function handlePointerCancel() {
    if (!dragState.current.active) return;
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
        aria-label="Hizmet videoları. Ok tuşlarıyla veya sürükleyerek gezinin."
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            rotation={rotation}
            layout={layout}
          />
        ))}
      </motion.div>

      <div className="carousel-controls" aria-label="Hizmet carousel kontrolleri">
        <button
          className="carousel-arrow"
          type="button"
          onClick={() => move(1)}
          aria-label="Önceki hizmet"
        >
          ←
        </button>
        <p className="drag-cue">
          <span>Basılı tutup sürükle</span>
          <i aria-hidden="true" />
        </p>
        <button
          className="carousel-arrow"
          type="button"
          onClick={() => move(-1)}
          aria-label="Sonraki hizmet"
        >
          →
        </button>
      </div>
    </div>
  );
}
