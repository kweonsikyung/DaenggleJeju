"use client";

import { FilterChipExpand } from "../../atoms/FilterChipExpand/FilterChipExpand";
import * as s from "./FilterSection.css";

export interface FilterSectionProps {
  /** 섹션 헤더 타이틀 */
  title: string;
  /** 칩 목록 데이터 */
  chips: { id: string; title: string; caption?: string }[];
  /** 다중 선택 가능 여부 */
  multiSelect?: boolean;
  /** 선택된 칩 ID 목록 */
  selectedChips: string[];
  /** 칩 클릭 이벤트 핸들러 */
  onChipClick: (chipId: string) => void;
}

export function FilterSection({
  title,
  chips,
  multiSelect,
  selectedChips,
  onChipClick,
}: FilterSectionProps) {
  return (
    <div className={s.root}>
      <div className={s.title}>
        {title}
        <span className={s.desc}> {multiSelect ? "중복 가능" : undefined}</span>
      </div>
      <div className={s.chipsContainer}>
        {chips.map((chip) => (
          <FilterChipExpand
            key={chip.id}
            title={chip.title}
            caption={chip.caption}
            selected={selectedChips.includes(chip.id)}
            onClick={() => onChipClick(chip.id)}
          />
        ))}
      </div>
    </div>
  );
}
