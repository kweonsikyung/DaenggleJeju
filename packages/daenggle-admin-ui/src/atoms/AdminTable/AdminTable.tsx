import type { ReactNode } from "react";
import * as s from "./style.css";

export interface AdminTableProps {
  head: ReactNode;
  children: ReactNode;
  empty?: ReactNode;
}

export function AdminTable({ head, children, empty }: AdminTableProps) {
  return (
    <div className={s.wrap}>
      <table className={s.table}>
        <thead>{head}</thead>
        <tbody>{children}</tbody>
      </table>
      {empty && <div className={s.emptyArea}>{empty}</div>}
    </div>
  );
}
