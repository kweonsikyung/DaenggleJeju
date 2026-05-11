import { Skeleton } from "daenggle-ui";

export function MapSkeleton() {
  return (
    <div style={{ width: "100%", height: "100dvh", position: "relative", background: "#f5f5f5" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "52px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        <Skeleton width="160px" height="20px" />
      </div>

      <Skeleton width="100%" height="100%" style={{ borderRadius: 0 }} />

      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Skeleton width={44} height={44} style={{ borderRadius: "50%" }} />
        <Skeleton width={44} height={44} style={{ borderRadius: "50%" }} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 16px",
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Skeleton key={n} width={40} height={40} style={{ borderRadius: "8px" }} />
        ))}
      </div>
    </div>
  );
}
