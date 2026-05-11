"use client";

import { useEffect, useRef, useState } from "react";
import * as s from "./style.css";

export interface SegmentedControlOption {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  activeOption: string;
  onSelect: (optionId: string) => void;
  className?: string;
}

/**
 * 여러 옵션 중 하나를 선택하는 UI 컨트롤
 */
export const SegmentedControl = ({
  options,
  activeOption,
  onSelect,
  className,
}: SegmentedControlProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = options.findIndex((option) => option.id === activeOption);
    const activeOptionElement = optionRefs.current[activeIndex];

    if (activeOptionElement) {
      const { offsetLeft, clientWidth } = activeOptionElement;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${clientWidth}px`,
      });
    }
  }, [activeOption, options]);

  return (
    <div ref={containerRef} className={`${s.container} ${className}`}>
      <div className={s.activeIndicator} style={indicatorStyle} />
      {options.map((option, index) => (
        <button
          key={option.id}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
          className={s.optionButton({ active: activeOption === option.id })}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
