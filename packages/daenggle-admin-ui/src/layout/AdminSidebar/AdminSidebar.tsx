"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ElementType, ReactNode } from "react";
import * as s from "./style.css";

export interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
  badge?: number;
  exact?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface AdminSidebarProps {
  nav: NavSection[];
  logo: ReactNode;
  footer?: ReactNode;
}

function isActive(pathname: string, item: NavItem): boolean {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

export function AdminSidebar({ nav, logo, footer }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={s.sidebar}>
      <div className={s.logoArea}>{logo}</div>

      <nav className={s.nav}>
        {nav.map((section) => (
          <div key={section.label} className={s.section}>
            <span className={s.sectionLabel}>{section.label}</span>
            {section.items.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? s.itemActive : s.item}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={s.itemBadge}>{item.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {footer && <div className={s.footer}>{footer}</div>}
    </aside>
  );
}
