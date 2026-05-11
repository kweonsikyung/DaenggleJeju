"use client";

import { ReactNode } from "react";
import * as s from "./Grid.css";

export interface GridProps {
  /** 그리드 내부에 렌더링될 요소들 (gap 16 고정)*/
  children: ReactNode;
  /** 외부에서 주입할 클래스 */
  className?: string;
}

export function Grid({ children, className }: GridProps) {
  const combinedClassName = [s.root, className].filter(Boolean).join(" ");
  return <div className={combinedClassName}>{children}</div>;
}
