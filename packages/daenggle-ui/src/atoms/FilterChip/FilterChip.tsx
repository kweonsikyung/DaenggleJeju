"use client";

import { ReactNode } from "react";
import * as s from "./FilterChip.css";

export interface FilterChipProps {
  /** 칩에 표시될 텍스트 */
  text: string;
  /** 아이콘 (ReactNode) */
  icon?: ReactNode;
  /** @deprecated iconUrl 대신 icon prop을 사용하세요 */
  iconUrl?: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function FilterChip({ text, icon, selected = false, onClick }: FilterChipProps) {
  return (
    <button className={s.chip[selected ? "selected" : "default"]} onClick={onClick} role="button">
      {icon && (
        <div className={s.icon[selected ? "selected" : "default"]}>
          {icon}
        </div>
      )}
      <span className={s.text[selected ? "selected" : "default"]}>{text}</span>
    </button>
  );
}
