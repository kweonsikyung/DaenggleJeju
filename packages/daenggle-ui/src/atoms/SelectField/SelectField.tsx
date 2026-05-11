"use client";

import Image from "next/image";
import { useId, useMemo } from "react";
import * as s from "./SelectField.css";

export interface SelectFieldProps {
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder */
  placeholder?: string;
  /** 선택된 값 */
  value?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  className?: string;
  id?: string;
}

export function SelectField({
  label,
  placeholder = "선택해주세요",
  value,
  disabled,
  onClick,
  className,
  id,
}: SelectFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hasValue = value != null && value.trim().length > 0;
  const isDisabled = Boolean(disabled);

  const fieldClass = useMemo(() => {
    const stateClass = isDisabled
      ? s.fieldState.disabled
      : hasValue
        ? s.fieldState.filled
        : s.fieldState.default;
    return [s.fieldBase, stateClass, className].filter(Boolean).join(" ");
  }, [hasValue, isDisabled, className]);

  return (
    <div className={s.root}>
      {label && (
        <label htmlFor={fieldId} className={s.label}>
          {label}
        </label>
      )}
      <button
        id={fieldId}
        type="button"
        className={fieldClass}
        onClick={onClick}
        disabled={isDisabled}
        aria-haspopup="listbox"
      >
        <span className={hasValue ? s.valueText : s.placeholderText}>
          {hasValue ? value : placeholder}
        </span>
        <Image src="/assets/icon24/chevron-down.svg" alt="선택" width={24} height={24} />
      </button>
    </div>
  );
}
