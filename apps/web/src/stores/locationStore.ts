import { create } from "zustand";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;

  fetchLocation: () => Promise<void>;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  isLoading: false,
  error: null,

  fetchLocation: async () => {
    set({ isLoading: true, error: null });
    try {
      const position: GeolocationPosition = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      );

      set({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isLoading: false,
        error: null,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = "위치 정보를 가져올 수 없습니다.";

      if (err.code) {
        switch (err.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "위치 정보 접근 권한이 거부되었습니다.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "해당 기기는 현재 위치를 확인할 수 없습니다.";
            break;
          case 3: // TIMEOUT
            errorMessage = "위치 정보를 가져오는 데 시간이 초과되었습니다.";
            break;
        }
      }

      set({
        isLoading: false,
        error: errorMessage,
      });
      throw err;
    }
  },

  clearLocation: () => set({ latitude: null, longitude: null, error: null }),
}));
