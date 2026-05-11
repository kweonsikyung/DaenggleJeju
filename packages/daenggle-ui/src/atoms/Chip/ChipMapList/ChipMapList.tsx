"use client";

import Image from "next/image";
import * as s from "./ChipMapList.css";

export interface ChipMapListProps {
  /** 칩 중앙 텍스트 */
  text: string;
  /** 텍스트에 대해 표시할 숫자 */
  cnt: number;
  /** 칩 클릭 핸들러 */
  onLocationListClick: () => void;
}

export function ChipMapList({ text, cnt, onLocationListClick }: ChipMapListProps) {
  return (
    <button className={s.locationListButton} onClick={onLocationListClick}>
      <span>
        <Image src="/assets/icon12/bullet-list_line-white.svg" alt="목록" width={12} height={12} />
      </span>
      <div>
        <span className={s.locationListText}>{text}</span>
        <span className={s.locationListCount}>{cnt}</span>
      </div>
    </button>
  );
}
