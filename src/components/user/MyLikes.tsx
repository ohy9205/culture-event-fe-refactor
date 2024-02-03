"use client";

import useMyLikes from "@/src/hooks/useMyLikes";
import { FavoriteEvent } from "@/src/types/user";
import { useState } from "react";
import LikeButton from "../UI/common/LikeButton";
import ModalToggleCard from "../UI/container/ModalToggleCard";
import EventCard from "../event/EventCard";
import EventDetail from "../event/EventDetail";

const MyLikes = () => {
  const {
    data: { likes },
  } = useMyLikes();
  // 실제 데이터를 카피해서 사용함
  const [events, setEvents] = useState(likes);

  return (
    <>
      <ul className="flex gap-4 overflow-scroll py-7">
        {events?.map(({ id, thumbnail, title, period }: FavoriteEvent) => (
          <li key={id} className="p-2">
            <EventCard width="250px">
              <ModalToggleCard modalContent={<EventDetail id={id} />}>
                <EventCard.Image
                  src={thumbnail}
                  alt={`${title} 포스터`}
                  height={900}
                  width={900}
                  style="object-cover h-[300px]"
                />
                <div className="flex flex-col gap-2 p-5">
                  <EventCard.Title>{title}</EventCard.Title>
                  <EventCard.Period>{period}</EventCard.Period>
                </div>
              </ModalToggleCard>
              <LikeButton eventId={id} />
            </EventCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyLikes;
