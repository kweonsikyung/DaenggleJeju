import * as s from "@/app/chat/style.css";
import { Skeleton } from "../../atoms/Skeleton/Skeleton";

const Spacer = ({ height }: { height: number }) => <div style={{ height }} />;

export function AiCareSkeleton() {
  return (
    <div className={s.page}>
      <div
        className={s.topBarWithBorder}
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <Skeleton width={120} height={24} />
      </div>
      <div className={s.container}>
        <div className={s.notice_container}>
          <Skeleton width="100%" height={100} style={{ borderRadius: "8px" }} />
        </div>

        <Spacer height={16} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 16px",
          }}
        >
          <Skeleton width={40} height={40} style={{ borderRadius: "50%" }} />{" "}
          <Skeleton width={200} height={18} />
        </div>

        <Spacer height={24} />

        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <Skeleton width={150} height={44} style={{ borderRadius: "22px" }} />
          <Skeleton width={170} height={44} style={{ borderRadius: "22px" }} />
          <Skeleton width={260} height={44} style={{ borderRadius: "22px" }} />
          <Skeleton width={190} height={44} style={{ borderRadius: "22px" }} />
        </div>
      </div>{" "}
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
