import "daenggle-admin-ui/styles";
import { AdminSidebar } from "daenggle-admin-ui";
import { RiFootprintLine, RiLogoutBoxLine } from "react-icons/ri";
import { ADMIN_NAV } from "./config/nav";
import * as s from "./layout.css";

export const metadata = {
  title: "어드민 | 댕글제주",
  robots: { index: false, follow: false },
};

function AdminLogo() {
  return (
    <div className={s.logoWrap}>
      <div className={s.logoIcon}>
        <RiFootprintLine size={18} />
      </div>

      <div>
        <p className={s.logoName}>댕글제주</p>
        <p className={s.logoSub}>관리자</p>
      </div>
    </div>
  );
}

function AdminFooter() {
  return (
    <button type="button" className={s.logoutBtn}>
      <RiLogoutBoxLine size={18} />
      로그아웃
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" style={{ height: "100%" }}>
      <body
        style={{
          margin: 0,
          height: "100%",

          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        <div className={s.shell}>
          <AdminSidebar nav={ADMIN_NAV} logo={<AdminLogo />} footer={<AdminFooter />} />
          <main className={s.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
