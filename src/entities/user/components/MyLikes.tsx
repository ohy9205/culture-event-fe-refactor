"use client";

import { EventDetail } from "@/src/entities/eventDetail";
import { MyFavoriteEvent, useMyLikes } from "@/src/entities/user";
import { EventCard, GridContainer } from "@/src/shared/components";

const MyLikes = () => {
  const {
    data: { myLikes },
    openEventDetail,
  } = useMyLikes();

  return (
    <GridContainer>
      {myLikes?.map(({ id, thumbnail, title, period }: MyFavoriteEvent) => (
        <EventCard key={id}>
          <div
            onClick={() => {
              openEventDetail(<EventDetail id={id} />);
            }}>
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
          </div>
        </EventCard>
      ))}
      {!myLikes || (myLikes.length === 0 && <p>좋아요한 이벤트가 없습니다.</p>)}
    </GridContainer>
  );
};

export default MyLikes;
