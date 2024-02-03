"use client";

import { Event } from "@/src/types/events";
import GridContainer from "../../UI/container/GridContainer";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import Likes from "./Likes";

type Props = {
  list: Event[];
};

const PosterList = ({ list }: Props) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <GridContainer>
        {list.map(({ eventPeriod, id, thumbnail, title, views }) => {
          return (
            <EventCard key={id} height="500px">
              <ModalToggleCard key={id} modalContent={<EventDetail id={id} />}>
                <EventCard.Image
                  src={thumbnail}
                  alt={`${title} 포스터`}
                  height={500}
                  width={500}
                  style="object-contain h-[370px]"
                />
                <div className="px-5 pt-4 pb-5">
                  <EventCard.Title>{title}</EventCard.Title>
                  <EventCard.Period>{eventPeriod}</EventCard.Period>
                </div>
              </ModalToggleCard>

              <div className="flex items-center justify-between px-5">
                <EventCard.Views>{views}</EventCard.Views>
                <Likes eventId={id} />
              </div>
            </EventCard>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default PosterList;
