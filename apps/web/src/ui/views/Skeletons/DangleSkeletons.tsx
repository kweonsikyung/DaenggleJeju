import { Skeleton } from "daenggle-ui";
import React from "react";
import * as s from "@/app/dangle/style.css";

export function DanglePlaceSkeleton() {
  return (
    <div style={{ display: "flex", gap: "12px", width: "100%" }}>
      <Skeleton width={100} height={100} style={{ borderRadius: "8px", flexShrink: 0 }} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "4px 0",
        }}
      >
        <div>
          <Skeleton width="60%" height="14px" />
          <Skeleton width="90%" height="20px" style={{ marginTop: "8px" }} />
        </div>
        <div>
          <Skeleton width="40%" height="14px" />
          <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
            <Skeleton width="50px" height="22px" style={{ borderRadius: "4px" }} />
            <Skeleton width="50px" height="22px" style={{ borderRadius: "4px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonHeader = ({ marginTop = 16, width = "60%", height = "24px" }) => (
  <div
    style={{
      padding: "0 16px",
      marginTop: `${marginTop}px`,
      marginBottom: "16px",
    }}
  >
    <Skeleton width={width} height={height} />
  </div>
);

const SkeletonCarousel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      gap: "16px",
      overflow: "hidden",
      padding: "0 16px",
    }}
  >
    {children}
  </div>
);

export function DangleRecommendSkeleton() {
  return (
    <div className={s.page}>
      <div
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Skeleton width={100} height={24} />
        <Skeleton width={24} height={24} />
      </div>
      <div className={s.container}>
        <SkeletonHeader width="40%" height="20px" />
        <SkeletonCarousel>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} style={{ textAlign: "center", flexShrink: 0 }}>
              <Skeleton width={84} height={84} style={{ borderRadius: "50%" }} />
            </div>
          ))}
        </SkeletonCarousel>

        <SkeletonHeader marginTop={40} />
        <SkeletonCarousel>
          {[1, 2].map((n) => (
            <Skeleton
              key={n}
              width={280}
              height={180}
              style={{ borderRadius: "8px", flexShrink: 0 }}
            />
          ))}
        </SkeletonCarousel>

        <SkeletonHeader marginTop={40} />
        <SkeletonCarousel>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ flexShrink: 0 }}>
              <Skeleton width={150} height={225} style={{ borderRadius: "8px" }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                  gap: "8px",
                }}
              >
                <Skeleton width={22} height={22} style={{ borderRadius: "50%" }} />
                <Skeleton width="100px" height="1em" />
              </div>
            </div>
          ))}
        </SkeletonCarousel>

        <SkeletonHeader marginTop={40} />
        <div
          className={s.pd}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <Skeleton width="100%" height={242} style={{ borderRadius: "8px" }} />
              <Skeleton width="80%" height="18px" style={{ marginTop: "8px" }} />
              <Skeleton width="60%" height="14px" style={{ marginTop: "4px" }} />
              <Skeleton width="100%" height="20px" style={{ marginTop: "8px" }} />
            </div>
          ))}
        </div>
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
