"use client";

import Image from "next/image";
import { ReactNode } from "react";
import * as s from "./ShortsBottomInfo.css";

export interface VideoData {
  id: string;
  loc: string;
  videoId: string;
  thumbnailUrl: string;
  profileImageUrl: string;
  userName: string;
  description: string;
  tags: string[];
  bookmarks: number;
  comments: number;
  likes?: number;
}

interface ShortsBottomInfoProps {
  video: VideoData;
  /** 위치 아이콘 */
  locationIcon?: ReactNode;
  /** @deprecated locationIconSrc 대신 locationIcon prop을 사용하세요 */
  locationIconSrc?: string;
}

export function ShortsBottomInfo({ video, locationIcon }: ShortsBottomInfoProps) {
  return (
    <div className={s.bottomInfo}>
      <div className={s.userInfo}>
        <Image
          src={video.profileImageUrl}
          alt={"비디오 정보"}
          width={40}
          height={40}
          className={s.profileImage}
        />
        <div className={s.userName}>{video.userName}</div>
      </div>
      <div className={s.locInfo}>
        <div className={s.location}>
          {locationIcon}
          {video.loc}
        </div>
        <p className={s.description}>{video.description}</p>
        <div className={s.tags}>
          {video.tags.map((tag) => (
            <span key={tag} className={s.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
