"use client";

import Image from "next/image";
import * as s from "./style.css";

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  description: string;
  details: string;
  onEditClick?: () => void;
  className?: string;
}

/**
 * 사용자/반려동물 프로필 정보를 보여주는 카드 컴포넌트
 */
export const ProfileCard = ({
  imageUrl,
  name,
  description,
  details,
  onEditClick,
  className,
}: ProfileCardProps) => {
  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.profileInfo}>
        <Image src={imageUrl} alt={name} width={48} height={48} className={s.avatar} />
        <div className={s.textInfo}>
          <div className={s.nameLine}>
            <span className={s.name}>{name}</span>
            <span className={s.description}>{description}</span>
          </div>
          <span className={s.details}>{details}</span>
        </div>
      </div>
      <button className={s.editButton} onClick={onEditClick}>
        <Image src="/assets/icon16/pencil_line.svg" alt="수정" width={16} height={16} />
      </button>
    </div>
  );
};
