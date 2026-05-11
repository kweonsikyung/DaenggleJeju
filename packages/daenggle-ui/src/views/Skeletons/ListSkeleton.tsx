import * as s from "@/app/list/style.css";
import { Skeleton } from "../../atoms/Skeleton/Skeleton";
import { DanglePlaceSkeleton } from "./DangleSkeletons";

export function ListSkeleton() {
  return (
    <div className={s.page}>
      <div className={s.topContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            height: "60px",
            boxSizing: "border-box",
          }}
        >
          <Skeleton width={24} height={24} style={{ borderRadius: "4px" }} />
          <Skeleton width="100%" height={36} style={{ borderRadius: "8px" }} />
        </div>
        <div className={s.filterWrapper}>
          <div className={s.filterChipsContainer}>
            <Skeleton width={80} height={36} style={{ borderRadius: "18px" }} />
            <Skeleton width={70} height={36} style={{ borderRadius: "18px" }} />
            <Skeleton width={90} height={36} style={{ borderRadius: "18px" }} />
            <Skeleton width={90} height={36} style={{ borderRadius: "18px" }} />
          </div>
        </div>
      </div>

      <div className={s.container}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className={s.cardWrapper} key={`skeleton-${index}`}>
            <DanglePlaceSkeleton />
          </div>
        ))}
      </div>

      <div
        style={{
          height: "60px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Skeleton width={40} height={40} style={{ borderRadius: "8px" }} />
        <Skeleton width={40} height={40} style={{ borderRadius: "8px" }} />
        <Skeleton width={40} height={40} style={{ borderRadius: "8px" }} />
        <Skeleton width={40} height={40} style={{ borderRadius: "8px" }} />
        <Skeleton width={40} height={40} style={{ borderRadius: "8px" }} />
      </div>
    </div>
  );
}
