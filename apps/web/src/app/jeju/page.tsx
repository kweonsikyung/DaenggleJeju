"use client";

import { NavBar, NoticeBox, ProgressCircle, TopBar } from "daenggle-ui";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { NAV_ITEMS } from "@/constants/navData";
import { useNotice } from "@/hooks/useNotice";
import { useWebShare } from "@/hooks/useWebShare";
import { jejuOptions } from "./_util";
import * as s from "./style.css";

/**
 * 제주 이동 방법 메인 & 상세 페이지
 * * style/ page = topbar + container + nav(jeju)
 */
function JejuPageContent() {
  /** router */
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as string | null;

  /** hooks */
  const { share } = useWebShare();
  const { shouldRender, animation, hideNotice } = useNotice();

  /**
   * type(URL 파라미터)에 따라 currentOption과 imageCount를 계산
   */
  const { currentOption, imageCount } = useMemo(() => {
    if (!type) {
      return { currentOption: null, imageCount: 0 };
    }
    const option = jejuOptions.find((option) => option.type === type);
    return {
      currentOption: option || null,
      imageCount: option?.cnt || 0,
    };
  }, [type]);

  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    if (imageCount > 0) {
      setImagesLoaded(new Array(imageCount).fill(false));
    } else {
      setImagesLoaded([]);
    }
  }, [imageCount]);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  /** share handler */
  const handleShare = () => {
    share({
      title: "[댕글제주] 제주이동의 모든 것",
      text: "제주에서 이동할 땐?",
    });
  };

  /** render detail page */
  const renderDetailPage = () => {
    if (!currentOption) {
      return renderMainPage();
    }

    return (
      <>
        <TopBar
          transparent
          backIconHandler={() => router.back()}
          backIconSrc="/assets/icon24/arrow-left_line.svg"
          rightIcons={[
            {
              icon: (
                <Image
                  alt="공유하기"
                  height={24}
                  src={"/assets/icon24/share_line.svg"}
                  width={24}
                />
              ),
              onClick: handleShare,
            },
          ]}
        />
        <div className={s.detail_container}>
          <NoticeBox shouldRender={shouldRender} animation={animation} onClose={hideNotice}>
            제공된 정보는 실제 운영 상황과 다를 수 있으므로, 예약 및 탑승 전 반드시 해당 업체의 최신
            규정과 조건을 확인해 주시기 바랍니다.
          </NoticeBox>

          <Image src={currentOption.url} alt={currentOption.title} width={190} height={190} />
          <div className={s.detailHeader}>
            <h1 className={s.detailTitle}>{currentOption.title}</h1>
            <p className={s.detailDesc}>{currentOption.desc}</p>
          </div>

          <div className={s.detailImageWrapper}>
            {Array.from({ length: imageCount }, (_, i) => i + 1).map((num, index) => (
              <div key={num} className={s.detailImageContainer}>
                {!imagesLoaded[index] && (
                  <div className={s.spinnerContainer}>
                    <ProgressCircle size={40} active className={s.spinner} color="#a5fbc5ff" />
                  </div>
                )}
                <Image
                  src={`/assets/jeju/${type}/${num}.png`}
                  alt={`${currentOption.title} 상세 이미지 ${num}`}
                  width={340}
                  height={440}
                  sizes="100vw"
                  className={s.detailImage}
                  onLoad={() => handleImageLoad(index)}
                  style={{ opacity: imagesLoaded[index] ? 1 : 0 }}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  /** render main page */
  const renderMainPage = () => {
    return (
      <>
        <TopBar
          transparent
          backIconHandler={() => router.back()}
          backIconSrc="/assets/icon24/arrow-left_line.svg"
        />
        <div className={s.container}>
          <Image src={"/assets/jeju.png"} width={274} height={190} alt="제주" />
          <div className={s.title}>
            반려견 동반 제주 이동 방법
            <br />
            쉽게 안내해 드릴게요
          </div>
          <div className={s.box_container}>
            {jejuOptions.map((item, index) => (
              <div
                key={item.id}
                className={s.box}
                onClick={() => router.push(`/jeju?type=${item.type}`)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={s.left}>
                  <div className={s.top}>{item.title}</div>
                  <div className={s.desc}>{item.desc}</div>
                </div>
                <Image src={item.url} alt={item.title} width={56} height={56} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={s.page}>
      {type ? renderDetailPage() : renderMainPage()}
      <NavBar activeId="jeju" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
    </div>
  );
}

/**
 * 제주 이동 방법 메인 & 상세 페이지
 */
export default function JejuPage() {
  const FallbackUI = (
    <div className={s.page}>
      <TopBar
        transparent
        backIconHandler={() => {}}
        backIconSrc="/assets/icon24/arrow-left_line.svg"
      />
      <div className={s.container}>
        <Image src={"/assets/jeju.png"} width={274} height={190} alt="제주" />
        <div className={s.title}>
          반려견 동반 제주 이동 방법
          <br />
          쉽게 안내해 드릴게요
        </div>
      </div>
      <NavBar activeId="jeju" items={NAV_ITEMS} onNavigate={() => {}} />
    </div>
  );

  return (
    <Suspense fallback={FallbackUI}>
      <JejuPageContent />
    </Suspense>
  );
}
