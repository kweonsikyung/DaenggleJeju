import * as s from "@/app/search/style.css";
import * as navS from "../../atoms/NavBar/NavBar.css";
import { Skeleton } from "../../atoms/Skeleton/Skeleton";
import * as gridS from "../../molecules/Grid/Grid.css";
import * as headerS from "../../molecules/SearchHeader/SearchHeader.css";

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
  <div className={headerS.root}>
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
  <nav className={navS.root}>
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
        <div className={gridS.root}>
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
