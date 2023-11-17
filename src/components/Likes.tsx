"use client";

import { KeyedMutator } from "swr";
import { DetailEvent } from "../types/events";
import { toggleLikes } from "../utils/events";
import Button from "./Button";

type Props = {
  eventId: number;
  mutate: KeyedMutator<DetailEvent | undefined>;
  isMyLikes: boolean;
  likesCount: number;
};

const Likes = ({ eventId, mutate, isMyLikes, likesCount }: Props) => {
  // 좋아요 토글
  const onToggleLikesHandler = async () => {
    await toggleLikes(eventId);
    mutate();
  };

  return (
    <div className="flex gap-3 items-center">
      <Button size="lg" onClick={onToggleLikesHandler}>
        {isMyLikes ? "❤️" : "🤍"}
      </Button>
      <span>{likesCount}</span>
    </div>
  );
};

export default Likes;
