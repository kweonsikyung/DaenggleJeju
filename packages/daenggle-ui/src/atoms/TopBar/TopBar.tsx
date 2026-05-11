"use client";

import Image from "next/image";
import { ReactNode } from "react";
import * as s from "./TopBar.css";

export type TopBarProps = {
  /** back 아이콘 핸들러: 주면 자동으로 아이콘 노출 + 핸들러 등록 */
  backIconHandler?: () => void;
  /** 뒤로가기 아이콘 src */
  backIconSrc?: string;
  /** 제목 텍스트 */
  title?: string;
  /** 상단 로고 노출 여부 */
  isShowLogo?: boolean;
  /** 로고 이미지 src (isShowLogo=true 일 때 사용) */
  logoSrc?: string;
  /** 로고 alt 텍스트 */
  logoAlt?: string;
  /** 우측 아이콘들(오른쪽 끝부터 보임) */
  rightIcons?: {
    icon: ReactNode; // 24x24 아이콘
    onClick?: () => void; // 아이콘 클릭
  }[];
  /** 상단 고정 여부 */
  sticky?: boolean;
  /** 배경 투명 여부 */
  transparent?: boolean;
  /** 아이콘 흰색 여부 */
  whiteIcon?: boolean;
  /** 추가 클래스 */
  className?: string;
};

/** TopBar
 * - backIconHandler 있으면 자동으로 back 아이콘 노출
 * - isShowLogo면 logo-top.svg 노출
 * - rightIcons는 오른쪽 끝부터 보이도록 row-reverse 배치
 */
export function TopBar({
  backIconHandler,
  backIconSrc,
  title,
  isShowLogo = false,
  logoSrc,
  logoAlt = "",
  rightIcons = [],
  sticky = false,
  transparent = false,
  whiteIcon = false,
  className,
}: TopBarProps) {
  return (
    <header
      className={[s.root, sticky && s.sticky, transparent && s.transparent, className]
        .filter(Boolean)
        .join(" ")}
      role="banner"
    >
      {/* Left */}
      <div className={s.sideLeft}>
        {backIconHandler ? (
          <button
            type="button"
            className={[s.iconButton, whiteIcon && s.whiteIcon].filter(Boolean).join(" ")}
            onClick={backIconHandler}
            aria-label="뒤로가기"
          >
            {backIconSrc && <Image src={backIconSrc} alt="뒤로가기" width={24} height={24} />}
          </button>
        ) : null}
      </div>

      {/* Center */}
      <div className={s.center} aria-live="polite">
        {isShowLogo && logoSrc ? (
          <Image src={logoSrc} alt={logoAlt} width={72.56} height={24} />
        ) : title ? (
          <div className={s.title} title={title}>
            {title}
          </div>
        ) : null}
      </div>

      {/* Right (오른쪽 끝부터 보이도록 row-reverse) */}
      <nav className={s.sideRight} aria-label="topbar-actions">
        {rightIcons.map(({ icon, onClick }, idx) => (
          <button
            key={idx}
            type="button"
            className={[s.iconButton, whiteIcon && s.whiteIcon].filter(Boolean).join(" ")}
            onClick={onClick}
            aria-label={`action-${idx + 1}`}
          >
            {icon}
          </button>
        ))}
      </nav>
    </header>
  );
}
