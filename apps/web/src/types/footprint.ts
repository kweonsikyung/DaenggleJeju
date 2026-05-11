/**
 * 발자국(리뷰)의 출입 상태
 * @description
 * - allow: 출입 가능
 * - deny: 출입 불가
 * - detail: 상세 입력 필요
 */
export type EntryStatus = "allow" | "deny" | "detail";

/**
 * 방문 조건
 * @description
 * - leash: 목줄
 * - carrier: 이동가방
 * - leash_free: 목줄 미착용
 * - diaper: 기저귀/매너벨트
 */
export type ConditionType = "leash" | "carrier" | "leash_free" | "diaper";

/**
 * 환영도 점수 (1~5)
 */
export type WelcomeScore = 1 | 2 | 3 | 4 | 5;

/**
 * 발자국(리뷰) 생성 Request
 * @description POST /footprints 요청의 Body 타입
 * @property {number} contentId - 장소 ID
 * @property {EntryStatus} entryStatus - 출입 가능 여부
 * @property {string} [entryStatusDetail] - 출입 상세 정보 (entryStatus가 'detail'일 때만)
 * @property {ConditionType[]} [conditions] - 방문 조건 (선택)
 * @property {WelcomeScore} welcome - 환영도 점수 (1~5)
 * @property {number} rating - 장소 평점 (1~5)
 * @property {string} [body] - 리뷰 본문 (선택, 5~500자)
 */
export interface PostFootprintReq {
  contentId: number;
  entryStatus: EntryStatus;
  entryStatusDetail?: string;
  conditions?: ConditionType[];
  welcome: WelcomeScore;
  rating: number;
  body: string;
}

/**
 * 발자국(리뷰) 생성 Response
 * @description POST /footprints 요청의 성공 응답 타입
 * @property {number} footprintId - 생성된 발자국 ID
 * @property {number} contentId - 장소 ID
 * @property {boolean} created - 생성 여부 (항상 true)
 * @property {string} message - 서버 메시지
 */
export interface PostFootprintRes {
  footprintId: number;
  contentId: number;
  created: boolean;
  message: string;
}

// ================= GET /footprints/my =================

/**
 * 내가 작성한 발자국 목록 조회 Request
 * @description GET /footprints/my 요청의 Query Parameter 타입
 * @property {number} [contentTypeId] - 필터링할 콘텐츠 타입 ID
 * @property {number} [limit] - 한 번에 가져올 개수
 * @property {number} [offset] - 시작 위치
 */
export interface GetMyFootprintsReq {
  contentTypeId?: number;
  limit?: number;
  offset?: number;
}

/**
 * 내가 작성한 발자국 목록의 아이템 타입
 */
export interface MyFootprintItem {
  footprintId: number;
  contentId: number;
  contentType: {
    id: number;
    name: string;
  };
  title: string;
  pet: {
    name: string;
    breedNameKo: string;
    sizeLabelKo: string;
    ageYears: number;
  };
  metaLine: string;
  createdAtText: string;
  thumbnail: string | null;
  chips: string[];
  rating: number;
  body: string;
}

/**
 * 내가 작성한 발자국 목록 조회 Response
 * @description GET /footprints/my 요청의 성공 응답 타입
 * @property {number} total - 전체 개수
 * @property {MyFootprintItem[]} items - 발자국 아이템 배열
 */
export interface GetMyFootprintsRes {
  total: number;
  items: MyFootprintItem[];
}

// ================= GET /footprints/places/{contentId} =================

/**
 * 장소별 발자국 목록 조회 Request
 * @description GET /footprints/places/{contentId} 요청의 Parameter 타입
 * @property {string} contentId - 조회할 장소의 ID (Path Parameter)
 * @property {number} [limit] - 한 번에 가져올 개수
 * @property {number} [offset] - 시작 위치
 */
export interface GetPlaceFootprintsReq {
  contentId: string;
  limit?: number;
  offset?: number;
}

/**
 * 장소별 발자국 목록의 아이템 타입
 */
export interface PlaceFootprintItem {
  footprintId: number;
  writer: {
    userId: number;
    handle: string;
    pet: {
      name: string;
      breedNameKo: string;
      sizeLabelKo: string;
    };
  };
  createdAtText: string;
  chips: string[];
  rating: number;
  body: string;
  isMine: boolean;
}

/**
 * 장소별 발자국 목록 조회 Response
 * @description GET /footprints/places/{contentId} 요청의 성공 응답 타입
 * @property {number} total - 전체 개수
 * @property {PlaceFootprintItem[]} items - 발자국 아이템 배열
 */
export interface GetPlaceFootprintsRes {
  total: number;
  items: PlaceFootprintItem[];
}
