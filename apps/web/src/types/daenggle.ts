/**
 * 댕글 API 지역 컨텍스트 ID
 * @description /regions, /preference 엔드포인트에서 사용
 */
export type DaenggleContextId =
  | "PLACE_jeju_si"
  | "PLACE_aeweol"
  | "PLACE_jocheon"
  | "PLACE_seogwipo_si"
  | "PLACE_andeok"
  | "PLACE_seongsan";

/**
 * 댕글 API 정렬 기준
 * @description rank(추천/인기), recent(최신), views(조회수)
 */
export type DaenggleSortType = "rank" | "recent" | "views";

/**
 * 댕글 영상 아이템 공통 타입
 * @description 댕글 API의 items 배열 내 객체 타입
 */
export interface DaenggleVideoItem {
  video_id: string;
  title: string;
  authorName: string;
  playbackUrl: string;
  caption?: string;
  published_at: string;
  isScrapped: boolean;
  scrapCount: number;
  loveCount?: number;
  tags?: string[];
  placePill?: string;
  styles?: string[];
  duration_seconds?: number;
  placeTitle?: string;
}

/**
 * 댕글 영상 목록 공통 응답 'result' 타입
 * @description accommodations, trending, regions, preference, search
 */
export interface DaenggleVideoListResult {
  items: DaenggleVideoItem[];
  nextCursor: string;
  hasMore: boolean;
}

/**
 * 댕글 API 공통 응답 래퍼
 * @template T - 'result' 객체의 타입
 */
export interface DaenggleApiRes<T> {
  code: string;
  message: string;
  result: T;
}

/**
 * 숙소 댕글 영상 조회 Request
 * @description GET /daenggle/accommodations 요청의 Query Parameter 타입
 * @property {DaenggleSortType} sort - 정렬 기준 (rank, recent, views)
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 */
export interface GetDaenggleAccommodationsReq {
  sort: DaenggleSortType;
  limit: number;
  offset: number;
}
/** 숙소 댕글 영상 조회 Response */
export type GetDaenggleAccommodationsRes = DaenggleApiRes<DaenggleVideoListResult>;

/**
 * 트렌딩 댕글 영상 조회 Request
 * @description GET /daenggle/trending 요청의 Query Parameter 타입
 * @property {DaenggleSortType} sort - 정렬 기준
 * @property {number} days - 트렌딩 기간 (최근 N일)
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 */
export interface GetDaenggleTrendingReq {
  sort: DaenggleSortType;
  days: number;
  limit: number;
  offset: number;
}
/** 트렌딩 댕글 영상 조회 Response */
export type GetDaenggleTrendingRes = DaenggleApiRes<DaenggleVideoListResult>;

/**
 * 지역별 댕글 영상 조회 Request
 * @description GET /daenggle/regions 요청의 Query Parameter 타입
 * @property {DaenggleContextId} contextId - 지역 컨텍스트 ID
 * @property {DaenggleSortType} sort - 정렬 기준
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 */
export interface GetDaenggleRegionsReq {
  contextId: DaenggleContextId;
  sort: DaenggleSortType;
  limit: number;
  offset: number;
}
/** 지역별 댕글 영상 조회 Response */
export type GetDaenggleRegionsRes = DaenggleApiRes<DaenggleVideoListResult>;

/**
 * 사용자 선호 기반 댕글 영상 조회 Request
 * @description GET /daenggle/preference 요청의 Query Parameter 타입
 * @property {DaenggleContextId} contextId - 지역 컨텍스트 ID
 * @property {DaenggleSortType} sort - 정렬 기준
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 * @property {string[]} [excludeIds] - 제외할 영상 ID 배열 (선택적)
 */
export interface GetDaengglePreferenceReq {
  contextId: DaenggleContextId;
  sort: DaenggleSortType;
  limit: number;
  offset: number;
  excludeIds?: string[];
}
/** 사용자 선호 기반 댕글 영상 조회 Response */
export type GetDaengglePreferenceRes = DaenggleApiRes<DaenggleVideoListResult>;

