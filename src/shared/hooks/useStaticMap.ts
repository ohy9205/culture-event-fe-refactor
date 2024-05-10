import { useEffect, useRef } from "react";

const useStaticMap = (latitude: string, longitude: string) => {
  const mapRef = useRef<HTMLElement | null | any>(null);

  useEffect(() => {
    const lat = parseFloat(latitude);
    const log = parseFloat(longitude);

    let location = new naver.maps.LatLng(lat, log);
    let map = new naver.maps.Map("map", { center: location });

    mapRef.current = new naver.maps.Marker({
      map,
      position: location,
    });
  }, [latitude, longitude]);

  return {
    data: { mapRef },
  };
};

export default useStaticMap;
