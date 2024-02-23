"use client";

import useMyLikes from "@/src/hooks/useMyLikes";
import { MyFavoriteEvent } from "@/src/types/user";
import { useState } from "react";
import GridContainer from "../UI/container/GridContainer";
import EventCard from "../event/EventCard";
import EventDetailModal from "../event/EventDetailModal";

const MyLikes = () => {
  const {
    data: { likes },
  } = useMyLikes();
  // 실제 데이터를 카피해서 사용함
  const [events, setEvents] = useState(likes);

  return (
    <GridContainer>
      {events?.map(({ id, thumbnail, title, period }: MyFavoriteEvent) => (
        <EventCard key={id}>
          <EventDetailModal
            eventId={id}
            trigger={
              <>
                <EventCard.Image
                  src={thumbnail}
                  alt={`${title} 포스터`}
                  height={500}
                  width={500}
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
      ))}
    </GridContainer>
  );
};

export default MyLikes;
