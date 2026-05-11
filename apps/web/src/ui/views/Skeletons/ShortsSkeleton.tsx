import { Skeleton } from "daenggle-ui";

export function ShortsSkeleton() {
  return (
    <div style={{ width: "100%", height: "100dvh", position: "relative", background: "#000" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 1,
        }}
      >
        <Skeleton width={24} height={24} style={{ opacity: 0.4 }} />
        <Skeleton width={80} height={20} style={{ opacity: 0.4 }} />
        <Skeleton width={24} height={24} style={{ opacity: 0.4 }} />
      </div>

      <Skeleton width="100%" height="100%" style={{ borderRadius: 0, opacity: 0.3 }} />

      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Skeleton width="50%" height="18px" style={{ opacity: 0.4 }} />
        <Skeleton width="70%" height="14px" style={{ opacity: 0.4 }} />
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
          background: "rgba(0,0,0,0.5)",
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Skeleton key={n} width={40} height={40} style={{ borderRadius: "8px", opacity: 0.4 }} />
        ))}
      </div>
    </div>
  );
}
