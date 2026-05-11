"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../atoms/Buttons/Button/Button";
import { ProgressCircle } from "../../atoms/ProgressCircle/ProgressCircle";
import { ButtonSize, ButtonStatus } from "../../constants/ButtonVariant";
import * as s from "./style.css";

interface WelcomeOverlayProps {
  onFetchLocation: () => Promise<void>;
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  /** 로고 이미지 경로 */
  logoImageSrc: string;
  /** 로고 이미지 alt 텍스트 */
  logoAlt?: string;
  /** 환영 타이틀 */
  title?: string;
  /** 서브타이틀 설명 */
  subtitle?: string;
  /** 로딩 단계 텍스트 목록 */
  steps: string[];
  /** 준비 완료 버튼 텍스트 */
  ctaText?: string;
  /** 위치 로딩 중 버튼 텍스트 */
  loadingText?: string;
}

export function WelcomeOverlay({
  onFetchLocation,
  latitude,
  longitude,
  isLoading,
  error,
  logoImageSrc,
  logoAlt = "",
  title = "🎉 환영합니다",
  subtitle,
  steps,
  ctaText = "시작하기",
  loadingText = "위치 찾는 중...",
}: WelcomeOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [isVisible, setIsVisible] = useState(true);
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyToAnimate(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReadyToAnimate) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          setCompleted((old) => {
            const updated = [...old];
            updated[prev] = true;
            return updated;
          });
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isReadyToAnimate, steps.length]);

  useEffect(() => {
    if (currentStep === steps.length) {
      onFetchLocation().catch(() => {});
    }
  }, [currentStep, onFetchLocation, steps.length]);

  if (!isVisible) return null;

  const isButtonEnabled = currentStep === steps.length && !isLoading;
  const buttonText = isLoading && currentStep === steps.length ? loadingText : ctaText;
  const buttonStatus = isButtonEnabled ? ButtonStatus.PRIMARY : ButtonStatus.DISABLED;

  return (
    <div className={s.overlay}>
      <div className={s.modalCard}>
        <Image src={logoImageSrc} alt={logoAlt} width={150} height={150} />
        <h2 className={s.title}>{title}</h2>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}

        <ul className={s.checkList}>
          {steps.map((text, i) => (
            <li
              key={i}
              className={`${s.listItem} ${
                (completed[i] || (i === currentStep && isLoading)) && isReadyToAnimate
                  ? s.active
                  : ""
              }`}
            >
              <div className={s.icon}>
                <ProgressCircle
                  size={18}
                  color="#00A63E"
                  progress={isReadyToAnimate ? (completed[i] ? 1 : i === currentStep ? 0.7 : 0) : 0}
                  active={isReadyToAnimate && i === currentStep}
                />
              </div>
              {text}
            </li>
          ))}
        </ul>

        <Button
          size={ButtonSize.MEDIUM}
          status={buttonStatus}
          text={buttonText}
          onClick={() => {
            setIsVisible(false);
          }}
        />

        {error && <p className={s.errorText}>📍 {error}</p>}
      </div>
    </div>
  );
}
