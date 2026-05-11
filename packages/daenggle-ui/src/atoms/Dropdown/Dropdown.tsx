"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as s from "./Dropdown.css";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** 드롭다운에 표시될 옵션 목록 */
  options: DropdownOption[];
  /** 현재 선택된 옵션의 값 */
  selectedValue: string | null;
  /** 옵션 선택 시 호출되는 콜백 함수 */
  onSelect: (value: string) => void;
  /** 선택된 값이 없을 때 표시될 텍스트 */
  placeholder?: string;
}

/**
 * 클릭 시 옵션 목록을 보여주는 드롭다운 컴포넌트
 */
export function Dropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = "옵션을 선택하세요",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <div className={s.container} ref={dropdownRef}>
      <button
        className={s.button}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <Image
          src="/assets/icon24/chevron-down.svg"
          alt="드롭다운 토글"
          width={24}
          height={24}
          className={`${s.chevronIcon} ${isOpen ? s.chevronIconUp : ""}`}
        />
      </button>
      {isOpen && (
        <ul className={s.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={s.listItem}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
