import { HREFLANG_MAP, LOCALE_LABELS, LOCALES, PAGE_JSON_LD_TYPES, SITE_URL, STATIC_SEO_ROUTES } from "@/constants/seo";
import * as s from "./style.css";

import enMessages from "../../../../messages/en.json";
import jaMessages from "../../../../messages/ja.json";
import koMessages from "../../../../messages/ko.json";

type Messages = typeof koMessages;
type Locale = "ko" | "en" | "ja";

const messagesByLocale: Record<Locale, Messages> = {
  ko: koMessages,
  en: enMessages as unknown as Messages,
  ja: jaMessages as unknown as Messages,
};

function getAllKeys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof val === "object" && val !== null ? getAllKeys(val, fullKey) : [fullKey];
  });
}

function hasKey(obj: unknown, keyPath: string): boolean {
  const parts = keyPath.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in (current as object))) {
      return false;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current !== undefined;
}

function getVal(obj: unknown, keyPath: string): string {
  const parts = keyPath.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return "";
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : "";
}

const PAGE_ROUTES = [
  { key: "home", path: "", label: "홈" },
  { key: "map", path: "/map", label: "지도" },
  { key: "dangle", path: "/dangle", label: "댕글" },
  { key: "list", path: "/list", label: "장소 목록" },
  { key: "search", path: "/search", label: "검색" },
  { key: "jeju", path: "/jeju", label: "제주 코스" },
  { key: "detail", path: "/detail/[contentId]", label: "장소 상세" },
] as const;

const PAGE_META_NAMESPACES: Record<string, string> = {
  home: "metadata",
  map: "pages.map",
  dangle: "pages.dangle",
  list: "pages.list",
  search: "pages.search",
  jeju: "pages.jeju",
  detail: "pages.detail",
};

const PAGE_HAS_JSON_LD: Record<string, boolean> = {
  home: true,
  map: true,
  dangle: true,
  list: true,
  search: true,
  jeju: true,
  detail: true,
};

const PAGE_HAS_HREFLANG: Record<string, boolean> = {
  home: true,
  map: true,
  dangle: true,
  list: true,
  search: true,
  jeju: true,
  detail: true,
};

