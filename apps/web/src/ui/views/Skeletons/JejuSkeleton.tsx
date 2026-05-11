import { Skeleton } from "daenggle-ui";

export function JejuSkeleton() {
  return (
    <div style={{ width: "100%", minHeight: "100dvh", background: "#fff" }}>
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
        <Skeleton width={24} height={24} />
        <Skeleton width={80} height={20} />
        <Skeleton width={24} height={24} />
      </div>

      <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Skeleton width="60%" height="28px" />
        <Skeleton width="100%" height="200px" style={{ borderRadius: "12px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width={40} height={40} style={{ borderRadius: "8px", flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <Skeleton width="60%" height="16px" />
                <Skeleton width="40%" height="14px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
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
