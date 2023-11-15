"use  client";

import { useState, useEffect } from "react";
import { getFilteredEvents } from "../utils/events";
import GridContainer from "./GridContainer";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";
import Image from "next/image";
import Pagination from "./Pagination";
import { SimpleEventListWithPagination } from "../types/events";

type Props = {
  filter: Filter;
};

const PAGE_PER_SIZE = 10;

const EventList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEventListWithPagination>({
    events: [],
    totalPage: 0,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagingGroupIndex: 0,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0, pagingGroupIndex: 0 }));
    const fetchingData = async () => {
      const data = await fetchData(filter, 0);
      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const data = await fetchData(filter, pagination.pageIndex);
      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [pagination]);

  return (
    <div>
      <GridContainer>
        {events.events.map((event) => (
          <EventCard key={event.id} id={event.id}>
            <div className="flex flex-col">
              <Image
                src={event.thumbnail}
                alt={`${event.title} 포스터`}
                width={500}
                height={500}
                className="w-full h-[370px] object-cover"
              />
              <h2>{event.title}</h2>
              <h3>{event.eventPeriod}</h3>
            </div>
          </EventCard>
        ))}
      </GridContainer>
      <Pagination
        pagePerSize={PAGE_PER_SIZE}
        pagination={pagination}
        setPagination={setPagination}
        totalPage={events.totalPage || 0}
      />
    </div>
  );
};

export default EventList;

const fetchData = async (filter: Filter, pageIndex: number) => {
  const { location, category, cost, startDate, endDate, orderBy } = filter;
  const data = await getFilteredEvents(
    location,
    category,
    cost,
    startDate,
    endDate,
    orderBy,
    pageIndex,
    PAGE_PER_SIZE
  );

  return data;
};
