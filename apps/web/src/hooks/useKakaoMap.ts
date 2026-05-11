"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DaengglePlacesMapResult } from "@/types/daenggle";
import { PlaceItem } from "@/types/place";

/** Kakao type declaration */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface UseKakaoMapProps {
  /** 일반 장소 데이터 */
  places?: PlaceItem[];
  /** 댕글 장소 데이터 */
  daengglePlaces?: DaengglePlacesMapResult;
  /** 현재 활성화된 필터 (예: "dangle", "restaurant") */
  activeFilter: string;
  /** 일반 장소 마커 또는 지도를 클릭했을 때 호출되는 콜백 */
  onPlaceSelect: (place: PlaceItem | null) => void;
  /** "댕글" 마커를 클릭했을 때 호출되는 콜백 */
  onDangleClick: (videoId: string | number) => void;
  /** contentTypeId를 마커 이미지 URL에 매핑하는 객체 */
  markerImages: Record<string, string>;
}

export const useKakaoMap = ({
  places,
  daengglePlaces,
  activeFilter,
  onPlaceSelect,
  onDangleClick,
  markerImages,
}: UseKakaoMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  // 1. Load Kakao Map Script and Initialize Map
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false&libraries=services,clusterer`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapContainerRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(33.36, 126.57),
            level: 8,
          };
          const newMap = new window.kakao.maps.Map(mapContainerRef.current, options);
          setMap(newMap);
        }
      });
    };
  }, []);

  // 2. Add Map-level Click Listener
  useEffect(() => {
    if (!map || !window.kakao) return;

    const mapClickListener = () => {
      onPlaceSelect(null);
    };

    window.kakao.maps.event.addListener(
      map,
      "click",
      mapClickListener // 분리된 핸들러 사용
    );

    return () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.event) {
        window.kakao.maps.event.removeListener(
          map,
          "click",
          mapClickListener // 동일한 핸들러 제거
        );
      }
    };
  }, [map, onPlaceSelect]);

  // 3. Load/Update Markers
  useEffect(() => {
    if (!map || !window.kakao) return;

    const clearMarkers = () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };

    const createOverlayContent = (title: string) => `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translateY(-15px);">
        <style>
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .bubble-container {
            animation: fadeIn 0.3s;
          }
        </style>
        <div class="bubble-container">
          <div style="padding: 8px 16px; background-color: #222; color: #fff; border-radius: 12px; font-size: 15px; font-weight: bold;">
            ${title}
          </div>
          <div style="width: 0px; height: 0px; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid rgb(34, 34, 34); margin: 0 auto;"></div>
        </div>
      </div>
    `;

    const loadMarkers = (data: PlaceItem[]) => {
      if (!Array.isArray(data) || data.length === 0) return;

      data.forEach((item) => {
        const imageUrl = markerImages[item.contentType.id.toString()] || markerImages.dangle;
        if (!imageUrl) return;

        const markerPosition = new window.kakao.maps.LatLng(item.lat, item.lng);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageUrl,
          new window.kakao.maps.Size(40, 40)
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: createOverlayContent(item.title),
          yAnchor: 1.7,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", () => customOverlay.setMap(map));
        window.kakao.maps.event.addListener(marker, "mouseout", () => customOverlay.setMap(null));
        window.kakao.maps.event.addListener(marker, "click", () => {
          onPlaceSelect(item);
          map.panTo(markerPosition);
        });

        marker.setMap(map);
        markersRef.current.push(marker);
      });

      if (data.length > 0) {
        const firstItemPosition = new window.kakao.maps.LatLng(data[0].lat, data[0].lng);
        map.setCenter(firstItemPosition);
        map.setLevel(8);
      }
    };

    const loadDangleMarkers = (data: DaengglePlacesMapResult) => {
      if (!Array.isArray(data) || data.length === 0) return;

      data.forEach((item) => {
        const imageUrl = markerImages.dangle;
        const markerPosition = new window.kakao.maps.LatLng(item.mapy, item.mapx);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageUrl,
          new window.kakao.maps.Size(40, 40)
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          title: item.placeTitle,
        });

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: createOverlayContent(item.placeTitle),
          yAnchor: 1.7,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", () => customOverlay.setMap(map));
        window.kakao.maps.event.addListener(marker, "mouseout", () => customOverlay.setMap(null));
        window.kakao.maps.event.addListener(marker, "click", () => {
          onDangleClick(item.video_id);
        });

        marker.setMap(map);
        markersRef.current.push(marker);
      });

      if (data.length > 0) {
        const firstItemPosition = new window.kakao.maps.LatLng(data[0].mapy, data[0].mapx);
        map.setCenter(firstItemPosition);
        map.setLevel(8);
      }
    };

    clearMarkers();
    if (activeFilter === "dangle") {
      if (daengglePlaces) {
        loadDangleMarkers(daengglePlaces);
      }
    } else if (places) {
      loadMarkers(places);
    }
  }, [map, places, daengglePlaces, activeFilter, onPlaceSelect, onDangleClick, markerImages]);

  // 4. Expose Map Utilities
  const centerToJeju = useCallback(() => {
    if (!map || !window.kakao) return;

    const jejuCenter = new window.kakao.maps.LatLng(33.3846, 126.5535);
    const zoomLevel = 10;

    map.setLevel(zoomLevel);
    map.panTo(jejuCenter);
  }, [map]);

  return { mapContainerRef, centerToJeju, map };
};
