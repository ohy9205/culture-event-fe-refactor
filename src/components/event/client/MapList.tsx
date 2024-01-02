"use  client";

import Image from "next/image";
import useMapList from "../../../hooks/useMapList";
import Button from "../../UI/common/Button";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventDetail from "./EventDetail";
import Likes from "./Likes";
import StaticMap from "./StaticMap";

const MapList = () => {
  const { get, change } = useMapList();

  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:gap-0 px-5">
      <ul className="flex flex-col gap-4 w-full h-[800px] md:w-2/5  overflow-scroll py-2 md:pr-5">
        {get().events.map((event) => (
          <li key={event.id} className="shadow-lg rounded-lg relative">
            <div className="absolute top-3 right-5">
              <Likes eventId={event.id} />
            </div>
            <div className="flex " onClick={() => change().curEvent(event)}>
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
          latitude={get().curEvent?.longitude || ""}
          longitude={get().curEvent?.latitude || ""}
          heightStyle="h-[800px]"
        />
      </div>
    </div>
  );
};

export default MapList;
