"use client";

import { useState } from "react";
import { toggleLikes } from "../../../apis/event/v2";
import useMyLikes from "../../../hooks/useMyLikes";
import Button from "../../UI/common/Button";

type Props = {
  eventId: number;
  useBackground?: boolean;
  likesCount?: number;
};

const Likes = ({ eventId, useBackground, likesCount }: Props) => {
  const { isMyLikes: myLikes, mutate } = useMyLikes(eventId);
  const [count, setCount] = useState(likesCount);

  const onToggleLikesHandler = async () => {
    const count = await toggleLikes(eventId);
    setCount(count);
    mutate();
  };

  return (
    <div className={`flex gap-3 items-center`}>
      {useBackground && (
        <Button size="md" color="dark" onClick={onToggleLikesHandler}>
          {myLikes ? "❤️" : "🤍"}
        </Button>
      )}
      {!useBackground && (
        <Button onClick={onToggleLikesHandler}>{myLikes ? "❤️" : "🤍"}</Button>
      )}
      {count && <p>{count}</p>}
    </div>
  );
};

export default Likes;
