"use client";

import React from "react";
import * as s from "./Location.css";

export interface LocationProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** 상단 굵은 타이틀 */
  title: string;
  /** 하단 보조 설명(선택) */
  desc?: string;
  /** 선택 상태 (다중 선택 가능 시 외부에서 관리) */
  selected?: boolean;
  /** 비활성화 */
  disabled?: boolean;
}

export function Location({
  title,
  desc,
  selected = false,
  disabled = false,
  className,
  onClick,
  ...rest
}: LocationProps) {
  const classes = [
    s.root,
    selected ? s.state.selected : s.state.default,
    disabled ? s.state.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      role="checkbox"
      aria-checked={selected}
      data-selected={selected || undefined}
      {...rest}
    >
      <span className={s.title}>{title}</span>
      {desc ? <span className={s.desc}>{desc}</span> : null}
    </button>
  );
}
