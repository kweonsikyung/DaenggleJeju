"use client";

import Image from "next/image";
import * as s from "./Tooltip.css";

export type TooltipPosition = "top" | "left" | "right" | "bottom";

export interface TooltipProps {
  /** 툴팁 제목 */
  title: string;
  /** 툴팁 본문 */
  text?: string;
  /** 닫기 버튼 클릭 이벤트 핸들러 */
  onClose: () => void;
  /** 툴팁 표시 여부 */
  isVisible: boolean;
  /** 툴팁 위치 (기본값: 'top') */
  position?: TooltipPosition;
}

export function Tooltip({ title, text, onClose, isVisible, position = "top" }: TooltipProps) {
  if (!isVisible) return null;

  return (
    <div className={`${s.tooltipWrapper} ${s.positionVariants[position]}`}>
      <div className={s.headerContainer}>
        <span className={s.tooltipTitle}>{title}</span>
        <button className={s.closeButton} onClick={onClose} aria-label="툴팁 닫기">
          <Image src="/assets/icon12/x.svg" alt="닫기" width={16} height={16} />
        </button>
      </div>
      {text && <span className={s.tooltipText}>{text}</span>}
      <div className={s.tooltipArrow}></div>
    </div>
  );
}
