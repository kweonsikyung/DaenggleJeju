import { AdminBadge, AdminCard, AdminTable, AdminTopbar } from "daenggle-admin-ui";
import {
  RiBarChart2Line,
  RiCheckLine,
  RiCloseLine,
  RiFileList2Line,
  RiGlobalLine,
  RiLayoutGridLine,
  RiLinksLine,
  RiMapLine,
  RiTranslate,
} from "react-icons/ri";
import {
  HREFLANG_MAP,
  LOCALE_LABELS,
  LOCALES,
  PAGE_JSON_LD_TYPES,
  SITE_URL,
  STATIC_SEO_ROUTES,
  type SupportedLocale,
} from "@/constants/seo";
import enMessages from "../../../../messages/en.json";
import jaMessages from "../../../../messages/ja.json";
import koMessages from "../../../../messages/ko.json";
import * as s from "./style.css";

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
    if (typeof current !== "object" || current === null || !(part in (current as object)))
      return false;
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

  const localeCompleteness = LOCALES.map((locale: SupportedLocale) => {
    const messages = messagesByLocale[locale];
    const complete = koKeys.filter((key) => {
      const val = getVal(koMessages, key);
      return typeof val === "string" && hasKey(messages, key);
    }).length;
    return {
      locale,
      complete,

      total: koKeys.length,
      pct: Math.round((complete / koKeys.length) * 100),
    };
  });

  const statusBadge = (
    <span className={s.statusBadge}>
      <RiCheckLine size={12} />
      전체 인프라 정상
    </span>
  );

  return (
    <>
      <AdminTopbar title="SEO 대시보드" actions={statusBadge} />

      <div className={s.content}>
        {/* 통계 카드 */}
        <div className={s.statRow}>
          <div className={s.statCard}>
            <div className={s.statCardTop}>
              <span className={s.statLabel}>지원 로케일</span>

              <div className={s.statIcon}>
                <RiGlobalLine size={16} />
              </div>
            </div>

            <div className={s.statValue}>{LOCALES.length}</div>
            <div className={s.statDesc}>ko · en · ja</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statCardTop}>
              <span className={s.statLabel}>사이트맵 URL</span>

              <div className={s.statIcon}>
                <RiMapLine size={16} />
              </div>
            </div>

            <div className={s.statValue}>{STATIC_SEO_ROUTES.length * LOCALES.length}</div>
            <div className={s.statDesc}>정적 라우트 × 로케일</div>
          </div>

          <div className={s.statCard}>
            <div className={s.statCardTop}>
              <span className={s.statLabel}>SEO 적용 페이지</span>

              <div className={s.statIcon}>
                <RiLayoutGridLine size={16} />
              </div>
            </div>

            <div className={s.statValue}>{PAGE_ROUTES.length}</div>
            <div className={s.statDesc}>generateMetadata 적용</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statCardTop}>
              <span className={s.statLabel}>번역 키 수</span>

              <div className={s.statIcon}>
                <RiTranslate size={16} />
              </div>
            </div>

            <div className={s.statValue}>{koKeys.length}</div>

            <div className={s.statDesc}>기준: ko.json</div>
          </div>
        </div>

        {/* 인프라 현황 */}
        <AdminCard
          id="infra"
          title={
            <>
              <RiBarChart2Line size={18} />
              인프라 현황
            </>
          }
        >
          <AdminTable
            head={
              <tr>
                <th className={s.th}>항목</th>
                <th className={s.th}>상태</th>
                <th className={s.th}>경로</th>
              </tr>
            }
          >
            {[
              { label: "sitemap.xml", ok: true, path: "/sitemap.xml" },
              { label: "robots.txt", ok: true, path: "/robots.txt" },
              { label: "hreflang (ko/en/ja)", ok: true, path: "[locale]/layout.tsx" },
              { label: "x-default hreflang", ok: true, path: "[locale]/layout.tsx" },
              { label: "WebSite JSON-LD", ok: true, path: "[locale]/layout.tsx" },
              { label: "title template", ok: true, path: "[locale]/layout.tsx" },

              { label: "OG 이미지", ok: true, path: "/og-image.png" },
            ].map(({ label, ok, path }) => (
              <tr key={label} className={s.tr}>
                <td className={s.td}>{label}</td>
                <td className={s.td}>
                  <AdminBadge variant={ok ? "ok" : "neutral"}>
                    {ok ? <RiCheckLine /> : <RiCloseLine />}
                    {ok ? "적용" : "미적용"}
                  </AdminBadge>
                </td>
                <td className={s.td}>
                  <span className={s.pathText}>{path}</span>
                </td>
              </tr>
            ))}
          </AdminTable>
        </AdminCard>

        {/* 페이지별 SEO 메타데이터 */}
        <AdminCard
          id="pages"
          title={
            <>
              <RiFileList2Line size={18} />
              페이지별 SEO 메타데이터
            </>
          }
        >
          <AdminTable
            head={
              <tr>
                <th className={s.th}>페이지</th>
                <th className={s.th}>JSON-LD 타입</th>
                <th className={s.th}>hreflang</th>
                {LOCALES.map((locale: SupportedLocale) => (
                  <th key={locale} className={s.th}>
                    {LOCALE_LABELS[locale]} 타이틀
                  </th>
                ))}
              </tr>
            }
          >
            {PAGE_ROUTES.map(({ key, label }) => {
              const ns = PAGE_META_NAMESPACES[key];
              const titleKey = `${ns}.title`;

              const isHome = key === "home";

              return (
                <tr key={key} className={s.tr}>
                  <td className={s.td}>
                    <strong>{label}</strong>
                    <span className={s.pageKey}>{key}</span>
                  </td>
                  <td className={s.td}>
                    {PAGE_HAS_JSON_LD[key] ? (
                      <AdminBadge variant="info">{PAGE_JSON_LD_TYPES[key] ?? "WebSite"}</AdminBadge>
                    ) : (
                      <AdminBadge variant="neutral">
                        <RiCloseLine />
                        없음
                      </AdminBadge>
                    )}
                  </td>
                  <td className={s.td}>
                    <AdminBadge variant={PAGE_HAS_HREFLANG[key] ? "ok" : "neutral"}>
                      {PAGE_HAS_HREFLANG[key] ? <RiCheckLine /> : <RiCloseLine />}
                    </AdminBadge>
                  </td>

                  {LOCALES.map((locale: SupportedLocale) => {
                    const messages = messagesByLocale[locale];
                    const val = isHome
                      ? getVal(messages, "metadata.title")
                      : getVal(messages, titleKey);
                    const has = isHome
                      ? hasKey(messages, "metadata.title")
                      : hasKey(messages, titleKey);
                    return (
                      <td key={locale} className={s.td} style={{ maxWidth: 200 }}>
                        {has ? (
                          <span className={s.titleVal}>{val}</span>
                        ) : (
                          <AdminBadge variant="neutral">
                            <RiCloseLine />키 없음
                          </AdminBadge>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </AdminTable>
        </AdminCard>

        {/* 번역 키 완성도 */}
        <AdminCard
          id="translation"
          title={
            <>
              <RiGlobalLine size={18} />
              번역 키 완성도
            </>
          }
        >
          <div className={s.cardBody}>
            <div className={s.progressGrid}>
              {localeCompleteness.map(({ locale, complete, total, pct }) => (
                <div key={locale} className={s.progressCard}>
                  <div className={s.progressHeader}>
                    <span className={s.progressLocale}>{LOCALE_LABELS[locale]}</span>
                    <span className={s.progressPct}>{pct}%</span>
                  </div>

                  <div className={s.progressTrack}>
                    <div className={s.progressFill} style={{ width: `${pct}%` }} />
                  </div>
                  <div className={s.progressCount}>
                    {complete} / {total} 키
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdminTable
            head={
              <tr>
                <th className={s.th}>번역 키</th>
                {LOCALES.map((locale: SupportedLocale) => (
                  <th key={locale} className={s.th}>
                    {LOCALE_LABELS[locale]}
                  </th>
                ))}
              </tr>
            }
          >
            {koKeys.map((key) => {
              const koVal = getVal(koMessages, key);
              if (typeof koVal !== "string") return null;
              return (
                <tr key={key} className={s.tr}>
                  <td className={s.td}>
                    <span className={s.monoText}>{key}</span>
                  </td>
                  {LOCALES.map((locale: SupportedLocale) => {
                    const has = hasKey(messagesByLocale[locale], key);

                    return (
                      <td key={locale} className={s.td}>
                        <AdminBadge variant={has ? "ok" : "neutral"}>
                          {has ? (
                            <RiCheckLine />
                          ) : (
                            <>
                              <RiCloseLine />
                              없음
                            </>
                          )}
                        </AdminBadge>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </AdminTable>
        </AdminCard>

        {/* 사이트맵 URL */}
        <AdminCard
          id="sitemap"
          title={
            <>
              <RiMapLine size={18} />
              사이트맵 URL 목록 ({STATIC_SEO_ROUTES.length * LOCALES.length}개)
            </>
          }
        >
          <div className={s.cardBody}>
            <div className={s.urlGrid}>
              {STATIC_SEO_ROUTES.flatMap(({ path, priority }) =>
                LOCALES.map((locale: SupportedLocale) => {
                  const url = `${SITE_URL}/${locale}${path}`;
                  return (
                    <div key={url} className={s.urlItem}>
                      <span className={s.urlMeta}>
                        P{priority} · {HREFLANG_MAP[locale]}
                      </span>
                      <span className={s.urlText}>{url}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </AdminCard>

        {/* 빠른 링크 */}
        <AdminCard
          id="links"
          title={
            <>
              <RiLinksLine size={18} />
              빠른 확인 링크
            </>
          }
        >
          <div className={s.cardBody}>
            <div className={s.quickLinkGrid}>
              {[
                { label: "sitemap.xml 확인", href: "/sitemap.xml", desc: "크롤러용 사이트맵" },
                { label: "robots.txt 확인", href: "/robots.txt", desc: "크롤러 규칙" },
                ...LOCALES.map((l: SupportedLocale) => ({
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
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.quickLink}
                >
                  {label}
                  <span className={s.quickLinkDesc}>{desc}</span>
                </a>
              ))}
            </div>
          </div>
        </AdminCard>

        <div className={s.timestamp}>마지막 업데이트: {now}</div>
      </div>
    </>
  );
}
