import React from "react";
import { ButtonSize, ButtonStatus } from "../../../constants/ButtonVariant";
import * as s from "./Button.css";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** button size */
  size: ButtonSize;
  /** visual status */
  status: ButtonStatus;
  /** main label */
  text: string;
}

const STATUS_KEY: Record<ButtonStatus, "active" | "disabled" | "default" | "selected" | "primary"> =
  {
    [ButtonStatus.ACTIVE]: "active",
    [ButtonStatus.DISABLED]: "disabled",
    [ButtonStatus.DEFAULT]: "default",
    [ButtonStatus.SELECTED]: "selected",
    [ButtonStatus.PRIMARY]: "primary",
  };

const SIZE_KEY: Record<ButtonSize, "medium" | "large"> = {
  [ButtonSize.MEDIUM]: "medium",
  [ButtonSize.LARGE]: "large",
};

export function Button({ size, status, text, className, disabled, ...rest }: ButtonProps) {
  const sizeKey = SIZE_KEY[size];
  const statusKey = STATUS_KEY[status];

  const classes = [s.root, s.size[sizeKey], s.state[statusKey], className]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || statusKey === "disabled";

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled || undefined}
      data-size={sizeKey}
      data-status={statusKey}
      {...rest}
    >
      <span className={s.label}>{text}</span>
    </button>
  );
}
