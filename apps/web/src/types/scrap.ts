/** 스크랩 대상의 타입 */
export type ScrapType = "place" | "daenggle";

/**
 * 사용자 본인이 스크랩한 항목 조회 Request
 * @description GET /scraps/my 요청의 Query Parameter 타입
 * @property type - 스크랩 대상 타입 (place | daenggle)
 * @property limit - 한 번에 가져올 스크랩 개수
 * @property offset - 가져올 스크랩의 시작 위치
 */
export interface GetScrapListReq {
  type: ScrapType;
  limit?: number;
  offset?: number;
}

/** 스크랩된 장소 아이템 타입 */
export interface ScrapPlaceItem {
  contentId: number;
  contentType: {
    id: number;
    name: string;
  };
  title: string;
  thumbnail: string | null;
  metaLine: string;
  distanceText: string | null;
  isScrapped: boolean;
  chips: string[];
  scrapCount: number;
}

/** 스크랩된 댕글 아이템 타입 */
export interface ScrapDangleItem {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  durationSeconds: number;
  thumbnailUrl: string;
  watchUrl: string;
  tags: string[];
  styles: string[];
  isScrapped: boolean;
}

/**
 * 사용자 본인이 스크랩한 항목 조회 Response
 * @description GET /scraps/my 요청의 성공 응답 타입
 * @property total - 전체 스크랩 개수
 * @property items - 스크랩된 항목들의 배열

 */
export interface GetScrapListRes {
  total: number;
  items: (ScrapPlaceItem | ScrapDangleItem)[];
}

/**
 * 스크랩을 추가/삭제 Request
 * @description POST /scraps 요청의 Body 타입
 * @property id - 스크랩할 대상의 ID
 * @property type - 스크랩 대상 타입 (place | daenggle)
 */
export interface PostScrapReq {
  id: number;
  type: ScrapType;
}

/**
 * 스크랩을 추가/삭제 Response
 * @description POST /scraps 요청의 성공 응답 타입
 * @property type - 스크랩 대상 타입 (place | daenggle)
 * @property id - 스크랩한 대상의 ID
 * @property scraped - 스크랩 상태 (true: 스크랩 추가됨, false: 스크랩 삭제됨)
 * @property message - 서버에서 반환하는 메시지
 */
export interface PostScrapRes {
  type: ScrapType;
  id: number;
  scraped: boolean;
  message: string;
}
