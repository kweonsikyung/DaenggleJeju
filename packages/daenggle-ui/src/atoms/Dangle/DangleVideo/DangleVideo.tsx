"use client";

import Image from "next/image";
import * as s from "./DangleVideo.css";

export interface DangleVideoProps {
  /** 썸네일 이미지 URL */
  thumbnailUrl: string;
  /** 제목 텍스트 */
  title: string;
  /** 조회수 */
  views?: number;
  /** 댓글 수 */
  comments?: number;
  /** 업로드 시간 */
  timeAgo?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 해시태그 */
  tags?: string[];
  /** 조회수 아이콘 src */
  viewIconSrc?: string;
  /** 댓글 아이콘 src */
  commentIconSrc?: string;
  /** 재생 버튼 아이콘 src */
  playIconSrc?: string;
}

export function DangleVideo({
  thumbnailUrl,
  title,
  views = 0,
  comments = 0,
  timeAgo,
  tags,
  onClick,
  viewIconSrc,
  commentIconSrc,
  playIconSrc,
}: DangleVideoProps) {
  return (
    <div className={s.root} onClick={onClick}>
      <div className={s.thumbnailWrapper}>
        <Image
          src={thumbnailUrl}
          alt="비디오 썸네일"
          width={70}
          height={90}
          className={s.thumbnail}
        />
      </div>
      <div className={s.contentWrapper}>
        <h3 className={s.title}>{title}</h3>
        {tags && (
          <div className={s.tagWrapper}>
            {tags?.map((tag) => (
              <span key={tag} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={s.stats}>
          <div className={s.statItem}>
            {viewIconSrc && <Image src={viewIconSrc} alt="조회수" width={12} height={12} />}
            <span className={s.statValue}>{views.toLocaleString()}</span>
          </div>
          <span className={s.divider}>·</span>
          <div className={s.statItem}>
            {commentIconSrc && <Image alt="댓글" width={12} height={12} src={commentIconSrc} />}
            <span className={s.statValue}>{comments.toLocaleString()}</span>
          </div>
          {timeAgo && (
            <>
              <span className={s.divider}>·</span>
              <span className={s.timeAgo}>{timeAgo}</span>
            </>
          )}
        </div>
      </div>
      {playIconSrc && (
        <div className={s.playButtonWrapper}>
          <Image src={playIconSrc} alt="재생" width={32} height={32} />
        </div>
      )}
    </div>
  );
}
