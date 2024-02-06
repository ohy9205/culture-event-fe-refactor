import { SimpleEvent } from "@/src/types/events";
import LikeButton from "../UI/common/LikeButton";
import GridContainer from "../UI/container/GridContainer";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";

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
                    <EventCard.Image
                      src={thumbnail}
                      alt={`${title} 포스터`}
                      height={500}
                      width={500}
                      style="object-cover h-[250px] sm:h-[370px]"
                    />
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
