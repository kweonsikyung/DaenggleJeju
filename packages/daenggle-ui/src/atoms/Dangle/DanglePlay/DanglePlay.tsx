"use client";

import Image from "next/image";
import * as s from "./DanglePlay.css";

export interface DanglePlayProps {
  /** 컴포넌트 타입 */
  type: "small" | "medium" | "short";
  /** 컴포넌트 너비 */
  width?: string | number;
  /** 배경 이미지 URL */
  imageUrl: string;
  /** 이미지 로드 실패 시 대체 이미지 URL */
  fallbackImageUrl?: string;
  /** 프로필 이미지 URL */
  profileImageUrl?: string;
  /** 사용자 이름 */
  name?: string;
  /** 위치 정보*/
  location?: string;
  /** 주소 정보*/
  address?: string;
  /** 제목 (medium 타입 전용) */
  title?: string;
  /** 조회수 (medium 타입 전용) */
  views?: number;
  /** 댓글 수 (medium 타입 전용) */
  comments?: number;
  /** 업로드 시간 (medium 타입 전용) */
  timeAgo?: string;
  /** 해시태그 (medium 타입 전용) */
  tags?: string[];
  /** 조회수 아이콘 src */
  viewIconSrc?: string;
  /** 댓글 아이콘 src */
  commentIconSrc?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

export function DanglePlay({
  type,
  width = "100%",
  imageUrl,
  fallbackImageUrl,
  profileImageUrl,
  name,
  location,
  address,
  title,
  views,
  comments,
  timeAgo,
  tags,
  viewIconSrc,
  commentIconSrc,
  onClick,
}: DanglePlayProps) {
  const _isSmall = type === "small";
  const isMedium = type === "medium";
  const isShort = type === "short";

  let imageWidth = 150;
  let imageHeight = 225;
  if (isMedium || isShort) {
    imageWidth = 162;
    imageHeight = 242;
  }

  const isValidImageUrl = typeof imageUrl === "string" && /^https?:\/\//i.test(imageUrl);
  const imageSrc = isValidImageUrl ? imageUrl : (fallbackImageUrl ?? null);

  return (
    <div className={s.root[type]} style={{ width }} onClick={onClick}>
      <div className={s.imageWrapper[type]}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={"이미지"}
            width={imageWidth}
            height={imageHeight}
            className={s.image}
          />
        )}
        {!isShort && profileImageUrl && (
          <div className={s.profileOverlay}>
            <div className={s.profileContainer}>
              <Image
                src={profileImageUrl}
                alt={name ? `${name}의 프로필 이미지` : "프로필 이미지"}
                width={22}
                height={22}
                className={s.profileImage}
              />
              <span className={s.name}>{name}</span>
            </div>
          </div>
        )}
      </div>

      {isMedium && (
        <div className={s.content}>
          <div className={s.textInfo}>
            <div className={s.location}>
              {location}
              {address && (
                <>
                  {" · "}
                  <span className={s.address}>{address}</span>
                </>
              )}
            </div>
            <div className={s.title}>{title}</div>
            <div className={s.tagWrapper}>
              {tags?.map((tag) => (
                <span key={tag} className={s.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {views && (
            <div className={s.stats}>
              <div className={s.statItem}>
                {viewIconSrc && <Image src={viewIconSrc} alt="조회수" width={12} height={12} />}
                <span className={s.statValue}>{views?.toLocaleString()}</span>
              </div>
              <div className={s.statItem}>·</div>
              <div className={s.statItem}>
                {commentIconSrc && <Image alt="댓글" width={12} height={12} src={commentIconSrc} />}
                <span className={s.statValue}>{comments?.toLocaleString()}</span>
              </div>
              <div className={s.statItem}>·</div>
              <div className={s.timeAgo}>{timeAgo}</div>
            </div>
          )}
        </div>
      )}

      {isShort && (
        <div className={s.content}>
          <div className={s.location}>
            {location}
            {address && (
              <>
                {" · "}
                <span className={s.address}>{address}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
