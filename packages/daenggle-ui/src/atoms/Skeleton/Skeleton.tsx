import React from "react";
import * as s from "./Skeleton.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 기본 스켈레톤 UI (반짝이는 회색 박스)
 * @param width - CSS width 값 (기본값: 100%)
 * @param height - CSS height 값 (기본값: 1em)
 */
export function Skeleton({ width = "100%", height = "1em", className, style }: SkeletonProps) {
  return (
    <span
      className={`${s.skeleton} ${className || ""}`}
      style={{
        width,
        height,
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
}
