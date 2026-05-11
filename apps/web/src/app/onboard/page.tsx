"use client";

import { Chip, Pagination } from "daenggle-ui";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { slides } from "./_util";
import * as s from "./style.css";

export default function Onboarding() {
  /** router */
  const router = useRouter();

  /** state */
  const [index, setIndex] = useState(0);

  /** variables */
  const total = slides.length;
  const buttonLabel = index === total - 1 ? "로그인하기" : "건너뛰기";

  /** hooks */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  /** click handler */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  /** route handler */
  const goLogin = useCallback(() => {
    router.replace("/login");
  }, [router]);

  /** lifecycle */
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <main className={s.page}>
      <header className={s.topBar}>
        <div aria-hidden />
        <Pagination
          currentPage={index + 1}
          totalPages={total}
          onPageChange={(p) => emblaApi?.scrollTo(p - 1)}
        />
        <button className={s.skip} onClick={goLogin}>
          {buttonLabel}
        </button>
      </header>

      <div ref={emblaRef} className={s.viewport} aria-label="온보딩">
        <div className={s.container}>
          {slides.map(({ src, chip, headline, highlight }, i) => (
            <section key={src} className={s.slide} aria-roledescription="slide">
              <div className={s.top}>
                <Chip label={chip} />
                <h2 className={s.title}>
                  {headline}
                  <br />
                  <b className={s.titleBold}>{highlight}</b>
                </h2>
              </div>

              <div className={s.phone}>
                <Image
                  src={src}
                  alt={chip}
                  fill
                  style={{ objectFit: "contain" }}
                  priority={i === 0}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
