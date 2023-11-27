"use client";

import { KeyedMutator } from "swr";
import { toggleLikes } from "../../../apis/event/v2";
import useMyLikes from "../../../hooks/useMyLikes";
import { DetailEvent } from "../../../types/events";
import Button from "../../UI/common/Button";

type Props = {
  eventId: number;
  useBackground?: boolean;
  detailMutate?: KeyedMutator<DetailEvent | undefined>;
};

const Likes = ({ eventId, detailMutate, useBackground }: Props) => {
  const { isMyLikes: myLikes, mutate } = useMyLikes(eventId);

  const onToggleLikesHandler = async () => {
    await toggleLikes(eventId);
    mutate();
    detailMutate && detailMutate();
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
    </div>
  );
};

export default Likes;
