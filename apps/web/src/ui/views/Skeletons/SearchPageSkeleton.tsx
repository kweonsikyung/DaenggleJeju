import { Skeleton } from "daenggle-ui";
import * as s from "@/app/search/style.css";

function DanglePlaySkeleton() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%", paddingTop: "125%" }}>
        <Skeleton
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        />
      </div>
      <Skeleton width="80%" height="16px" style={{ marginTop: "8px" }} />
      <Skeleton width="60%" height="14px" style={{ marginTop: "4px" }} />
    </div>
  );
}

const SearchHeaderSkeleton = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px" }}>
    <Skeleton width={24} height={24} style={{ flexShrink: 0 }} />
    <Skeleton width="100%" height={50} style={{ borderRadius: "8px" }} />
  </div>
);

const FilterChipsSkeleton = () => (
  <div className={s.filterChipsContainer}>
    {[...Array(6)].map((_, n) => (
      <Skeleton key={n} width={60} height={30} style={{ borderRadius: "17px", flexShrink: 0 }} />
    ))}
  </div>
);

const NavBarSkeleton = () => (
  <nav
    style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "60px",
      borderTop: "1px solid #f0f0f0",
      padding: "0 16px",
    }}
  >
    {[...Array(5)].map((_, n) => (
      <Skeleton key={n} width={40} height={40} style={{ borderRadius: "8px" }} />
    ))}
  </nav>
);

export function SearchPageSkeleton() {
  return (
    <div className={s.page}>
      <SearchHeaderSkeleton />
      <div className={s.container}>
        <FilterChipsSkeleton />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <DanglePlaySkeleton />
          <DanglePlaySkeleton />
          <DanglePlaySkeleton />
          <DanglePlaySkeleton />
          <DanglePlaySkeleton />
          <DanglePlaySkeleton />
        </div>
      </div>
      <NavBarSkeleton />
    </div>
  );
}
