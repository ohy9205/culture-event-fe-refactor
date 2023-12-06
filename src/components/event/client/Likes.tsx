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

  const countRender = () => {
    if (likesCount === undefined || count === undefined) {
      return;
    }
    if (count !== undefined) {
      return count;
    } else if (likesCount) {
      return likesCount;
    }
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
      {countRender()}
    </div>
  );
};

export default Likes;
