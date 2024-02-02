"use client";

import { useLikesContext } from "@/src/context/LikesContext";
import { FavoriteEvent } from "@/src/types/user";
import { useEffect, useState } from "react";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventCard from "../../event/client/EventCard";
import EventDetail from "../../event/client/EventDetail";

const MyLikes = () => {
  const {
    state: { likes },
    fetching,
  } = useLikesContext();
  // 실제 데이터르 들고와서 myLikes에 복사함
  const [events, setEvents] = useState(likes);

  const mutate = () => {
    setEvents(events);
  };

  useEffect(() => {
    setEvents(likes);

    return () => {
      fetching();
    };
  }, []);

  return (
    <>
      <ul className="flex gap-4 overflow-scroll py-7">
        {events?.map(({ id, thumbnail, title, period }: FavoriteEvent) => (
          <li key={id} className="p-2">
            <ModalToggleCard modalContent={<EventDetail id={id} />}>
              {(isShowModal) => {
                console.log(`isShowModal`, isShowModal);
                // !isShowModal && fetching();
                // get();
                // fetching();
                // mutate();
                return (
                  <EventCard width="250px">
                    <EventCard.Image
                      src={thumbnail}
                      alt={`${title} 포스터`}
                      height={900}
                      width={900}
                      style="object-cover h-[300px]"
                    />
                    <div className="flex flex-col gap-2 p-5">
                      <EventCard.Title>{title}</EventCard.Title>
                      <EventCard.Period>{period}</EventCard.Period>
                    </div>
                  </EventCard>
                );
              }}
            </ModalToggleCard>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyLikes;
