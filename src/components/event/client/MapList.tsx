"use client";

import useMapList from "@/src/hooks/useMapList";
import { Event } from "@/src/types/events";
import Button from "../../UI/common/Button";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import Likes from "./Likes";
import StaticMap from "./StaticMap";

const MapList = ({ list }: { list: Event[] }) => {
  const {
    data: { curEvent },
    changeCurrentEvent,
  } = useMapList(list[0]);

  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:gap-0 px-5">
      <div className="flex flex-col gap-4 w-full h-[800px] md:w-2/5  overflow-scroll py-2 md:pr-5">
        {list.map((event) => (
          <EventCard key={event.id}>
            <div
              className="flex relative"
              onClick={() => changeCurrentEvent(event)}
            >
              <EventCard.Image
                src={event.thumbnail}
                alt={event.title}
                width={500}
                height={500}
                style="w-1/4 object-contain"
              />
              <div className="absolute top-3 right-5">
                <Likes eventId={event.id} />
              </div>
              <div className="flex flex-col w-3/5 py-4 px-4 gap-2">
                <EventCard.Title>{event.title}</EventCard.Title>
                <EventCard.Period>{event.eventPeriod}</EventCard.Period>
                <EventCard.Views>{event.views}</EventCard.Views>
                <ModalToggleCard modalContent={<EventDetail id={event.id} />}>
                  <Button size="sm" color="dark">{`상세정보`}</Button>
                </ModalToggleCard>
              </div>
            </div>
          </EventCard>
        ))}
      </div>
      <div className="w-full md:w-3/5">
        <StaticMap
          latitude={curEvent.longitude || ""}
          longitude={curEvent.latitude || ""}
          heightStyle="h-[800px]"
        />
      </div>
    </div>
  );
};

export default MapList;
