import type { ReactNode } from "react";
import * as s from "./style.css";

export interface AdminCardProps {
  id?: string;
  title: ReactNode;
  children: ReactNode;
}

export function AdminCard({ id, title, children }: AdminCardProps) {
  return (
    <div id={id} className={s.card}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
