"use client";

import useMyLikes from "@/src/hooks/useMyLikes";
import { MyFavoriteEvent } from "@/src/types/user";
import GridContainer from "../UI/container/GridContainer";
import EventCard from "../event/EventCard";
import EventDetailModal from "../event/EventDetailModal";

const MyLikes = () => {
  const {
    data: { myLikes },
  } = useMyLikes();
  // 실제 데이터를 카피해서 사용함

  return (
    <GridContainer>
      {myLikes?.map(({ id, thumbnail, title, period }: MyFavoriteEvent) => (
        <EventCard key={id}>
          <EventDetailModal
            eventId={id}
            trigger={
              <>
                <div className="relative h-[300px]">
                  <EventCard.Image
                    src={thumbnail}
                    alt={`${title} 포스터`}
                    objectFit="cover"
                    sizes="300px"
                    priotity={true}
                  />
                </div>
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
