"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { ReactNode } from "react";
import * as s from "./Carousel.css";

export interface CarouselProps {
  children: ReactNode;
  /** 아이템 사이의 간격 (단위: px) */
  gap?: number;
  /** 아이템의 높이 (단위: px) */
  itemHeight?: number;
  /** 아이템의 너비 (단위: px) */
  itemWidth?: number;
  /** 컴포넌트 좌우 여백 */
  paddingHoriz?: string | number;
  /** 캐러셀 반복 여부 (무한 스크롤) */
  loop?: boolean;
}

export function Carousel({
  children,
  gap = 16,
  itemHeight,
  itemWidth,
  paddingHoriz,
  loop = false,
}: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: loop,
  });

  return (
    <div className={s.embla} ref={emblaRef}>
      <div
        className={s.embla__container}
        style={{
          gap: `${gap}px`,
          paddingLeft: paddingHoriz,
          paddingRight: paddingHoriz,
        }}
      >
        {React.Children.map(children, (child) => (
          <div
            className={s.embla__slide}
            style={{
              ...(itemHeight ? { height: `${itemHeight}px` } : { height: "auto" }),
              ...(itemWidth ? { flex: `0 0 ${itemWidth}px` } : { flex: "0 0 auto" }),
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
