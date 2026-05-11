"use client";

import * as s from "./FilterChipExpand.css";

export interface FilterChipExpandProps {
  /** 칩의 메인 타이틀 텍스트 */
  title: string;
  /** 칩의 보조 캡션 텍스트 (선택 사항) */
  caption?: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function FilterChipExpand({
  title,
  caption,
  selected = false,
  onClick,
}: FilterChipExpandProps) {
  return (
    <button className={s.root[selected ? "selected" : "default"]} onClick={onClick} role="button">
      <div className={s.textWrapper}>
        <span className={s.title}>{title}</span>
        {caption && <span className={s.caption}>{caption}</span>}
      </div>
    </button>
  );
}
