import type { ReactNode } from "react";
import { badge } from "./style.css";

export type AdminBadgeVariant = "ok" | "warning" | "error" | "info" | "neutral";

export interface AdminBadgeProps {
  variant: AdminBadgeVariant;
  children: ReactNode;
}

export function AdminBadge({ variant, children }: AdminBadgeProps) {
  return <span className={badge({ variant })}>{children}</span>;
}
