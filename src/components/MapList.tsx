"use  client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SimpleEvent } from "../types/events";
import { getFilteredEventsWithoutPagination } from "../utils/events";
import Button from "./Button";
import EventDetail from "./EventDetail";
import { Filter } from "./FilteredEventList";
import Likes from "./Likes";
import ModalToggleCard from "./ModalToggleCard";
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
      <ul className="flex flex-col gap-4 w-full h-[800px] md:w-2/5  overflow-scroll py-2 md:pr-5">
        {events.map((event) => (
          <li key={event.id} className="shadow-lg rounded-lg relative">
            <div className="absolute top-3 right-5">
              <Likes eventId={event.id} />
            </div>
            <div className="flex " onClick={() => setCurEvent(event)}>
              <Image
                src={event.thumbnail}
                alt={`${event.title} 포스터`}
                width={500}
                height={500}
                className="w-1/4 object-contain"
              />
              <div className="flex flex-col w-3/5 py-4 pl-4">
                <h2 className="font-bold mb-2">{event.title}</h2>
                <h3 className="text-sm mb-2">{event.eventPeriod}</h3>
                <div className="flex gap-1 items-center text-sm mb-2">
                  <span className="">조회수</span>
                  <span className="font-semibold"> {event.views}</span>
                </div>
                <ModalToggleCard modalContent={<EventDetail id={event.id} />}>
                  <Button size="sm" color="dark">{`상세정보`}</Button>
                </ModalToggleCard>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full md:w-3/5">
        <StaticMap
          latitude={curEvent?.longitude || ""}
          longitude={curEvent?.latitude || ""}
          heightStyle="h-[800px]"
        />
      </div>
    </div>
  );
};

export default MapList;
