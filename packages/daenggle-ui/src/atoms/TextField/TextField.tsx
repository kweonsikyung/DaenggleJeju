"use client";

import React, { useId, useMemo, useState } from "react";
import * as s from "./TextField.css";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder */
  placeholder?: string;
  /** 컨트롤드 값 */
  value?: string;
  /** 언컨트롤드 초기값 */
  defaultValue?: string;
  /** 유효성 검사 함수: 에러 메시지(string) 반환 시 에러, undefined/null이면 통과 */
  validator?: (value: string) => string | undefined | null;
  /** 외부에서 강제로 에러 표시하고 싶을 때 */
  errorText?: string;
  /** 보조설명(힌트/에러 밑문구 우선순위: errorText > helperText) */
  helperText?: string;
}

export function TextField({
  label,
  placeholder = "Placeholder",
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled,
  validator,
  errorText,
  helperText,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descId = `${inputId}-desc`;

  // 내부 상태
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isControlled = value != null;
  const [inner, setInner] = useState(defaultValue ?? "");
  const currentValue = isControlled ? String(value) : inner;

  const [innerError, setInnerError] = useState<string | undefined>(undefined);

  // 상태 파생
  const filled = currentValue.trim().length > 0;
  const hasError = Boolean(errorText ?? innerError);
  const isDisabled = Boolean(disabled);

  const rootClass = useMemo(() => {
    const stateClass = hasError
      ? s.state.error
      : isDisabled
        ? s.state.disabled
        : focused
          ? s.state.focused
          : pressed
            ? s.state.pressed
            : filled
              ? s.state.filled
              : s.state.default;
    return [s.root, stateClass, className].filter(Boolean).join(" ");
  }, [focused, pressed, filled, hasError, isDisabled, className]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInner(e.target.value);
    onChange?.(e);
  };

  const runValidate = (v: string) => {
    if (!validator) return;
    const msg = validator(v);
    setInnerError(msg ?? undefined);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    runValidate(e.currentTarget.value);
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const helper = hasError ? (errorText ?? innerError) : helperText;

  return (
    <div className={s.root}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <div className={rootClass} aria-disabled={isDisabled || undefined}>
        <input
          id={inputId}
          className={s.input}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onKeyDown={() => setPressed(true)}
          onKeyUp={() => setPressed(false)}
          aria-invalid={hasError || undefined}
          aria-describedby={helper ? descId : undefined}
          disabled={isDisabled}
          {...rest}
        />
      </div>
      {helper ? (
        <div id={descId} className={hasError ? s.helperError : s.helperText}>
          {helper}
        </div>
      ) : null}
    </div>
  );
}
