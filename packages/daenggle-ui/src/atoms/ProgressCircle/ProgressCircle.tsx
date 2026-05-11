"use client";

import * as s from "./style.css";

interface ProgressCircleProps {
  size?: number;
  color?: string;
  progress?: number;
  active?: boolean;
  className?: string;
}

export function ProgressCircle({
  size = 24,
  color = "#00A63E",
  progress = 0,
  active = false,
  className = "",
}: ProgressCircleProps) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg className={`${s.circleBase} ${className}`} width={size} height={size} viewBox="0 0 24 24">
      {/* 회색 배경 링 */}
      <circle cx="12" cy="12" r={radius} stroke="#E0E0E0" strokeWidth="3" fill="none" />
      {/* 진행 링 */}
      <circle
        className={`${s.progressRing} ${active ? s.active : ""}`}
        cx="12"
        cy="12"
        r={radius}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
