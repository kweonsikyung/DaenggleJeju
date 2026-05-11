/**
 * 장소의 컨텐츠 타입
 * @property id - 컨텐츠 타입 ID (32=숙박, 39=음식점, 12=관광지, 28=레포츠, 38=쇼핑)
 * @property name - 컨텐츠 타입 이름
 */
export interface ContentType {
  id: number;
  name: string;
}

/**
 * 장소 아이템의 공통 구조
 * @description 장소 목록, 검색 결과 등에 포함된 각 장소의 기본 타입
 * @property contentId - 장소의 고유 ID
 * @property contentType - 장소의 컨텐츠 타입 정보
 * @property title - 장소의 제목
 * @property lat - 장소의 위도
 * @property lng - 장소의 경도
 * @property thumbnail - 썸네일 이미지 URL (없을 경우 null)
 * @property isScrapped - 사용자가 해당 장소를 스크랩했는지 여부
 * @property scrapCount - 해당 장소의 총 스크랩 수
 * @property metaLine - 위치/카테고리 정보 (e.g., "서귀포시 남원읍 · 숙소")
 * @property chips1 - 태그 배열 (e.g., ["마당"])
 * @property chips2 - 태그 배열 (e.g., ["마당"])
 * @property distanceText - 거리 텍스트 (e.g., "4.9km", 없을 경우 null)
 */
export interface PlaceItem {
  contentId: number;
  contentType: ContentType;
  title: string;
  lat: number;
  lng: number;
  thumbnail: string | null;
  isScrapped: boolean;
  scrapCount: number;
  daenggleCount: number;
  metaLine: string;
  chips1?: string[];
  chips2?: string[];
  distanceText: string | null;
}

/******** 장소 목록 조회 - 리스트 ********/

/**
 * 장소 목록 조회 - 리스트 Request
 * @description GET /places/list 요청의 Query Parameter 타입
 * @property contentTypeId - 컨텐츠 타입 ID 필터 (32, 39, 12, 28, 38 중 하나)
 * @property limit - 한 번에 가져올 장소 개수
 * @property offset - 가져올 장소의 시작 위치
 * @property all - true로 설정하면 모든 컨텐츠 타입을 포함 (contentTypeId 무시)
 * @property sizes - 장소 크기 필터 ("small", "med", "large", "xlarge", "all" 중 하나 이상)
 * @property areas - 장소 구역 필터 ("indoor", "outdoor", "allarea" 중 하나 이상)
 * @property conditions - 반려동물 동반 조건 필터 ("leash", "carrier", "leash_free", "diaper" 중 하나 이상)
 * @property amenities - 편의 시설 필터 ("parking", "bbq", "wifi", "takeout", "yard", "pets_zone", "barking_ok", "jacuzzi" 중 하나 이상)
 * @property userLat - 사용자의 현재 위도 (거리 계산용, 선택 사항)
 * @property userLng - 사용자의 현재 경도 (거리 계산용, 선택 사항)
 */
export interface GetPlaceListReq {
  contentTypeId?: number;
  limit?: number;
  offset?: number;
  all?: boolean;
  sizes?: ("small" | "med" | "large" | "xlarge" | "all")[];
  areas?: ("indoor" | "outdoor" | "allarea")[];
  conditions?: ("leash" | "carrier" | "leash_free" | "diaper")[];
  amenities?: (
    | "parking"
    | "bbq"
    | "wifi"
    | "takeout"
    | "yard"
    | "pets_zone"
    | "barking_ok"
    | "jacuzzi"
  )[];
  userLat?: number;
  userLng?: number;
}

/**
 * 장소 목록 조회 - 리스트 Response
 * @description GET /places/list 요청의 성공 응답 타입
 * @property total - 전체 장소 개수
 * @property items - 장소 아이템 배열
 */
export interface GetPlaceListRes {
  total: number;
  items: PlaceItem[];
}

/******** 장소 목록 조회 - 지도 ********/

/**
 * 장소 목록 조회 - 지도 Request
 * @description GET /places/map 요청의 Query Parameter 타입
 * @property bbox - 지도 경계 박스 (형식: "minLng,minLat,maxLng,maxLat")
 * @property contentTypeId - 컨텐츠 타입 ID 필터 (32, 39, 12, 28, 38 중 하나)
 * @property limit - 한 번에 가져올 장소 개수
 * @property sizes - 장소 크기 필터 ("small", "med", "large", "xlarge", "all" 중 하나 이상)
 * @property areas - 장소 구역 필터 ("indoor", "outdoor", "allarea" 중 하나 이상)
 * @property conditions - 반려동물 동반 조건 필터 ("leash", "carrier", "leash_free", "diaper" 중 하나 이상)
 * @property amenities - 편의 시설 필터 ("parking", "bbq", "wifi", "takeout", "yard", "pets_zone", "barking_ok", "jacuzzi" 중 하나 이상)
 */
