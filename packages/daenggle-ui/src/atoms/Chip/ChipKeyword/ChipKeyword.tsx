"use client";

import Image from "next/image";
import * as s from "./ChipKeyword.css";

export interface ChipKeywordProps {
  /** 칩에 표시될 텍스트 */
  text: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 닫기 아이콘 클릭 이벤트 핸들러 */
  onClose?: () => void;
  /** 칩 전체 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function ChipKeyword({ text, selected = false, onClose, onClick }: ChipKeywordProps) {
  return (
    <div className={s.chip[selected ? "selected" : "default"]} onClick={onClick} role="button">
      <span>{text}</span>
      {selected && (
        <button className={s.closeButton} onClick={onClose} aria-label="닫기">
          <Image src="/assets/icon16/x_line.svg" alt="닫기" width={16} height={16} />
        </button>
      )}
    </div>
  );
}
