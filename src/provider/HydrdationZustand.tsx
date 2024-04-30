"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const HydrationZustand = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : null}</>;
};

export default HydrationZustand;
