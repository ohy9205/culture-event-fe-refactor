"use client";

import useLikes from "@/src/hooks/useLikes";
import useMyLikes from "@/src/hooks/useMyLikes";
import { useEffect, useState } from "react";
import Button from "../../UI/common/Button";

type Props = {
  eventId: number;
  useBackground?: boolean;
  likesCount?: number;
  useCount?: boolean;
};

const Likes = ({ eventId, useBackground, likesCount, useCount }: Props) => {
  const { get: getEventLikes, toggle } = useLikes(eventId, likesCount);
  const { get: getMyLikes, mutate } = useMyLikes();
  const [isMyLikes, setIsMyLikes] = useState(false);

  useEffect(() => {
    if (
      getMyLikes().events &&
      getMyLikes().events.find((event: any) => event.id === eventId)
      // 내가 '좋아요'한 이벤트인지 백엔드에서 받아올 수 없을까
    ) {
      setIsMyLikes(true);
    } else {
      setIsMyLikes(false);
    }
  }, [eventId, getMyLikes, mutate]);

  const toggleButton = async () => {
    await toggle();
    mutate();
  };

  return (
    <div className="flex justify-center items-center gap-5">
      {useBackground ? (
        <Button size="md" color="dark" onClick={toggleButton}>
          {isMyLikes ? "❤️" : "🤍"}
        </Button>
      ) : (
        <Button onClick={toggleButton}>{isMyLikes ? "❤️" : "🤍"}</Button>
      )}
      {useCount && <div>{getEventLikes().count}</div>}
    </div>
  );
};

export default Likes;
