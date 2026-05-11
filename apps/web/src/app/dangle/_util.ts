import { DaenggleConceptKey, DaenggleContextId } from "@/types/daenggle";
import { BANNER_DATA } from "@/utils/dummyData";

/**
 * 댕글 영상 썸네일 URL 생성 함수
 * @param videoId
 * @param thumbUrl
 * @returns
 */
export const getThumbnailUrl = (videoId: string, thumbUrl?: string) => {
  return thumbUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * JEJU_DATA의 title을 API의 contextId로 매핑하는 객체
 */
export const regionContextMap: { [key: string]: DaenggleContextId | null } = {
  애월·한림: "PLACE_aeweol",
  이호동: "PLACE_jeju_si",
  조천: "PLACE_jocheon",
  성산: "PLACE_seongsan",
  중문: "PLACE_seogwipo_si",
  안덕: "PLACE_andeok",
};

/**
 * BANNER_DATA(더미)와 conceptKey(API)를 매핑하는 배열
 */
export const conceptBanners: {
  dummy: (typeof BANNER_DATA)[0];
  conceptKey: DaenggleConceptKey;
}[] = [
  {
    dummy: BANNER_DATA[0],
    conceptKey: "west_coast_beach",
  },
  {
    dummy: BANNER_DATA[1],
    conceptKey: "water_activity",
  },
  {
    dummy: BANNER_DATA[2],
    conceptKey: "dog_park",
  },
  {
    dummy: BANNER_DATA[3],
    conceptKey: "aeweol_coastal_road",
  },
  {
    dummy: BANNER_DATA[4],
    conceptKey: "oreum_hike",
  },
  {
    dummy: BANNER_DATA[5],
    conceptKey: "hyeopjae_sunset",
  },
];
