"use client";

// src/atoms/AdminCard/style.css.ts
var card = "style_card__1rysyau0";
var header = "style_header__1rysyau1";
var title = "style_title__1rysyau2";

// src/atoms/AdminCard/AdminCard.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function AdminCard({ id, title: title3, children }) {
  return /* @__PURE__ */ jsxs("div", { id, className: card, children: [
    /* @__PURE__ */ jsx("div", { className: header, children: /* @__PURE__ */ jsx("h2", { className: title, children: title3 }) }),
    children
  ] });
}

// src/atoms/AdminBadge/style.css.ts
import { createRuntimeFn as _7a468 } from "@vanilla-extract/recipes/createRuntimeFn";
var badge = _7a468({ defaultClassName: "style_badge__893uvn0", variantClassNames: { variant: { ok: "style_badge_variant_ok__893uvn1", warning: "style_badge_variant_warning__893uvn2", error: "style_badge_variant_error__893uvn3", info: "style_badge_variant_info__893uvn4", neutral: "style_badge_variant_neutral__893uvn5" } }, defaultVariants: {}, compoundVariants: [] });

// src/atoms/AdminBadge/AdminBadge.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AdminBadge({ variant, children }) {
  return /* @__PURE__ */ jsx2("span", { className: badge({ variant }), children });
}

// src/atoms/AdminTable/style.css.ts
var emptyArea = "style_emptyArea__j9lxp22";
var table = "style_table__j9lxp21";
var wrap = "style_wrap__j9lxp20";

// src/atoms/AdminTable/AdminTable.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AdminTable({ head, children, empty }) {
  return /* @__PURE__ */ jsxs2("div", { className: wrap, children: [
    /* @__PURE__ */ jsxs2("table", { className: table, children: [
      /* @__PURE__ */ jsx3("thead", { children: head }),
      /* @__PURE__ */ jsx3("tbody", { children })
    ] }),
    empty && /* @__PURE__ */ jsx3("div", { className: emptyArea, children: empty })
  ] });
}

// src/layout/AdminSidebar/AdminSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

// src/layout/AdminSidebar/style.css.ts
var footer = "style_footer__846sn99";
var item = "style_item__846sn96 style_itemBase__846sn95";
var itemActive = "style_itemActive__846sn97 style_itemBase__846sn95";
var itemBadge = "style_itemBadge__846sn98";
var logoArea = "style_logoArea__846sn91";
var nav = "style_nav__846sn92";
var section = "style_section__846sn93";
var sectionLabel = "style_sectionLabel__846sn94";
var sidebar = "style_sidebar__846sn90";

// src/layout/AdminSidebar/AdminSidebar.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function isActive(pathname, item2) {
  return item2.exact ? pathname === item2.href : pathname.startsWith(item2.href);
}
function AdminSidebar({ nav: nav2, logo, footer: footer2 }) {
  const pathname = usePathname();
  return /* @__PURE__ */ jsxs3("aside", { className: sidebar, children: [
    /* @__PURE__ */ jsx4("div", { className: logoArea, children: logo }),
    /* @__PURE__ */ jsx4("nav", { className: nav, children: nav2.map((section2) => /* @__PURE__ */ jsxs3("div", { className: section, children: [
      /* @__PURE__ */ jsx4("span", { className: sectionLabel, children: section2.label }),
      section2.items.map((item2) => {
        const active = isActive(pathname, item2);
        const Icon = item2.icon;
        return /* @__PURE__ */ jsxs3(
          Link,
          {
            href: item2.href,
            className: active ? itemActive : item,
            children: [
              /* @__PURE__ */ jsx4(Icon, { size: 18 }),
              /* @__PURE__ */ jsx4("span", { children: item2.label }),
              item2.badge !== void 0 && /* @__PURE__ */ jsx4("span", { className: itemBadge, children: item2.badge })
            ]
          },
          item2.href
        );
      })
    ] }, section2.label)) }),
    footer2 && /* @__PURE__ */ jsx4("div", { className: footer, children: footer2 })
  ] });
}

// src/layout/AdminTopbar/style.css.ts
var actions = "style_actions__1oko6cb2";
var title2 = "style_title__1oko6cb1";
var topbar = "style_topbar__1oko6cb0";

// src/layout/AdminTopbar/AdminTopbar.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function AdminTopbar({ title: title3, actions: actions2 }) {
  return /* @__PURE__ */ jsxs4("div", { className: topbar, children: [
    /* @__PURE__ */ jsx5("h1", { className: title2, children: title3 }),
    actions2 && /* @__PURE__ */ jsx5("div", { className: actions, children: actions2 })
  ] });
}

// src/styles/tokens.css.ts
var ADMIN_TOKENS = { SIDEBAR_BG: "#1E2233", SIDEBAR_HOVER_BG: "#252840", SIDEBAR_ACTIVE_BG: "#2C3354", SIDEBAR_TEXT: "#8B93AA", SIDEBAR_TEXT_ACTIVE: "#FFFFFF", SIDEBAR_LABEL: "#4E5669", SIDEBAR_BORDER: "rgba(255,255,255,0.08)", CONTENT_BG: "#F8FAFC", CARD_BG: "#FFFFFF", CARD_BORDER: "#E8ECF0" };
export {
  ADMIN_TOKENS,
  AdminBadge,
  AdminCard,
  AdminSidebar,
  AdminTable,
  AdminTopbar
};
