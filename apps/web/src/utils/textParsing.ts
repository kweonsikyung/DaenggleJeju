/**
 * @file utils/textParsing.ts
 * @description 텍스트 파싱 관련 유틸 함수 모음
 */

/**
 * @function extractHashtags
 * @description title 문자열에서 해시태그(#태그)를 추출하고, 원본 title에서 태그를 제거
 */
export function extractHashtags(title: string): {
  cleanTitle: string;
  tags: string[];
} {
  if (!title) {
    return { cleanTitle: "", tags: [] };
  }
  const regex = /#([a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/g;
  const tags: string[] = [];
  const matches = title.matchAll(regex);
  for (const match of matches) {
    tags.push(match[1]);
  }
  const cleanTitle = title.replace(regex, "").replace(/\s\s+/g, " ").trim();
  return { cleanTitle, tags };
}

/**
 * 구체적인 상호명, 관광 명소, 오름, 해변 이름
 */
const SPECIFIC_PLACE_KEYWORDS = [
  "9.81파크",
  "카페글렌코",
  "카페봄날",
  "카페콜라",
  "카페마니",
  "델문도",
  "랜디스도넛",
  "레이지펌프",
  "마노르블랑",
  "명월국민학교",
  "몽상드애월",
  "미쁜제과",
  "바다다",
  "바람벽에흰당나귀",
  "백약이오름",
  "새빌",
  "서연의집",
  "서귀다원",
  "아라파파",
  "에이팩토리",
  "오르다",
  "오설록",
  "우무",
  "원앤온리",
  "인스밀",
  "지금이순간",
  "테라로사",
  "하이엔드제주",
  "호박다방",

  "가시아방국수",
  "고집돌우럭",
  "네거리식당",
  "덕성원",
  "돈백",
  "돈사돈",
  "돔베돈",
  "맛나식당",
  "명진전복",
  "모닥식탁",
  "문쏘",
  "밥깡패",
  "붉은못허브팜",
  "삼성혈해물탕",
  "산방식당",
  "삼대국수회관",
  "숙성도",
  "순옥이네명가",
  "수우동",
  "슬슬슬로우",
  "오는정김밥",
  "오롯",
  "올래국수",
  "용이식당",
  "우진해장국",
  "자매국수",
  "춘심이네",
  "칠돈가",
  "흑돈가",
  "해월정",

  "1100고지",
  "거문오름",
  "갯깍주상절리",
  "곶자왈",
  "금오름",
  "다랑쉬오름",
  "더마파크",
  "도두봉",
  "동문시장",
  "러브랜드",
  "만장굴",
  "무민랜드",
  "백록담",
  "본태박물관",
  "빛의벙커",
  "비자림",
  "사려니숲길",
  "산굼부리",
  "삼다수숲길",
  "상효원",
  "새별오름",
  "서커스월드",
  "성산일출봉",
  "성이시돌목장",
  "섭지코지",
  "송악산",
  "수월봉",
  "스누피가든",
  "신창풍차해안도로",
  "신화월드",
  "아부오름",
  "아쿠아플라넷",
  "안돌오름",
  "아르떼뮤지엄",
  "에코랜드",
  "엉또폭포",
  "외돌개",
  "용눈이오름",
  "용두암",
  "용머리해안",
  "유리의성",
  "이니스프리",
  "절물자연휴양림",
  "제주돌문화공원",
  "제주민속촌",
  "주상절리",
  "천지연폭포",
  "정방폭포",
  "카멜리아힐",
  "따라비오름",
  "판포포구",
  "한라산",
  "헬로키티아일랜드",
  "휴애리",

  "곽지해수욕장",
  "광치기해변",
  "김녕해수욕장",
  "논짓물",
  "사계해변",
  "삼양해수욕장",
  "세화해변",
  "신양해변",
  "월정리해변",
  "이호테우해변",
  "종달리",
  "중문색달해변",
  "표선해비치",
  "하모해수욕장",
  "함덕해수욕장",
  "한담해변",
  "화순금모래",
  "황우지해안",
  "협재해수욕장",
  "금능해수욕장",

  "누웨마루거리",
  "모슬포",
  "보성시장",
  "서귀포매일올레시장",
  "올레시장",
  "위미항",
  "제주시청",
  "흑돼지거리",
];

/**
 *  넓은 지역명 (읍, 면, 동 및 주요 권역)
 */
const BROAD_REGION_KEYWORDS = [
  "애월",
  "한림",
  "구좌",
  "성산",
  "우도",
  "표선",
  "안덕",
  "중문",
  "대정",
  "한경",
  "조천",
  "월정리",
  "세화",
  "김녕",
  "함덕",
  "이호테우",
  "사계리",
  "모슬포",
  "남원읍",
  "연동",
  "노형동",
  "서귀포시",
  "서귀포",
];

/**
 * @function findLocationInfo
 * @description title에서 '자세한 장소'와 '넓은 지역' 키워드를 각각 찾아 반환
 * @param title - 검색할 제목 문자열
 * @returns {{ place: string | null, region: string | null }}
 */
export function findLocationInfo(title: string): {
  place: string | null;
  region: string | null;
} {
  if (!title) {
    return { place: null, region: null };
  }

  let foundPlace: string | null = null;
  let foundRegion: string | null = null;

  for (const keyword of SPECIFIC_PLACE_KEYWORDS) {
    if (title.includes(keyword)) {
      foundPlace = keyword;
      break;
    }
  }

  for (const keyword of BROAD_REGION_KEYWORDS) {
    if (title.includes(keyword)) {
      foundRegion = keyword;
      break;
    }
  }

  return { place: foundPlace, region: foundRegion };
}
