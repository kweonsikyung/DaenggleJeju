import { Skeleton } from "daenggle-ui";

export function ReviewSkeleton() {
  return (
    <div style={{ width: "100%", minHeight: "100dvh", background: "#fff" }}>
      <div
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Skeleton width={24} height={24} />
      </div>

      <div style={{ padding: "24px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width="30%" height="14px" />
          <Skeleton width="100%" height="44px" style={{ borderRadius: "8px" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width="20%" height="14px" />
          <div style={{ display: "flex", gap: "8px" }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Skeleton key={n} width={36} height={36} style={{ borderRadius: "4px" }} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width="25%" height="14px" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} width={80} height={32} style={{ borderRadius: "20px" }} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width="20%" height="14px" />
          <Skeleton width="100%" height="100px" style={{ borderRadius: "8px" }} />
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px" }}>
        <Skeleton width="100%" height="52px" style={{ borderRadius: "12px" }} />
      </div>
    </div>
  );
}
