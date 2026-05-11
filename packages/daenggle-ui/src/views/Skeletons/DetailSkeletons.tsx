import * as s from "@/app/detail/[contentId]/style.css";
import { Skeleton } from "../../atoms/Skeleton/Skeleton";

const VideoCarouselSkeletonContent = () => (
  <div
    style={{
      display: "flex",
      gap: "16px",
      overflow: "hidden",
      padding: "0 16px",
    }}
  >
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
  </div>
);

const SectionHeaderSkeleton = () => (
  <div className={s.sectionHeader} style={{ marginBottom: "16px" }}>
    <Skeleton width="40%" height="22px" />
  </div>
);

export function DetailSkeleton() {
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
        <Skeleton width={24} height={24} style={{ borderRadius: "4px" }} />{" "}
        <Skeleton width={24} height={24} style={{ borderRadius: "4px" }} />{" "}
      </div>
      <div className={s.container}>
        <section className={s.placeInfoSection}>
          <div className={s.placeHeader}>
            <Skeleton width={80} height={80} style={{ borderRadius: "8px" }} />
            <div className={s.placeDetails} style={{ flex: 1 }}>
              <Skeleton width="60%" height="28px" />
              <Skeleton width="40%" height="16px" style={{ marginTop: "8px" }} />
              <Skeleton width="70%" height="24px" style={{ marginTop: "10px" }} />
            </div>
          </div>
          <div className={s.tagGroup}>
            <Skeleton width="50px" height="20px" />
            <Skeleton width="70px" height="20px" style={{ marginLeft: "8px" }} />
            <Skeleton width="50px" height="20px" style={{ marginLeft: "8px" }} />
          </div>
          <ul className={s.infoList} style={{ gap: "12px" }}>
            <li>
              <Skeleton height="16px" />
            </li>
            <li>
              <Skeleton height="16px" />
            </li>
            <li>
              <Skeleton height="16px" />
            </li>
          </ul>
        </section>

        <section className={s.section}>
          <SectionHeaderSkeleton />
          <div className={s.attentionBox} style={{ padding: "16px" }}>
            <Skeleton width="50%" height="20px" />
            <Skeleton width="100%" height="14px" style={{ marginTop: "12px" }} />
            <Skeleton width="90%" height="14px" style={{ marginTop: "8px" }} />
          </div>
        </section>

        <section className={s.section}>
          <SectionHeaderSkeleton />
          <VideoCarouselSkeletonContent />
        </section>

        <section className={s.section}>
          <SectionHeaderSkeleton />
          <div style={{ padding: "0 16px" }}>
            <Skeleton width="30%" height="30px" style={{ marginBottom: "10px" }} />
            <Skeleton
              width="100%"
              height="80px"
              style={{
                marginTop: "10px",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "16px",
              }}
            />
            <Skeleton
              width="100%"
              height="80px"
              style={{
                marginTop: "10px",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "16px",
              }}
            />
          </div>
        </section>
      </div>{" "}
      <div
        style={{
          height: "60px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 16px",
          backgroundColor: "#fff",
          position: "sticky",
          bottom: 0,
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
