"use client";

import Image from "next/image";
import * as s from "./EmptyState.css";

interface EmptyStateProps {
  /** 상단에 표시할 일러스트/아이콘 */
  imageUrl?: string;
  /** 타이틀 */
  title?: string;
  /** 디스크립션 */
  description?: string;
}

export function EmptyState({
  imageUrl,
  title = "결과가 없습니다.",
  description = "조건을 변경하거나 다른 검색어로 다시 시도해 보세요.",
}: EmptyStateProps) {
  return (
    <div className={s.root}>
      {imageUrl && (
        <div className={s.imageWrapper}>
          <Image src={imageUrl} alt="empty" width={160} height={160} className={s.image} />
        </div>
      )}
      <h3 className={s.title}>{title}</h3>
      <p className={s.description}>{description}</p>
    </div>
  );
}
