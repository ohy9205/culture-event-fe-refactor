"use  client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SimpleEventListWithPagination } from "../types/events";
import { getFilteredEvents } from "../utils/events";
import EventDetail from "./EventDetail";
import { Filter } from "./FilteredEventList";
import GridContainer from "./GridContainer";
import Likes from "./Likes";
import ModalToggleCard from "./ModalToggleCard";
import Pagination from "./Pagination";

type Props = {
  filter: Filter;
};

const PAGE_PER_SIZE = 16;

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
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy } = filter;
      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        pagination.pageIndex,
        PAGE_PER_SIZE
      );

      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [pagination]);

  return (
    <div className="w-full flex flex-col gap-5">
      <GridContainer>
        {events.events.map((event) => {
          return (
            <div key={event.id} className="relative">
              <ModalToggleCard
                key={event.id}
                modalContent={<EventDetail id={event.id} />}
              >
                <div className="flex flex-col rounded-lg overflow-hidden h-[470px] shadow-lg">
                  <div className="h-[370px]">
                    <Image
                      src={event.thumbnail}
                      alt={`${event.title} 포스터`}
                      width={500}
                      height={500}
                      className="h-[370px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <h2 className="truncate font-bold mb-4">{event.title}</h2>
                    <h3 className="text-small">{event.eventPeriod}</h3>
                  </div>
                </div>
              </ModalToggleCard>
              <div className="absolute bottom-4 right-4">
                <Likes eventId={event.id} />
              </div>
            </div>
          );
        })}
      </GridContainer>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        totalPage={events.totalPage || 0}
      />
    </div>
  );
};

export default EventList;
