"use client";

import { AdminSidebar } from "daenggle-admin-ui";
import { RiFootprintLine, RiLogoutBoxLine } from "react-icons/ri";
import { ADMIN_NAV } from "../config/nav";
import * as s from "../layout.css";

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

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.shell}>
      <AdminSidebar nav={ADMIN_NAV} logo={<AdminLogo />} footer={<AdminFooter />} />
      <main className={s.main}>{children}</main>
    </div>
  );
}
