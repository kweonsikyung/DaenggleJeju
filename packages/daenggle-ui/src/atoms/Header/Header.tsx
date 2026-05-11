"use client";

import Image from "next/image";
import * as s from "./Header.css";

export interface HeaderProps {
  /** 제목 */
  title: string;
  /** 설명 */
  desc?: string;
  /** 화살표 클릭 핸들러 */
  onArrowClick?: () => void;
  /** 새로고침 클릭 핸들러 */
  onReClick?: () => void;
  /** 컴포넌트 상단 여백 */
  marginTop?: string | number;
}

export function Header({ title, desc, onArrowClick, onReClick, marginTop }: HeaderProps) {
  const hasRightIcon = onArrowClick || onReClick;

  return (
    <div className={s.root} style={{ marginTop }}>
      <div className={s.titleWrapper}>
        <h2 className={s.title}>{title}</h2>
        {hasRightIcon && (
          <button
            className={s.iconButton}
            onClick={onArrowClick || onReClick}
            aria-label={onArrowClick ? "더보기" : "새로고침"}
          >
            <Image
              src={
                onArrowClick ? "/assets/icon24/chevron-right.svg" : "/assets/icon24/rotate-cw.svg"
              }
              alt={onArrowClick ? "화살표 아이콘" : "새로고침 아이콘"}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {desc && <p className={s.desc}>{desc}</p>}
    </div>
  );
}
