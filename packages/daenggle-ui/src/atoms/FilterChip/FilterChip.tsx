"use client";

import Image from "next/image";
import * as s from "./FilterChip.css";

export interface FilterChipProps {
  /** 칩에 표시될 텍스트 */
  text: string;
  /** 아이콘 URL */
  iconUrl?: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function FilterChip({ text, iconUrl, selected = false, onClick }: FilterChipProps) {
  return (
    <button className={s.chip[selected ? "selected" : "default"]} onClick={onClick} role="button">
      {iconUrl && (
        <div className={s.icon[selected ? "selected" : "default"]}>
          <Image src={iconUrl} alt="" width={16} height={16} />
        </div>
      )}
      <span className={s.text[selected ? "selected" : "default"]}>{text}</span>
    </button>
  );
}
