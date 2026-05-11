"use client";

import Image from "next/image";
import * as s from "./DangleReview.css";

export interface DangleReviewProps {
  /** [isMine=false] 리뷰 작성자의 프로필 이미지 URL */
  profileImageUrl?: string;
  /** [isMine=false] 프로필 이미지 로드 실패 시 대체 이미지 URL */
  fallbackProfileImageUrl?: string;
  /** [isMine=false] 리뷰 작성자의 이름 */
  userName?: string;
  /** [isMine=false] 리뷰 작성자의 부가 정보 */
  userSubInfo?: string;
  /** [isMine=true] 장소 위치/카테고리 */
  locationCategory?: string;
  /** [isMine=true] 장소명 */
  placeName?: string;
  /** 내가 쓴 리뷰인지 여부 */
  isMine: boolean;
  /** 평점 (1-5 사이의 숫자) */
  rating: number;
  /** 평점 활성 아이콘 src (없으면 ★ 텍스트 사용) */
  filledRatingIconSrc?: string;
  /** 평점 비활성 아이콘 src (없으면 ☆ 텍스트 사용) */
  emptyRatingIconSrc?: string;
  /** 리뷰 작성 날짜 */
  date: string;
  /** 리뷰 칩 값 배열 */
  chips: string[];
  /** 칩 레이블 배열 (chips와 1:1 매핑) */
  chipLabels?: string[];
  /** 리뷰 본문 내용 */
  content: string;
  /** [isMine=true] 카드 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

const RatingDisplay = ({
  rating,
  filledIconSrc,
  emptyIconSrc,
}: {
  rating: number;
  filledIconSrc?: string;
  emptyIconSrc?: string;
}) => {
  return (
    <div className={s.stars}>
      {[...Array(5)].map((_, index) =>
        filledIconSrc || emptyIconSrc ? (
          <Image
            key={index}
            alt={index < rating ? "rating-filled" : "rating-empty"}
            width={16}
            height={16}
            src={index < rating ? (filledIconSrc ?? "") : (emptyIconSrc ?? "")}
          />
        ) : (
          <span key={index}>{index < rating ? "★" : "☆"}</span>
        )
      )}
    </div>
  );
};

export function DangleReview({
  profileImageUrl,
  fallbackProfileImageUrl,
  userName,
  userSubInfo,
  locationCategory,
  placeName,
  isMine,
  rating,
  filledRatingIconSrc,
  emptyRatingIconSrc,
  date,
  chips,
  chipLabels,
  content,
  onClick,
}: DangleReviewProps) {
  const resolvedProfileSrc = profileImageUrl || fallbackProfileImageUrl;

  return (
    <div className={s.root} onClick={onClick}>
      {isMine ? (
        <div className={s.placeInfo}>
          <span className={s.locationCategory}>{locationCategory}</span>
          <div className={s.placeName}>{placeName}</div>
        </div>
      ) : (
        <div className={s.userInfo}>
          {resolvedProfileSrc && (
            <Image
              src={resolvedProfileSrc}
              alt={userName || "user"}
              width={24}
              height={24}
              className={s.profileImage}
            />
          )}
          <div className={s.userInfoText}>
            <span className={s.userName}>{userName}</span>
            {userSubInfo && <span className={s.dogInfo}>{userSubInfo}</span>}
          </div>
        </div>
      )}

      <div className={s.reviewDetails}>
        <div className={s.reviewHeader}>
          <RatingDisplay
            rating={rating}
            filledIconSrc={filledRatingIconSrc}
            emptyIconSrc={emptyRatingIconSrc}
          />
          <span className={s.date}>{date}</span>
        </div>

        {chips.map((chipValue, index) => {
          const label = chipLabels?.[index];
          if (!label) return null;

          return (
            <div key={label} className={s.detailItem}>
              <span className={s.detailLabel}>{label}</span>
              <span className={s.detailValue}>{chipValue}</span>
            </div>
          );
        })}
      </div>

      <p className={s.reviewContent}>{content}</p>
    </div>
  );
}
