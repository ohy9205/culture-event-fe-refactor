"use  client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SimpleEvent } from "../types/events";
import { getFilteredEventsWithoutPagination } from "../utils/events";
import Button from "./Button";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";
import Likes from "./Likes";
import StaticMap from "./StaticMap";

type Props = {
  filter: Filter;
};

const MapList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
      console.log("패칭");
      const { location, category, cost, startDate, endDate, orderBy } = filter;
      const data = await getFilteredEventsWithoutPagination(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy
      );
      if (data) {
        setEvents(data);
        setCurEvent(data[0]);
      }
    };
    fetchingData();
  }, [filter]);

  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:gap-0 px-5">
      <ul className="flex flex-col gap-4 w-full h-[500px] md:w-2/5  overflow-scroll py-2 md:pr-5">
        {events.map((event) => (
          <li key={event.id} className="shadow-md rounded-lg relative">
            <div className="absolute top-0 right-0">
              <Likes eventId={event.id} />
            </div>
            <div className="flex " onClick={() => setCurEvent(event)}>
              <Image
                src={event.thumbnail}
                alt={`${event.title} 포스터`}
                width={500}
                height={500}
                className="w-1/4 h-[150px] object-cover"
              />
              <div className="flex flex-col w-2/4 py-4 pl-4">
                <h2 className="truncate font-bold mb-2">{event.title}</h2>
                <h3 className="text-sm mb-4">{event.eventPeriod}</h3>
                <EventCard id={event.id}>
                  <Button size="sm">{`상세정보`}</Button>
                </EventCard>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full md:w-3/5">
        <StaticMap
          latitude={curEvent?.longitude || ""}
          longitude={curEvent?.latitude || ""}
        />
      </div>
    </div>
  );
};

export default MapList;
