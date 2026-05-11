import { PetSizeCode } from "@/types/pet";
import { RegionContextId, StyleCode } from "@/types/preference";

/**
 * 현재 단계에 따른 제목 매핑 객체
 */
export const currentStepTitle: Record<number, string> = {
  1: "반려견과 함께하는 제주 여행,\n어떤 아이인지 알려주세요",
  2: "관심있는 제주 여행지를\n모두 선택해주세요",
  3: "어떤 여행 스타일을 좋아하시나요?",
};

/**
 * 여행지/스타일 옵션 및 매핑 객체
 */
export const BREED_OPTIONS = [
  { id: 1, label: "기타" },
  { id: 2, label: "골든 리트리버" },
  { id: 3, label: "라브라 도트 리트리버" },
  { id: 4, label: "로트와일러" },
  { id: 5, label: "달마시안" },
  { id: 6, label: "도베르만" },
  { id: 7, label: "믹스견" },
  { id: 8, label: "바셋 하운드" },
  { id: 9, label: "버니즈 마운틴 독" },
  { id: 10, label: "보더 콜리" },
  { id: 11, label: "비글" },
  { id: 12, label: "비숑 프리제" },
  { id: 13, label: "불독" },
  { id: 14, label: "사모예드" },
  { id: 15, label: "셔틀랜드 쉽독" },
  { id: 16, label: "시바 이누" },
  { id: 17, label: "시츄" },
  { id: 18, label: "아이리시 세터" },
  { id: 19, label: "아키타" },
  { id: 20, label: "알래스칸 말라뮤트" },
  { id: 21, label: "요크셔테리어" },
  { id: 22, label: "웰시 코기" },
  { id: 23, label: "이탈리안 그레이하운드" },
  { id: 24, label: "잭 러셀 테리어" },
  { id: 25, label: "치와와" },
  { id: 26, label: "코커 스패니얼" },
  { id: 27, label: "푸들" },
  { id: 28, label: "프렌치 불독" },
  { id: 29, label: "허스키" },
];

/**
 * 반려견 무게 옵션 및 매핑 객체
 */
export const WEIGHT_OPTIONS: { label: string; code: PetSizeCode }[] = [
  { label: "소형견 (10kg 미만)", code: "SMALL" },
  { label: "중형견 (6~15kg)", code: "MEDIUM" },
  { label: "대형견 (16~30kg)", code: "LARGE" },
  { label: "초대형견 (30kg 이상)", code: "XLARGE" },
];

/**
 * 여행지 옵션
 */
export const LOCATION_OPTION = [
  { id: 1, title: "제주 전체", desc: "제주 전지역" },
  { id: 2, title: "제주시(도심)", desc: "공항·쇼핑·맛집·야경" },
  { id: 3, title: "애월/한림/한경", desc: "바다·카페·노을" },
  { id: 4, title: "조천/구좌/우도", desc: "해변·자연·드라이브" },
  { id: 5, title: "서귀포시(중문)", desc: "리조트·폭포·올레길" },
  { id: 6, title: "성산/표선/남원", desc: "일출·해변·해녀" },
  { id: 7, title: "안덕/대정", desc: "산방산·해안·마라도" },
];

/**
 * 여행 스타일 옵션
 */
export const STYLE_OPTIONS: string[] = [
  "한적한 장소에서 느긋하게 쉬고 싶어요",
  "반려견이 마음껏 뛰놀았으면 해요",
  "숙소에서 푹 쉬고 여유를 즐기고 싶어요",
  "반려견 동반 가능한 예쁜 카페 투어가 좋아요",
  "반려견과 함께 액티비티 활동을 해보고 싶어요",
];

/**
 * 특정 여행지 선택 관련 상수
 */
export const JEJU_OVERALL_ID = 1;
export const ALL_REGION_IDS = LOCATION_OPTION.map((item) => item.id);
export const ALL_SPECIFIC_REGION_IDS = LOCATION_OPTION.filter(
  (item) => item.id !== JEJU_OVERALL_ID
).map((item) => item.id);

/**
 * LOCATION_OPTION 데이터 매핑 객체
 */
export const REGION_ID_TO_CODE_MAP: Record<number, RegionContextId> = {
  2: "PLACE_jeju_si",
  3: "PLACE_aewol",
  4: "PLACE_jocheon",
  5: "PLACE_seogwipo_si",
  6: "PLACE_seongsan",
  7: "PLACE_andeok",
};

/**
 * STYLE_OPTIONS 데이터 매핑 객체
 */
export const STYLE_LABEL_TO_CODE_MAP: Record<string, StyleCode> = {
  "한적한 장소에서 느긋하게 쉬고 싶어요": "RELAX",
  "반려견이 마음껏 뛰놀았으면 해요": "OUTDOOR",
  "숙소에서 푹 쉬고 여유를 즐기고 싶어요": "RESORT",
  "반려견 동반 가능한 예쁜 카페 투어가 좋아요": "CAFE",
  "반려견과 함께 액티비티 활동을 해보고 싶어요": "ACTIVITY",
};
