interface Slide {
  src: string;
  chip: string;
  headline: string;
  highlight: string;
}

export const slides: Slide[] = [
  {
    src: "/assets/onboarding/phone1.png",
    chip: "댕글",
    headline: "진짜 견주가 다녀온 곳,",
    highlight: "영상 넘기며 인기 동반 스팟 발견",
  },
  {
    src: "/assets/onboarding/phone2.png",
    chip: "AI 여행케어",
    headline: "갑작스러운 돌발 상황에도 안심",
    highlight: "건강·상황별 AI 실시간 도움",
  },
  {
    src: "/assets/onboarding/phone3.png",
    chip: "제주이동",
    headline: "배·비행기 이동도 더 쉽게",
    highlight: "복잡한 이동 동반 규정을 한눈에",
  },
];
