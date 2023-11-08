import { useState, useEffect } from "react";
import { getFilteredEvents } from "../utils/events";
import GridContainer from "./GridContainer";
import { SimpleEventList } from "../types/events";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";
import Image from "next/image";

type Props = {
  filter: Filter;
};

const EventList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEventList>({
    events: [],
    totalPage: 0,
  });
  const [pagination, setPagenation] = useState({
    totalPage: 0,
    pageIndex: 0,
    pageSize: 10,
    totalPagingGroup: 0,
    pagingGroupIndex: 0,
  });

  const onClickHandler = (curIndex: number, curPagingGroupIndex: number) => {
    setPagenation((prev) => ({
      ...prev,
      pageIndex: curIndex,
      pagingGroupIndex: curPagingGroupIndex,
    }));
  };

  useEffect(() => {
    const { location, category, cost, startDate, endDate, orderBy } = filter;
    const fetchingData = async () => {
      const data = await getFilteredEvents(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy,
        pagination.pageIndex,
        pagination.pageSize
      );

      if (data) {
        setEvents(data);
        setPagenation((prev) => ({
          ...prev,
          totalPage: data?.totalPage || 0,
          totalPagingGroup: (data?.totalPage || 0) / 5 + 1,
        }));
      }
    };

    fetchingData();
  }, [filter]);

  return (
    <div>
      <GridContainer>
        {events.events.map((event) => (
          <EventCard key={event.id} id={event.id}>
            <Image
              src={event.thumbnail}
              alt={`${event.title} 포스터`}
              width={500}
              height={500}
              className="w-full h-[370px] object-cover"
            />
            <h2>{event.title}</h2>
            <h3>{event.eventPeriod}</h3>
            <div>{event.views}</div>
          </EventCard>
        ))}
      </GridContainer>
    </div>
  );
};

export default EventList;
