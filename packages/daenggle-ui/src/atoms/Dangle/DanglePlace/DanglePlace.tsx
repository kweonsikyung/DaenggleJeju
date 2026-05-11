"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import * as s from "./DanglePlace.css";

export interface DanglePlaceIcons {
  /** 재생 수 아이콘 src */
  play?: string;
  /** 북마크 수 아이콘 src */
  bookmark?: string;
  /** 북마크 버튼 활성 상태 아이콘 src */
  bookmarkFilled?: string;
  /** 북마크 버튼 비활성 상태 아이콘 src */
  bookmarkLine?: string;
}

export interface DanglePlaceProps {
  /** 썸네일 이미지 URL */
  thumbnailUrl: string | null;
  /** 이미지 로드 실패 시 대체 이미지 URL */
  fallbackImageUrl?: string;
  /** 위치 및 카테고리 정보 */
  locationCategory: string;
  /** 장소명 */
  name: string;
  /** 거리 */
  distance: string | null;
  /** 재생 수 */
  playCount?: number;
  /** 북마크 수 */
  bookmarkCount?: number;
  /** 태그 목록 */
  tags?: string[];
  /** 카드 확장 여부 */
  isExpanded?: boolean;
  /** 상세 정보 (확장 시) */
  details?: { time: string; price: string };
  /** 상세 정보 기준 레이블 (기본값: "Per day") */
  detailsBaseLabel?: string;
  /** 상세 정보 가격 단위 (기본값: "") */
  detailsPriceUnit?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 북마크 상태 */
  isBookmarked?: boolean;
  /** 북마크 클릭 이벤트 핸들러 */
  onBookmarkClick?: () => Promise<void> | void;
  /** 아이콘 src 모음 */
  icons?: DanglePlaceIcons;
}

export function DanglePlace({
  thumbnailUrl,
  fallbackImageUrl,
  locationCategory,
  name,
  distance,
  playCount,
  bookmarkCount,
  isExpanded = false,
  tags = [],
  details,
  detailsBaseLabel = "Per day",
  detailsPriceUnit = "",
  onClick,
  isBookmarked = false,
  onBookmarkClick,
  icons = {},
}: DanglePlaceProps) {
  const initialImageSrc = useMemo(() => {
    let decoded = thumbnailUrl;
    if (typeof thumbnailUrl === "string" && thumbnailUrl.includes("%")) {
      try {
        decoded = decodeURIComponent(thumbnailUrl);
      } catch {
        decoded = null;
      }
    }

    if (typeof decoded === "string" && /^https?:\/\//i.test(decoded)) {
      return decoded;
    }
    return fallbackImageUrl ?? null;
  }, [thumbnailUrl, fallbackImageUrl]);

  const [currentImageSrc, setCurrentImageSrc] = useState(initialImageSrc);

  useEffect(() => {
    setCurrentImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  const handleImageError = () => {
    if (fallbackImageUrl) setCurrentImageSrc(fallbackImageUrl);
  };

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onBookmarkClick) {
      onBookmarkClick();
    }
  };

  return (
    <div className={s.root[isExpanded ? "isExpanded" : "default"]} onClick={onClick}>
      <div className={s.headerContainer}>
        <div className={s.thumbnailWrapper}>
          {currentImageSrc && (
            <Image
              src={currentImageSrc}
              alt={"이미지"}
              width={80}
              height={80}
              className={s.thumbnail}
              onError={handleImageError}
            />
          )}
        </div>
        <div className={s.contentWrapper}>
          <span className={s.locationCategory}>{locationCategory}</span>
          <h3 className={s.name}>{name}</h3>
          <div className={s.stats}>
            {distance && <span className={s.statValue}>{distance}km</span>}
            {distance && (typeof playCount === "number" || typeof bookmarkCount === "number") && (
              <div className={s.statItem}>·</div>
            )}

            {typeof playCount === "number" && (
              <div className={s.statItem}>
                {icons.play && <Image alt="재생 수" width={12} height={12} src={icons.play} />}
                <span className={s.statValue}>{playCount}</span>
              </div>
            )}

            {typeof playCount === "number" && typeof bookmarkCount === "number" && (
              <div className={s.statItem}>·</div>
            )}

            {typeof bookmarkCount === "number" && (
              <div className={s.statItem}>
                {icons.bookmark && (
                  <Image alt="북마크" width={12} height={12} src={icons.bookmark} />
                )}
                <span className={s.statValue}>{bookmarkCount}</span>
              </div>
            )}
          </div>

          <div className={s.tags}>
            {tags.map((tag, index) => (
              <span key={`${tag}-${index}`} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {onBookmarkClick && (
          <button className={s.bookmarkButton} onClick={handleBookmarkClick}>
            {(icons.bookmarkFilled || icons.bookmarkLine) && (
              <Image
                alt="북마크"
                width={24}
                height={24}
                src={isBookmarked ? (icons.bookmarkFilled ?? "") : (icons.bookmarkLine ?? "")}
              />
            )}
          </button>
        )}
      </div>
      {isExpanded && (
        <div className={s.expandedContent}>
          {details && (
            <div className={s.details}>
              <div className={s.detailsTop}>
                <div>{detailsBaseLabel}</div>
                <div className={s.detailLabel}>{details.time}</div>
              </div>
              <div className={s.detailValue}>
                {details.price}
                {detailsPriceUnit && <span className={s.detailLabel}>{detailsPriceUnit}</span>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
