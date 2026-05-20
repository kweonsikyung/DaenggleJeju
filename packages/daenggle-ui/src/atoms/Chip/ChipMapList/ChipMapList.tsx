"use client";

import { RiListUnordered } from "react-icons/ri";
import { COLORS } from "@/styles/colors.css";
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
        <RiListUnordered color={COLORS.NEUTRAL100} size={14} />
      </span>
      <div>
        <span className={s.locationListText}>{text}</span>
        <span className={s.locationListCount}>{cnt}</span>
      </div>
    </button>
  );
}
