"use client";

import * as s from "./style.css";

interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  /** 라디오 그룹의 질문(라벨) */
  label: string;
  /** 라디오 옵션 목록 */
  options: RadioOption[];
  /** 현재 선택된 값 */
  selectedValue: string | null;
  /** 옵션 선택 시 호출되는 콜백 함수 */
  onSelect: (value: string) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export function RadioGroup({
  label,
  options,
  selectedValue,
  onSelect,
  disabled = false,
}: RadioGroupProps) {
  return (
    <fieldset className={s.fieldset} disabled={disabled}>
      <legend className={s.legend}>{label}</legend>
      <div className={s.optionsContainer}>
        {options.map((option) => (
          <label key={option.value} className={s.label}>
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
              className={s.radioInput}
            />
            <span className={s.radioVisual} />
            <span className={s.labelText}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