/**
 * 댕글 영상 검색 Request
 * @description GET /daenggle/search 요청의 Query Parameter 타입
 * @property {string} q - 검색어 (최소 2자)
 * @property {DaenggleSortType} sort - 정렬 기준
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 */
export interface GetDaenggleSearchReq {
  q: string;
  sort: DaenggleSortType;
  limit: number;
  offset: number;
}
/** 댕글 영상 검색 Response */
export type GetDaenggleSearchRes = DaenggleApiRes<DaenggleVideoListResult>;

/**
 * 컨셉별 댕글 영상 추천 Request
 * @description GET /daenggle/concepts 요청의 Query Parameter 타입
 * @property {DaenggleConceptKey[]} conceptKeys - 조회할 컨셉 키 배열
 * @property {number} limitPerConcept - 컨셉별 최대 영상 개수
 */
export type DaenggleConceptKey =
  | "west_coast_beach"
  | "water_activity"
  | "dog_park"
  | "aeweol_coastal_road"
  | "oreum_hike"
  | "hyeopjae_sunset";

export interface GetDaenggleConceptsReq {
  conceptKeys: DaenggleConceptKey[];
  limitPerConcept: number;
}

/**
 * 컨셉별 댕글 영상 추천 Response
 * @description GET /daenggle/concepts 요청의 성공 응답 타입
 */
export interface DaenggleConceptShelf {
  key: string;
  title: string;
  hashtag?: string;
  items: DaenggleVideoItem[];
}
/**
 * 컨셉별 댕글 영상 추천 Response
 */
export type GetDaenggleConceptsRes = DaenggleApiRes<{
  shelves: DaenggleConceptShelf[];
}>;

/**
 * 장소별 댕글 영상 추천 Request
 * @description GET /daenggle/places/{contentId}/recommendations 요청 타입
 * @property {string} contentId - 장소 ID (Path Parameter)
 * @property {DaenggleSortType} sort - 정렬 기준
 * @property {number} limit - 한 번에 가져올 개수
 * @property {number} offset - 시작 위치
 */
export interface GetDaengglePlaceRecommendationsReq {
  contentId: string; // Path Parameter
  sort: DaenggleSortType;
  limit: number;
  offset: number;
}

/**
 * 장소별 댕글 영상 추천 아이템
 * @description /recommendations 응답 전용 (authorAvatarUrl, thumbUrl 포함)
 */
export type DaengglePlaceRecommendationItem = DaenggleVideoItem & {
  authorAvatarUrl?: string;
  thumbUrl?: string;
};

/**
 * 장소별 댕글 영상 추천 Response 'result' 타입
 */
export interface DaengglePlaceRecommendationsResult {
  total: number;
  placeTitle: string;
  items: { video_id: string; playbackUrl: string }[];
  nextCursor: string;
  hasMore: boolean;
}
/** 장소별 댕글 영상 추천 Response */
export type GetDaengglePlaceRecommendationsRes = DaenggleApiRes<DaengglePlaceRecommendationsResult>;

/**
 * 장소 연관 댕글 영상 리스트 조회 Request
 * @description GET /daenggle/places/all 요청의 Query Parameter 타입 (현재 없음)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetDaengglePlacesAllReq {}

/**
 * 장소 연관 댕글 영상 리스트 아이템
 */
export interface DaengglePlacesAllItem {
  video_id: string;
  placeTitle: string;
}

/**
 * 장소 연관 댕글 영상 리스트 Response 'result' 타입
 */
export interface DaengglePlacesAllResult {
  total: number;
  items: DaengglePlacesAllItem[];
}

/** 장소 연관 댕글 영상 리스트 Response */
export type GetDaengglePlacesAllRes = DaenggleApiRes<DaengglePlacesAllResult>;

/**
 * 지도용 장소 연관 댕글 조회 Request
 * @description GET /daenggle/places/map 요청의 Query Parameter 타입
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetDaengglePlacesMapReq {}

/**
 * 지도용 장소 연관 댕글 영상 아이템
 */
export interface DaengglePlacesMapItem {
  video_id: string;
  playbackUrl: string;
  placeTitle: string;
  mapx: number;
  mapy: number;
}

/**
 * 지도용 장소 연관 댕글 조회 Response 'result' 타입
 */
export type DaengglePlacesMapResult = DaengglePlacesMapItem[];

/** 지도용 장소 연관 댕글 조회 Response */
export type GetDaengglePlacesMapRes = DaenggleApiRes<DaengglePlacesMapResult>;
