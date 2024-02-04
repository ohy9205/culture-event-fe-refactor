"use client";

import useMyLikes from "@/src/hooks/useMyLikes";
import { FavoriteEvent } from "@/src/types/user";
import { useState } from "react";
import EventCard from "../event/EventCard";
import EventDetailModal from "../event/EventDetailModal";

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
              <EventDetailModal
                eventId={id}
                trigger={
                  <>
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
                  </>
                }
              />
            </EventCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyLikes;
