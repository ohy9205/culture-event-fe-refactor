"use client";

import useStaticMap from "@/src/hooks/useStaticMap";

type Props = {
  latitude: string;
  longitude: string;
  heightStyle: string;
};

const StaticMap = ({ latitude, longitude, heightStyle }: Props) => {
  const {
    data: { mapRef },
  } = useStaticMap(latitude, longitude);

  return <div id="map" ref={mapRef} className={`w-full ${heightStyle}`}></div>;
};

export default StaticMap;
