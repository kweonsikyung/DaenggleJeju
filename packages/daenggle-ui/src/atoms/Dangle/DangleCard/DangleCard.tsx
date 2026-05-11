"use client";

import Image from "next/image";
import * as s from "./DangleCard.css";

export interface DangleCardProps {
  /** 배경 이미지 URL */
  imageUrl: string;
  /** 좋아요(조회수) 수 */
  views?: number;
  /** 조회수 아이콘 src */
  viewIconSrc?: string;
  /** 카드 제목 */
  title: string;
  /** 해시태그 텍스트 */
  hashtag: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function DangleCard({
  imageUrl,
  views = 0,
  viewIconSrc,
  title,
  hashtag,
  onClick,
}: DangleCardProps) {
  return (
    <button className={s.root} onClick={onClick}>
      <div className={s.imageWrapper}>
        <Image src={imageUrl} alt={title} width={280} height={377} className={s.image} />
        <div className={s.overlay}>
          {views > 0 && (
            <div className={s.views}>
              {viewIconSrc && <Image src={viewIconSrc} alt="조회수" width={24} height={24} />}
              <span>{views.toLocaleString()}</span>
            </div>
          )}
          <div className={s.bottom}>
            <h3 className={s.title}>{title}</h3>
            <span className={s.hashtag}>{hashtag}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
