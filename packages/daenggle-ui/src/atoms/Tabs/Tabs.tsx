"use client";

import * as s from "./style.css";

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  className?: string;
}

/**
 * 탭
 * 여러 컨텐츠 뷰 사이를 전환하는 데 사용
 */
export const Tabs = ({ tabs, activeTab, onTabClick, className }: TabsProps) => {
  return (
    <div className={`${s.container} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={s.tab({ active: activeTab === tab.id })}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
