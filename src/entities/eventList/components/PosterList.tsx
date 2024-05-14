import { SimpleEvent } from "@/src/shared/types/events";
import { EventCard } from "../../UI/common";
import { GridContainer } from "../../UI/container";
import { EventDetailModal } from "../../eventDetail/components";
import { LikeButton } from "../../favoritButton/components";

type Props = {
  list: SimpleEvent[];
};

const PosterList = ({ list }: Props) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <GridContainer>
        {list.map(({ eventPeriod, id, thumbnail, title, views }) => {
          return (
            <EventCard key={id}>
              <EventDetailModal
                eventId={id}
                trigger={
                  <>
                    <div className="w-full h-[250px] sm:h-[370px] relative">
                      <EventCard.Image
                        src={thumbnail}
                        alt={`${title} 포스터`}
                        sizes="300px"
                        objectFit="cover"
                        priotity={true}
                      />
                    </div>
                    <div className="px-5 pt-4 pb-5">
                      <EventCard.Title>{title}</EventCard.Title>
                      <EventCard.Period>{eventPeriod}</EventCard.Period>
                    </div>
                  </>
                }
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-2">
                <EventCard.Views>{views}</EventCard.Views>
                <div>
                  <LikeButton eventId={id} />
                </div>
              </div>
            </EventCard>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default PosterList;
