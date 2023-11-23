"use  client";

import Image from "next/image";
import useEventList from "../hooks/useEvnetList";
import { Filter } from "../hooks/useFilter";
import EventDetail from "./EventDetail";
import Pagination from "./Pagination";
import Likes from "./common/Likes";
import GridContainer from "./container/GridContainer";
import ModalToggleCard from "./container/ModalToggleCard";

type Props = {
  filter: Filter;
};

const EventList = ({ filter }: Props) => {
  const { events, pagination, setPagination } = useEventList(filter);

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
                <div className="flex flex-col rounded-lg overflow-hidden h-[500px] shadow-lg">
                  <div className="h-[370px]">
                    <Image
                      src={event.thumbnail}
                      alt={`${event.title} 포스터`}
                      width={500}
                      height={500}
                      className="h-[370px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col h-full p-5">
                    <h2 className="truncate font-bold mb-3">{event.title}</h2>
                    <h3 className="text-small">{event.eventPeriod}</h3>
                  </div>
                </div>
              </ModalToggleCard>
              <div className="absolute bottom-4 left-5 flex gap-1 text-sm">
                <span>조회수</span>
                <span className="font-semibold">{event.views}</span>
              </div>
              <div className="absolute bottom-3 right-5">
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
