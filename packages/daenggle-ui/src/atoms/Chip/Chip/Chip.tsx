"use client";

import * as s from "./Chip.css";

export interface ChipProps {
  /** 텍스트 */
  label: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      className={[s.root, className].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
