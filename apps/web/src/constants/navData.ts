import type { NavBarItem } from "daenggle-ui";

export const NAV_ITEMS: NavBarItem[] = [
  {
    id: "near",
    text: "내근처",
    activeIconSrc: "/assets/nav/map_active.svg",
    inactiveIconSrc: "/assets/nav/map.svg",
    path: "/map",
  },
  {
    id: "dangle",
    text: "댕글영상",
    activeIconSrc: "/assets/nav/video_active.svg",
    inactiveIconSrc: "/assets/nav/video.svg",
    path: "/shorts?contextId=PLACE_jeju_si",
  },
  {
    id: "ai",
    text: "AI여행케어",
    activeIconSrc: "/assets/nav/ai_active.svg",
    inactiveIconSrc: "/assets/nav/ai.svg",
    path: "/chat",
  },
  {
    id: "jeju",
    text: "제주이동",
    activeIconSrc: "/assets/nav/move_active.svg",
    inactiveIconSrc: "/assets/nav/move.svg",
    path: "/jeju",
  },
  {
    id: "my",
    text: "마이",
    activeIconSrc: "/assets/nav/my_active.svg",
    inactiveIconSrc: "/assets/nav/my.svg",
    path: "/my",
  },
];
