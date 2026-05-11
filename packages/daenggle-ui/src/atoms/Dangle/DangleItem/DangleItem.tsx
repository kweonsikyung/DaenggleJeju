"use client";

import Image from "next/image";
import * as s from "./DangleItem.css";

export interface DangleItemProps {
  /** 아이템의 상태: 'before' 또는 'after' */
  state: "before" | "after";
  /** 아이템에 표시될 이미지 URL */
  imageUrl: string;
  /** 아이템 하단에 표시될 텍스트 */
  text: string;
  /** 클릭 이벤트 핸들러 */
  onClick: () => void;
}

export function DangleItem({ state, imageUrl, text, onClick }: DangleItemProps) {
  return (
    <button type="button" className={s.root} onClick={onClick} aria-label={`${text} 아이템`}>
      <div className={s.imageContainer[state]}>
        <Image src={imageUrl} alt={text} width={70} height={70} className={s.image} />
      </div>
      <span className={s.text}>{text}</span>
    </button>
  );
}
