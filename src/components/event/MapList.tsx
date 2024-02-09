"use client";

import useMapList from "@/src/hooks/useMapList";
import { SimpleEvent } from "@/src/types/events";
import Button from "../UI/common/Button";
import LikeButton from "../UI/common/LikeButton";
import StaticMap from "../UI/common/StaticMap";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";

const MapList = ({ list }: { list: SimpleEvent[] }) => {
  const {
    data: { curEvent },
    changeCurrentEvent,
  } = useMapList(list[0]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <ul className="w-full md:w-2/5 flex flex-col gap-4 md:h-[800px] overflow-scroll py-2 md:pr-5">
        {list.map((event) => (
          <li key={event.id}>
            <EventCard>
              <div
                className="flex relative"
                onClick={() => changeCurrentEvent(event)}
              >
                <EventCard.Image
                  src={event.thumbnail}
                  alt={event.title}
                  width={500}
                  height={500}
                  style="w-1/4 object-cover"
                />
                <div className="absolute top-3 right-5">
                  <LikeButton eventId={event.id} />
                </div>
                <div className="flex flex-col w-3/5 py-4 px-4 gap-2">
                  <EventCard.Title>{event.title}</EventCard.Title>
                  <EventCard.Period>{event.eventPeriod}</EventCard.Period>
                  <EventCard.Views>{event.views}</EventCard.Views>
                  <EventDetailModal
                    eventId={event.id}
                    trigger={
                      <Button size="sm" color="dark">{`상세정보`}</Button>
                    }
                  />
                </div>
              </div>
            </EventCard>
          </li>
        ))}
      </ul>
      <div className="w-full">
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
