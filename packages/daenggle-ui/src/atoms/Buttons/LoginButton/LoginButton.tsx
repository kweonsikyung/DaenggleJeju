import Image from "next/image";
import { LoginType } from "../../../types/LoginType";
import * as s from "./LoginButton.css";

export interface LoginButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  provider: LoginType;
  title: string;
  iconSrc: string;
}

export function LoginButton({ provider, title, iconSrc, className, ...rest }: LoginButtonProps) {
  return (
    <button
      type="button"
      className={[s.root, s.kind[provider], className].filter(Boolean).join(" ")}
      aria-label={title}
      {...rest}
    >
      <Image src={iconSrc} alt="" width={24} height={24} className={s.icon} priority />
      <span className={s.label}>{title}</span>
    </button>
  );
}
