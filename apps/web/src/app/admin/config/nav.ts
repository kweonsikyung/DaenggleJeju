import type { NavSection } from "daenggle-admin-ui";
import {
  RiChat1Line,
  RiLayoutGridLine,
  RiMapPinLine,
  RiSearchEyeLine,
  RiSettings3Line,
  RiUserLine,
  RiVideoLine,
} from "react-icons/ri";

export const ADMIN_NAV: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      { label: "대시보드", href: "/admin", icon: RiLayoutGridLine, exact: true },
      { label: "장소 관리", href: "/admin/places", icon: RiMapPinLine },
      { label: "댕글 관리", href: "/admin/daenggle", icon: RiVideoLine },

      { label: "사용자 관리", href: "/admin/users", icon: RiUserLine },
      { label: "리뷰 관리", href: "/admin/reviews", icon: RiChat1Line },
      { label: "SEO", href: "/admin/seo", icon: RiSearchEyeLine },
    ],
  },

  {
    label: "시스템",
    items: [{ label: "설정", href: "/admin/settings", icon: RiSettings3Line }],
  },
];
