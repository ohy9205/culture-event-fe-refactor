"use client";

import Button from "./Button";
import { DetailEvent } from "../types/events";
import { toggleLikes } from "../utils/events";
import { KeyedMutator } from "swr";

type Props = {
  eventId: number;
  mutate: KeyedMutator<DetailEvent | undefined>;
  isMyLikes: boolean;
  likesCount: number;
};

const Likes = ({ eventId, mutate, isMyLikes, likesCount }: Props) => {
  // 좋아요 토글
  const onToggleLikesHandler = async () => {
    const result = await toggleLikes(eventId);
    console.log(result);
    mutate();
  };

  return (
    <div>
      <Button onClick={onToggleLikesHandler}>{isMyLikes ? "❤️" : "🤍"}</Button>
      {likesCount}
    </div>
  );
};

export default Likes;
