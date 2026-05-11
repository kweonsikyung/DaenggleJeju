import { Skeleton } from "daenggle-ui";

export function MySkeleton() {
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
        <Skeleton width={80} height={20} />
        <Skeleton width={24} height={24} />
      </div>

      <div style={{ padding: "20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Skeleton width={64} height={64} style={{ borderRadius: "50%" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton width="50%" height="18px" />
            <Skeleton width="30%" height="14px" />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #f0f0f0", padding: "0 16px" }}>
        {[1, 2].map((n) => (
          <Skeleton
            key={n}
            width={60}
            height={36}
            style={{ margin: "0 8px 0 0", borderRadius: "4px" }}
          />
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} width={60} height={30} style={{ borderRadius: "20px" }} />
          ))}
        </div>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <Skeleton width={80} height={80} style={{ borderRadius: "8px", flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <Skeleton width="70%" height="16px" />
              <Skeleton width="50%" height="14px" />
              <Skeleton width="40%" height="14px" />
            </div>
          </div>
        ))}
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
