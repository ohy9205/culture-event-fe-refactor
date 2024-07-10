"use client";

import { useMyLikes } from "@/src/entities/user";
import { useState } from "react";

const useLikeToggle = () => {
  const {
    toggleLike,
    data: { myLikes },
  } = useMyLikes();

  const [count, setCount] = useState<undefined | number>();

  const checkIsMyLike = (eventId: number) => {
    if (myLikes?.find((event) => event.id === eventId)) {
      return true;
    } else {
      return false;
    }
  };

  const toggleButton = async (eventId: number) => {
    const rs = await toggleLike(eventId);
    setCount(rs);
  };

  return {
    data: { likesCount: count },
    toggleButton,
    checkIsMyLike,
  };
};

export default useLikeToggle;
