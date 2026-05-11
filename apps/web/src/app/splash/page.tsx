"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as s from "./style.css";

/**
 * 스플래시 (앱 엔트리)
 */
export default function Splash() {
  /** router */
  const router = useRouter();

  /** state */
  const [show, setShow] = useState(true);

  /** useEffect */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stayDuration = reduce ? 600 : 1400; // 스플래시 유지 시간
    const transitionDuration = reduce ? 300 : 600; // 전환 애니메이션 시간

    const t1 = setTimeout(() => {
      setShow(false); // 애니메이션 트리거
      setTimeout(() => router.replace("/onboard"), transitionDuration);
    }, stayDuration);

    return () => clearTimeout(t1);
  }, [router]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={s.wrap}
          role="dialog"
          aria-label="앱 시작 중"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Image
            src="/assets/onboarding/splash.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className={s.logoWrap}>
            <motion.div
              initial={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image
                src="/assets/logo/logo.png"
                alt="댕글제주"
                width={270}
                height={94}
                className={s.logo}
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
