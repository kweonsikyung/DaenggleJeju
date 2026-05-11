// 제주도 전체를 포함하는 고정 Bounding Box 좌표
export const JEJU_BBOX = "126.1,33.1,126.9,33.6";

/**
 * 필터칩 ID를 contentTypeId로 매핑하는 객체
 * - 'dangle'은 별도의 contentTypeId가 없으므로 매핑에서 제외
 */
export const FILTER_CHIP_ID_TO_CONTENT_TYPE_ID: Record<string, number> = {
  stay: 32,
  restaurant: 39,
  travel: 12,
  report: 28,
  shopping: 38,
};

/**
 * 필터칩 ID로 contentTypeId 반환
 * - (dangle/없는 경우 undefined 반환)
 * */
export function getContentTypeIdByChipId(chipId: string): number | undefined {
  if (!chipId || chipId === "dangle" || chipId === "filter") return undefined;
  return FILTER_CHIP_ID_TO_CONTENT_TYPE_ID[chipId];
}

/**
 * 필터 옵션 ID를 API 요청에 사용되는 파라미터 값으로 매핑하는 객체
 * - 각 옵션 그룹별로 세부 매핑을 포함
 */
export const FILTER_OPTION_ID_TO_API_PARAM = {
  dogSize: {
    s1: "small",
    s2: "med",
    s3: "large",
    s4: "xlarge",
    s5: "all",
  },
  placeType: {
    p1: "indoor",
    p2: "outdoor",
    p3: "allarea",
  },
  rules: {
    r1: "leash",
    r2: "carrier",
    r3: "leash_free",
    r4: "diaper",
  },
  convenience: {
    c1: "parking",
    c2: "bbq",
    c3: "wifi",
    c4: "takeout",
    c5: "pets_zone",
    c6: "yard",
    c7: "jacuzzi",
  },
} as const;

/**
 * 지도 상단 필터칩 데이터
 */
export const FILTER_CHIPS = [
  {
    id: "filter",
    iconUrl: "/assets/icon16/settings-sliders_line.svg",
    text: "",
  },
  { id: "dangle", text: "댕글", iconUrl: "/assets/icon12/play_filled.svg" },
  { id: "stay", text: "숙소", iconUrl: "/assets/icon12/building.svg" },
  {
    id: "restaurant",
    text: "음식점",
    iconUrl: "/assets/icon12/restaurant_filled.svg",
  },
  { id: "travel", text: "여행지", iconUrl: "/assets/icon12/travel_filled.svg" },
  {
    id: "report",
    text: "레포츠",
    iconUrl: "/assets/icon12/snorkle_filled.svg",
  },
];

/**
 * 지도 마커 이미지 URL 매핑 객체
 * - contentTypeId를 키로 사용하여 각 장소 유형에 맞는 마커 이미지를 지정
 * - 'dangle'은 별도 처리
 */
export const MARKER_IMAGES: Record<string, string> = {
  "32": "/assets/map/pin/stay.svg", // 숙박
  "39": "/assets/map/pin/restaurant.svg", // 음식점
  "12": "/assets/map/pin/travel.svg", // 관광지
  "38": "/assets/map/pin/shopping.svg", // 쇼핑
  "28": "/assets/map/pin/beach.svg", // 레포츠
  dangle: "/assets/map/pin/dangle.svg", // 댕글
};

/**
 * 지도 장소 조회 시 사용되는 옵션 데이터
 * - 각 옵션 그룹별로 다중 선택 가능 여부와 선택지 목록을 포함
 */
export const OPTION_DATA = [
  {
    group: "dogSize",
    title: "반려견 크기",
    multiSelect: true,
    chips: [
      { id: "s1", title: "소형견", caption: "10kg 미만" },
      { id: "s2", title: "중형견", caption: "10~24kg" },
      { id: "s3", title: "대형견", caption: "25~44kg" },
      { id: "s4", title: "초대형견", caption: "45kg 이상" },
      { id: "s5", title: "모든 크기", caption: "(소형~초대형 모두)" },
    ],
  },
  {
    group: "placeType",
    title: "출입 가능 장소",
    multiSelect: true,
    chips: [
      { id: "p1", title: "실내만" },
      { id: "p2", title: "야외만" },
      { id: "p3", title: "모든 구역" },
    ],
  },
  {
    group: "rules",
    title: "출입 조건",
    multiSelect: true,
    chips: [
      { id: "r1", title: "목줄 착용" },
      { id: "r2", title: "이동 가방 사용" },
      { id: "r3", title: "목줄 자유" },
      { id: "r4", title: "강아지 기저귀 착용" },
    ],
  },
  {
    group: "convenience",
    title: "편의",
    multiSelect: true,
    chips: [
      { id: "c1", title: "주차 가능" },
      { id: "c2", title: "바베큐" },
      { id: "c3", title: "무선인터넷" },
      { id: "c4", title: "테이크아웃" },
      { id: "c5", title: "애견 전용 공간" },
      { id: "c6", title: "마당" },
      { id: "c7", title: "자쿠지" },
    ],
  },
];
