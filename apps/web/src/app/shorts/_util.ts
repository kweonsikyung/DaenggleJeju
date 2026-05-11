import { VideoData } from "@/utils/dummyData";

interface DropdownOption {
  value: string;
  label: string;
}

import { getRandomAvatar } from "@/utils/getRandomAvatar";

export const JEJU_REGIONS: DropdownOption[] = [
  { value: "PLACE_jeju_si", label: "제주시(도심)" },
  { value: "PLACE_aeweol", label: "애월/한림/한경" },
  { value: "PLACE_jocheon", label: "조천/구좌/우도" },
  { value: "PLACE_seogwipo_si", label: "서귀포시(도심)" },
  { value: "PLACE_andeok", label: "안덕/대정" },
  { value: "PLACE_seongsan", label: "성산/표선/남원" },
];

type ApiVideoFormat = {
  video_id?: string;
  videoId?: string;
  authorName?: string;
  channelTitle?: string;
  thumbUrl?: string;
  caption?: string;
  title?: string;
  tags?: string[];
  scrapCount?: number;
  loveCount?: number;
  placePill?: string;
};

/**
 * API 응답(DaenggleVideoItem 등)을 클라이언트(VideoData) 타입으로 변환하는 공통 함수
 */
export function formatApiVideoToLocal(video: ApiVideoFormat): VideoData {
  // API마다 다른 키 이름 보정
  const videoId = video.video_id || video.videoId;
  const author = video.authorName || video.channelTitle;
  const _thumb = video.thumbUrl || null;
  const caption = video.caption || video.title;

  return {
    id: videoId as string,
    videoId: videoId as string,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    profileImageUrl: getRandomAvatar(),
    userName: author || "댕글 추천",
    description: caption as string,
    tags: video.tags || [],
    bookmarks: video.scrapCount || 0,
    comments: 0,
    likes: video.loveCount || 0,
    loc: video.placePill || "제주 전체",
  };
}
