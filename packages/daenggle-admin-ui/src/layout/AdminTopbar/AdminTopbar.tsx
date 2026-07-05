import type { ReactNode } from "react";
import * as s from "./style.css";

export interface AdminTopbarProps {
  title: string;
  actions?: ReactNode;
}

export function AdminTopbar({ title, actions }: AdminTopbarProps) {
  return (
    <div className={s.topbar}>
      <h1 className={s.title}>{title}</h1>
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
}
