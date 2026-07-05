import * as react from 'react';
import { ReactNode, ElementType } from 'react';

interface AdminCardProps {
    id?: string;
    title: ReactNode;
    children: ReactNode;
}
declare function AdminCard({ id, title, children }: AdminCardProps): react.JSX.Element;

type AdminBadgeVariant = "ok" | "warning" | "error" | "info" | "neutral";
interface AdminBadgeProps {
    variant: AdminBadgeVariant;
    children: ReactNode;
}
declare function AdminBadge({ variant, children }: AdminBadgeProps): react.JSX.Element;

interface AdminTableProps {
    head: ReactNode;
    children: ReactNode;
    empty?: ReactNode;
}
declare function AdminTable({ head, children, empty }: AdminTableProps): react.JSX.Element;

interface NavItem {
    label: string;
    href: string;
    icon: ElementType;
    badge?: number;
    exact?: boolean;
}
interface NavSection {
    label: string;
    items: NavItem[];
}
interface AdminSidebarProps {
    nav: NavSection[];
    logo: ReactNode;
    footer?: ReactNode;
}
declare function AdminSidebar({ nav, logo, footer }: AdminSidebarProps): react.JSX.Element;

interface AdminTopbarProps {
    title: string;
    actions?: ReactNode;
}
declare function AdminTopbar({ title, actions }: AdminTopbarProps): react.JSX.Element;

declare const ADMIN_TOKENS: {
    readonly SIDEBAR_BG: "#1E2233";
    readonly SIDEBAR_HOVER_BG: "#252840";
    readonly SIDEBAR_ACTIVE_BG: "#2C3354";
    readonly SIDEBAR_TEXT: "#8B93AA";
    readonly SIDEBAR_TEXT_ACTIVE: "#FFFFFF";
    readonly SIDEBAR_LABEL: "#4E5669";
    readonly SIDEBAR_BORDER: "rgba(255,255,255,0.08)";
    readonly CONTENT_BG: "#F8FAFC";
    readonly CARD_BG: "#FFFFFF";
    readonly CARD_BORDER: "#E8ECF0";
};

export { ADMIN_TOKENS, AdminBadge, type AdminBadgeProps, type AdminBadgeVariant, AdminCard, type AdminCardProps, AdminSidebar, type AdminSidebarProps, AdminTable, type AdminTableProps, AdminTopbar, type AdminTopbarProps, type NavItem, type NavSection };
