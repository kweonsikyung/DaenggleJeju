"use client";

import { IconContext } from "react-icons";

export function IconProvider({ children }: { children: React.ReactNode }) {
  return <IconContext.Provider value={{ color: "#525252" }}>{children}</IconContext.Provider>;
}
