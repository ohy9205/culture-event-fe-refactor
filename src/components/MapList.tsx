"use  client";

import { useEffect, useState } from "react";
import { Filter } from "./FilteredEventList";
import { SimpleEvent } from "../types/events";
import StaticMap from "./StaticMap";
import EventCard from "./EventCard";
import { getFilteredEventsWithoutPagination } from "../utils/events";
import Image from "next/image";
import Button from "./Button";

type Props = {
  filter: Filter;
};

const MapList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
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
        console.log(data);
        setEvents(data);
        setCurEvent(data[0]);
      }
    };
    fetchingData();
  }, [filter]);

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 w-1/3 h-[500px] overflow-scroll p-2">
        {events.map((event) => (
          <>
            <div
              key={event.id}
              className="flex gap-4 bg-slate-200"
              onClick={() => setCurEvent(event)}
            >
              <Image
                src={event.thumbnail}
                alt={`${event.title} 포스터`}
                width={500}
                height={500}
                className="w-1/4 h-[150px] object-cover"
              />
              <div className="w-2/4">
                <h2>{event.title}</h2>
                <h3>{event.eventPeriod}</h3>
                <div>{event.views}</div>
              </div>

              <EventCard id={event.id}>
                <Button size="sm">{`상세정보`}</Button>
              </EventCard>
            </div>
          </>
        ))}
      </div>
      <div className="w-2/3">
        <StaticMap
          latitude={curEvent?.longitude || ""}
          longitude={curEvent?.latitude || ""}
        />
      </div>
    </div>
  );
};

export default MapList;
