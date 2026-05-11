"use client";

import Image from "next/image";
import * as s from "./NavBar.css";

export interface NavBarItem {
  id: string;
  text: string;
  activeIconSrc: string;
  inactiveIconSrc: string;
  path: string;
}

export interface NavBarProps {
  activeId: string;
  items: NavBarItem[];
  onNavigate: (path: string) => void;
}

export function NavBar({ activeId, items, onNavigate }: NavBarProps) {
  return (
    <nav className={s.root}>
      {items.map((item) => (
        <button key={item.id} className={s.navItem} onClick={() => onNavigate(item.path)}>
          <Image
            src={activeId === item.id ? item.activeIconSrc : item.inactiveIconSrc}
            alt={item.text}
            width={24}
            height={24}
          />
          <span className={activeId === item.id ? s.navTextSelected : s.navText}>{item.text}</span>
        </button>
      ))}
    </nav>
  );
}
