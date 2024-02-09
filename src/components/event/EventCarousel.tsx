"use client";

import "react-multi-carousel/lib/styles.css";
import { EventThumbnail } from "../../types/events";
import MultiCarousel from "../UI/container/MultiCarousel";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";

type Props = {
  events?: EventThumbnail[];
};

const EventCarousel = ({ events }: Props) => {
  return (
    <MultiCarousel
      options={{
        autoPlay: true,
        autoPlaySpeed: 3000,
        infinite: true,
        itemClass: "m-4",
        centerMode: true,
      }}
    >
      {events?.map(({ id, thumbnail, title }) => (
        <EventDetailModal
          key={id}
          eventId={id}
          trigger={
            <EventCard>
              <EventCard.Image
                src={thumbnail}
                alt={title}
                width={600}
                height={600}
                style="object-cover h-[230px] md:h-[350px]"
              />
            </EventCard>
          }
        />
      ))}
    </MultiCarousel>
  );
};

export default EventCarousel;
