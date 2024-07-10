"use client";

import { EventDetail } from "@/src/entities/eventDetail";
import { EventThumbnail } from "@/src/entities/eventList";
import { useModal } from "@/src/entities/modal";
import { EventCard, MultiCarousel } from "@/src/shared/components";
import "react-multi-carousel/lib/styles.css";

type Props = {
  events: EventThumbnail[];
};

const EventCarousel = ({ events }: Props) => {
  const { open } = useModal();
  return (
    <MultiCarousel
      options={{
        autoPlay: true,
        autoPlaySpeed: 3000,
        infinite: true,
        itemClass: "m-4",
        centerMode: true,
      }}>
      {events?.map(({ id, thumbnail, title }) => (
        <EventCard key={id}>
          <div
            className="relative h-[230px] md:h-[350px]"
            onClick={() => open(<EventDetail key={id} id={id} />)}>
            <EventCard.Image
              src={thumbnail}
              alt={title}
              sizes="500px"
              objectFit="cover"
            />
          </div>
        </EventCard>
      ))}
    </MultiCarousel>
  );
};

export default EventCarousel;
