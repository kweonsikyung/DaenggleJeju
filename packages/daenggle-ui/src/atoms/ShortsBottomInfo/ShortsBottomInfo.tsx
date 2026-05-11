"use client";

import Image from "next/image";
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
  /** 위치 아이콘 src */
  locationIconSrc?: string;
}

export function ShortsBottomInfo({ video, locationIconSrc }: ShortsBottomInfoProps) {
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
          {locationIconSrc && <Image alt="location" width={12} height={12} src={locationIconSrc} />}
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
