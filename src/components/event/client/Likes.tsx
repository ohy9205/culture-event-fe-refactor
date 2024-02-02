"use client";

import { useLikesContext } from "@/src/context/LikesContext";
import useLikes from "@/src/hooks/useLikes";
import { useEffect, useState } from "react";
import Button from "../../UI/common/Button";

type Props = {
  eventId: number;
  useBackground?: boolean;
  likesCount?: number;
  useCount?: boolean;
  children?: React.ReactNode | ((count: number) => React.ReactNode);
};

const Likes = ({ eventId, useBackground, likesCount, children }: Props) => {
  const { toggle } = useLikes(eventId, likesCount); // 이벤트의 좋아요 갯수, 토글버튼
  const {
    state: { likes: myLikes },
    addLike,
    removeLike,
    fetching,
  } = useLikesContext();
  const [isMyLikes, setIsMyLikes] = useState<boolean>(false);

  const toggleButton = async () => {
    const { event, action } = await toggle();
    if (action === "add") {
      addLike(event);
    } else if (action === "remove") {
      removeLike(event);
    }
    setIsMyLikes((prev) => !prev);
    // myLikes를 업데이트

    // fetching();
  };

  useEffect(() => {
    if (myLikes?.find((event: any) => event.id === eventId)) {
      setIsMyLikes(true);
    } else {
      setIsMyLikes(false);
    }
  }, [eventId, myLikes]);

  // useEffect(() => {
  //   return () => {
  //     console.log("패칭@");
  //     fetching();
  //   };
  // }, []);

  // const toRender = typeof children === "function" ? children(count) : children;

  return (
    <div className="flex justify-center items-center gap-5">
      {useBackground ? (
        <Button size="md" color="dark" onClick={toggleButton}>
          {isMyLikes ? "❤️" : "🤍"}
        </Button>
      ) : (
        <Button onClick={toggleButton}>{isMyLikes ? "❤️" : "🤍"}</Button>
      )}
      {/* {toRender} */}
    </div>
  );
};

export default Likes;
