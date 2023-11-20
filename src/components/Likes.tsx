"use client";

import { KeyedMutator } from "swr";
import useMyLikes from "../hooks/useMyLikes";
import { DetailEvent } from "../types/events";
import { toggleLikes } from "../utils/events";
import Button from "./Button";

type Props = {
  eventId: number;
  detailMutate?: KeyedMutator<DetailEvent | undefined>;
  isMyLikes?: boolean;
  likesCount?: number;
};

const Likes = ({ eventId, detailMutate, isMyLikes, likesCount }: Props) => {
  const { isMyLikes: myLikes, mutate } = useMyLikes(eventId);

  const onToggleLikesHandler = async () => {
    await toggleLikes(eventId);
    detailMutate && detailMutate();
    mutate();
  };

  return (
    <div className={`flex gap-3 items-center`}>
      <Button size="md" onClick={onToggleLikesHandler}>
        {myLikes ? "❤️" : "🤍"}
      </Button>
      {likesCount !== undefined && <span>{likesCount}</span>}
    </div>
  );
};

export default Likes;