export interface GetPlaceMapReq {
  bbox: string; // "minLng,minLat,maxLng,maxLat" 형식
  contentTypeId?: number;
  limit?: number;
  sizes?: ("small" | "med" | "large" | "xlarge" | "all")[];
  areas?: ("indoor" | "outdoor" | "allarea")[];
  conditions?: ("leash" | "carrier" | "leash_free" | "diaper")[];
  amenities?: (
    | "parking"
    | "bbq"
    | "wifi"
    | "takeout"
    | "yard"
    | "pets_zone"
    | "barking_ok"
    | "jacuzzi"
  )[];
}

/**
 * 장소 목록 조회 - 지도 Response
 * @description GET /places/map 요청의 성공 응답 타입
 * @property total - 전체 장소 개수
 * @property items - 장소 아이템 배열
 */
export interface GetPlaceMapRes {
  total: number;
  items: PlaceItem[];
}

/******** 장소 검색 ********/

/**
 * 장소 검색 Request
 * @description GET /places/search 요청의 Query Parameter 타입
 * @property q - 검색어 문자열
 * @property contentTypeId - 컨텐츠 타입 ID 필터 (32, 39, 12, 28, 38 중 하나)
 * @property limit - 한 번에 가져올 장소 개수
 * @property offset - 가져올 장소의 시작 위치
 * @property all - true로 설정하면 모든 컨텐츠 타입을 포함 (contentTypeId 무시)
 * @property userLat - 사용자의 현재 위도 (거리 계산용, 선택 사항)
 * @property userLng - 사용자의 현재 경도 (거리 계산용, 선택 사항)
 */
export interface GetPlaceSearchReq {
  q: string;
  contentTypeId?: number;
  limit?: number;
  offset?: number;
  all?: boolean;
  userLat?: number;
  userLng?: number;
}

/**
 * 장소 검색 Response
 * @description GET /places/search 요청의 성공 응답 타입
 * @property total - 검색된 장소의 전체 개수
 * @property items - 검색된 장소 아이템 배열
 */
export interface GetPlaceSearchRes {
  total: number;
  items: PlaceItem[];
}

/******** 장소 단일 정보 조회 ********/

/**
 * 장소 단일 조회 Request
 * @description GET /places/{contentId} 요청의 Parameter 타입
 * @property contentId - 장소의 고유 ID
 * @property userLat - 사용자의 현재 위도 (거리 계산용, 선택 사항)
 * @property userLng - 사용자의 현재 경도 (거리 계산용, 선택 사항)
 */
export interface GetPlaceDetailReq {
  contentId: number;
  userLat?: number;
  userLng?: number;
}

/**
 * 장소 단일 조회 Response
 * @description GET /places/{contentId} 요청의 성공 응답 타입
 * @property contentId - 장소의 고유 ID
 * @property contentType - 장소의 컨텐츠 타입 정보
 * @property title - 장소의 제목
 * @property address - 장소의 주소
 * @property tel - 장소의 전화번호
 * @property homepage - 장소의 홈페이지 URL
 * @property overview - 장소에 대한 개요 설명
 * @property conditions - 반려동물 동반 조건 목록
 * @property isScrapped - 사용자가 해당 장소를 스크랩했는지 여부
 * @property scrapCount - 해당 장소의 총 스크랩 수
 */
export interface GetPlaceDetailRes {
  contentId: number;
  contentType: ContentType;
  title: string;
  address: string;
  tel: string;
  homepage: string;
  overview: string;
  conditions: string[];
  isScrapped: boolean;
  scrapCount: number;
}

/******** 장소 상세 정보 전체 조회 ********/

/**
 * 장소 상세 정보 전체 조회 Request
 * @description GET /places/{contentId}/full 요청의 Parameter 타입
 * @property contentId - 장소의 고유 ID
 * @property userLat - 사용자의 현재 위도 (거리 계산용, 선택 사항)
 * @property userLng - 사용자의 현재 경도 (거리 계산용, 선택 사항)
 */
export interface GetPlaceFullDetailReq {
  contentId: number;
  userLat?: number;
  userLng?: number;
}

export interface ImageItem {
  origin: string;
  thumb: string;
}

export interface PetPolicy {
  acmpyTypeCd: string;
  notes: string[];
}

/**
 * 장소 상세 정보 전체 조회 Response
 * @description GET /places/{contentId}/full 요청의 성공 응답 타입
 * @property title - 장소의 제목
 * @property address - 장소의 주소
 * @property tel - 장소의 전화번호
 * @property openHours - 장소의 운영 시간
 * @property homepage - 장소의 홈페이지 URL
 * @property thumbnail - 썸네일 이미지 URL (없을 경우 null)
 * @property images - 장소 이미지 목록
 * @property chips1 - 칩 목록 1 (e.g., 반려동물 조건)
 * @property chips2 - 칩 목록 2 (e.g., 편의시설)
 * @property petPolicy - 반려동물 동반 정책 상세 설명
 * @property isScrapped - 사용자가 해당 장소를 스크랩했는지 여부
 * @property scrapCount - 해당 장소의 총 스크랩 수
 */
export interface GetPlaceFullDetailRes {
  title: string;
  address: string;
  tel: string;
  openHours: string;
  homepage: string;
  thumbnail: string | null;
  images: ImageItem[];
  chips1: string[];
  chips2: string[];
  petPolicy: PetPolicy;
  isScrapped: boolean;
  scrapCount: number;
}
