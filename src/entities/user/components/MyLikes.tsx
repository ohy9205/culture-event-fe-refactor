"use client";

import useMyLikes from "@/src/shared/hooks/useMyLikes";
import { MyFavoriteEvent } from "@/src/shared/types/user";
import EventCard from "../../UI/common/EventCard";
import GridContainer from "../../components/UI/container/GridContainer";
import EventDetailModal from "../../eventDetail/components/EventDetailModal";

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
      {!myLikes || (myLikes.length === 0 && <p>좋아요한 이벤트가 없습니다.</p>)}
    </GridContainer>
  );
};

export default MyLikes;
