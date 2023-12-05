"use client";

import useMyLikes from "../../../hooks/useMyLikes";
import Button from "../../UI/common/Button";

type Props = {
  eventId: number;
  useBackground?: boolean;
  likesCount?: number;
};

const Likes = ({ eventId, useBackground, likesCount }: Props) => {
  const {
    isMyLikes: myLikes,
    count,
    onToggleLikesHandler,
  } = useMyLikes(eventId, likesCount);

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
      {likesCount && <p>{count}</p>}
    </div>
  );
};

export default Likes;
