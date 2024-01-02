"use client";

import useMyLikes from "@/src/hooks/useMyLikes";
import { MouseEventHandler, useEffect, useState } from "react";
import Button from "./Button";

type Props = {
  eventId: number;
  onClick?: MouseEventHandler;
  background?: boolean;
};

const LikeButton = ({ eventId, onClick, background }: Props) => {
  const [isMyLikes, setIsMyLikes] = useState(false);
  const { get, mutate } = useMyLikes();

  useEffect(() => {
    if (
      get().events &&
      get().events.find((event: any) => event.id === eventId)
      // 내가 '좋아요'한 이벤트인지 백엔드에서 받아올 수 없을까
    ) {
      setIsMyLikes(true);
    } else {
      setIsMyLikes(false);
    }
    mutate();
  }, [eventId, get, mutate]);

  return background ? (
    <Button size="md" color="dark" onClick={onClick}>
      {isMyLikes ? "❤️" : "🤍"}
    </Button>
  ) : (
    <Button onClick={onClick}>{isMyLikes ? "❤️" : "🤍"}</Button>
  );
};

export default LikeButton;
