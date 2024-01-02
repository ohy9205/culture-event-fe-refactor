"use client";

import useLikes from "@/src/hooks/useLikes";
import LikeButton from "../../UI/common/LikeButton";

type Props = {
  eventId: number;
  useBackground?: boolean;
  likesCount?: number;
};

const Likes = ({ eventId, useBackground, likesCount }: Props) => {
  const { get, toggle } = useLikes(eventId, likesCount);

  return (
    <div className={`flex gap-3 items-center`}>
      {useBackground && (
        <>
          <LikeButton eventId={eventId} onClick={toggle} background />
          {get().count}
        </>
      )}
      {!useBackground && <LikeButton eventId={eventId} onClick={toggle} />}
    </div>
  );
};

export default Likes;
