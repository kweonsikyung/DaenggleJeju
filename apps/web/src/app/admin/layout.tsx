import "daenggle-admin-ui/styles";
import { AdminShell } from "./ui/AdminShell";

export const metadata = {
  title: "어드민 | 댕글제주",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
