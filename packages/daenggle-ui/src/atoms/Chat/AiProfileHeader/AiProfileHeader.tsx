"use client";

import Image from "next/image";
import * as s from "./AiProfileHeader.css";

interface AiProfileHeaderProps {
  /** 프로필 이미지 URL */
  imageUrl: string;
  /** 메인 타이틀 (예: "여행케어 AI") */
  title: string;
  /** 서브 타이틀 (예: "빠르게 찾는 반려견 건강 정보") */
  subtitle: string;
}

export function AiProfileHeader({ imageUrl, title, subtitle }: AiProfileHeaderProps) {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image src={imageUrl} alt={title} width={40} height={40} className={s.profileImage} />
      </div>
      <div className={s.textContainer}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