export default function SeoAdminPage() {
  const koKeys = getAllKeys(koMessages);
  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  return (
    <div className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>댕글제주 SEO 어드민</h1>
        <p className={s.subtitle}>마케팅 SEO 인프라 현황 · 업데이트: {now}</p>
      </header>

      {/* 요약 통계 */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>📊 인프라 현황</h2>
        <div className={s.statRow}>
          <div className={s.statCard}>
            <div className={s.statValue}>{LOCALES.length}</div>
            <div className={s.statLabel}>지원 로케일</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statValue}>{STATIC_SEO_ROUTES.length * LOCALES.length}</div>
            <div className={s.statLabel}>사이트맵 URL 수</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statValue}>{PAGE_ROUTES.length}</div>
            <div className={s.statLabel}>SEO 적용 페이지</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statValue}>{koKeys.length}</div>
            <div className={s.statLabel}>번역 키 수 (ko)</div>
          </div>
        </div>

        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>항목</th>
              <th className={s.th}>상태</th>
              <th className={s.th}>경로</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "sitemap.xml", ok: true, path: "/sitemap.xml" },
              { label: "robots.txt", ok: true, path: "/robots.txt" },
              { label: "hreflang (ko/en/ja)", ok: true, path: "[locale]/layout.tsx" },
              { label: "x-default hreflang", ok: true, path: "[locale]/layout.tsx" },
              { label: "WebSite JSON-LD", ok: true, path: "[locale]/layout.tsx" },
              { label: "title template", ok: true, path: "[locale]/layout.tsx" },
              { label: "OG 이미지", ok: true, path: "/og-image.png" },
            ].map(({ label, ok, path }) => (
              <tr key={label}>
                <td className={s.td}>{label}</td>
                <td className={s.td}>
                  <span className={ok ? s.badgeOk : s.badgeMissing}>{ok ? "✓ 적용" : "✗ 미적용"}</span>
                </td>
                <td className={s.td} style={{ color: "#888", fontSize: 12 }}>{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <hr className={s.divider} />

      {/* 페이지별 메타데이터 */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>🗂 페이지별 SEO 메타데이터</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>페이지</th>
              <th className={s.th}>JSON-LD 타입</th>
              <th className={s.th}>hreflang</th>
              {LOCALES.map((locale) => (
                <th key={locale} className={s.th}>{LOCALE_LABELS[locale]} 타이틀</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAGE_ROUTES.map(({ key, label }) => {
              const ns = PAGE_META_NAMESPACES[key];
              const titleKey = `${ns}.title`;
              const isHome = key === "home";
              return (
                <tr key={key}>
                  <td className={s.td}>
                    <strong>{label}</strong>
                    <span style={{ color: "#888", fontSize: 11, display: "block" }}>{key}</span>
                  </td>
                  <td className={s.td}>
                    {PAGE_HAS_JSON_LD[key] ? (
                      <span className={s.badgeInfo}>{PAGE_JSON_LD_TYPES[key] ?? "WebSite"}</span>
                    ) : (
                      <span className={s.badgeMissing}>없음</span>
                    )}
                  </td>
                  <td className={s.td}>
                    {PAGE_HAS_HREFLANG[key] ? (
                      <span className={s.badgeOk}>✓</span>
                    ) : (
                      <span className={s.badgeMissing}>✗</span>
                    )}
                  </td>
                  {LOCALES.map((locale) => {
                    const messages = messagesByLocale[locale];
                    const titleVal = isHome
                      ? getVal(messages, "metadata.title")
                      : getVal(messages, titleKey);
                    const hasTitle = isHome
                      ? hasKey(messages, "metadata.title")
                      : hasKey(messages, titleKey);
                    return (
                      <td key={locale} className={s.td} style={{ maxWidth: 220 }}>
                        {hasTitle ? (
                          <span style={{ fontSize: 12 }}>{titleVal}</span>
                        ) : (
                          <span className={s.badgeMissing}>키 없음</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <hr className={s.divider} />

      {/* 번역 완성도 */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>🌐 번역 키 완성도</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.th}>번역 키</th>
              {LOCALES.map((locale) => (
                <th key={locale} className={s.th}>{LOCALE_LABELS[locale]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {koKeys.map((key) => {
              const koVal = getVal(koMessages, key);
              if (typeof koVal !== "string") return null;
              return (
                <tr key={key}>
                  <td className={s.td} style={{ fontFamily: "monospace", fontSize: 12, color: "#555" }}>{key}</td>
                  {LOCALES.map((locale) => {
                    const messages = messagesByLocale[locale];
                    const hasVal = hasKey(messages, key);
                    return (
                      <td key={locale} className={s.td}>
                        {hasVal ? (
                          <span className={s.badgeOk}>✓</span>
                        ) : (
                          <span className={s.badgeMissing}>✗ 없음</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <hr className={s.divider} />

      {/* 사이트맵 미리보기 */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>🗺 사이트맵 URL 목록 ({STATIC_SEO_ROUTES.length * LOCALES.length}개)</h2>
        <ul className={s.urlList}>
          {STATIC_SEO_ROUTES.flatMap(({ path, priority }) =>
            LOCALES.map((locale) => {
              const url = `${SITE_URL}/${locale}${path}`;
              return (
                <li key={url} className={s.urlItem}>
                  <span style={{ color: "#888", fontSize: 10 }}>P{priority} · {HREFLANG_MAP[locale]}</span>
                  <br />
                  {url}
                </li>
              );
            })
          )}
        </ul>
      </section>

      <hr className={s.divider} />

      {/* 빠른 링크 */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>🔗 빠른 확인 링크</h2>
        <div className={s.quickLinkGrid}>
          {[
            { label: "sitemap.xml 확인", href: "/sitemap.xml", desc: "크롤러용 사이트맵" },
            { label: "robots.txt 확인", href: "/robots.txt", desc: "크롤러 규칙" },
            ...LOCALES.map((l) => ({
              label: `${LOCALE_LABELS[l]} 홈`,
              href: `/${l}`,
              desc: `${HREFLANG_MAP[l]} 진입점`,
            })),
            ...["map", "dangle", "list", "search", "jeju"].map((page) => ({
              label: `${page} 페이지`,
              href: `/ko/${page}`,
              desc: `ko/${page} 메타 확인`,
            })),
          ].map(({ label, href, desc }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={s.quickLink}>
              {label}
              <span className={s.quickLinkDesc}>{desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
