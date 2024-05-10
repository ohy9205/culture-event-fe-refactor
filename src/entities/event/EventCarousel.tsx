"use client";

import "react-multi-carousel/lib/styles.css";
import { EventThumbnail } from "../../shared/types/events";
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
      }}>
      {events?.map(({ id, thumbnail, title }) => (
        <EventDetailModal
          key={id}
          eventId={id}
          trigger={
            <EventCard>
              <div className="relative h-[230px] md:h-[350px]">
                <EventCard.Image
                  src={thumbnail}
                  alt={title}
                  sizes="500px"
                  objectFit="cover"
                />
              </div>
            </EventCard>
          }
        />
      ))}
    </MultiCarousel>
  );
};

export default EventCarousel;
