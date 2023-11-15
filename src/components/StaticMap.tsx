"use client";

import { useEffect, useRef } from "react";

type Props = {
  latitude: string;
  longitude: string;
};

const StaticMap = ({ latitude, longitude }: Props) => {
  // console.log(`latitude-${latitude} / longitude-${longitude}`);
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

  return <div id="map" ref={mapRef} className="w-full h-[500px]"></div>;
};

export default StaticMap;
