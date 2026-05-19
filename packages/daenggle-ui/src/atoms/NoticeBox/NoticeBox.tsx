"use client";

import React from "react";
import { RiAlertLine, RiCloseLine, RiInformationLine } from "react-icons/ri";
import * as s from "./NoticeBox.css";

interface NoticeBoxProps {
  /** NoticeBox를 렌더링할지 여부 */
  shouldRender: boolean;
  /** 현재 애니메이션 상태 ('in', 'out', 'idle') */
  animation: "in" | "out" | "idle";
  /** 닫기 버튼을 눌렀을 때 실행될 함수 */
  onClose: () => void;
  /** 내부에 표시될 텍스트 또는 React 요소 */
  children: React.ReactNode;
  /** 색상 테마 ('yellow' 또는 'blue') */
  variant?: "yellow" | "blue";
}

export const NoticeBox = ({
  shouldRender,
  animation,
  onClose,
  children,
  variant = "yellow",
}: NoticeBoxProps) => {
  if (!shouldRender) {
    return null;
  }

  const animationClass =
    animation === "in" ? s.animateIn : animation === "out" ? s.animateOut : "";

  const themeClass = variant === "blue" ? s.blueTheme : s.yellowTheme;

  return (
    <div
      className={`${s.container} ${themeClass} ${animationClass}`}
      role="alert"
    >
      <div className={s.iconWrapper}>
        {variant === "blue" ? (
          <RiInformationLine color={`${themeClass}`} size={16} />
        ) : (
          <RiAlertLine color={`${themeClass}`} size={16} />
        )}
      </div>
      <p className={s.content}>{children}</p>
      <button
        type="button"
        className={s.closeButton}
        onClick={onClose}
        aria-label="알림 닫기"
      >
        <RiCloseLine size={16} />
      </button>
    </div>
  );
};
