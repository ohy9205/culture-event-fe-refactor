"use client";

import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import { EventThumbnail } from "../../types/events";
import MultiCarousel from "../UI/container/MultiCarousel";
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
        itemClass: "p-2",
        centerMode: true,
      }}
    >
      {events?.map((event) => (
        <EventDetailModal
          key={event.id}
          eventId={event.id}
          trigger={
            <Image
              key={event.id}
              src={event.thumbnail}
              alt={event.title}
              width={600}
              height={600}
              className="object-cover h-[350px]"
            />
          }
        />
      ))}
    </MultiCarousel>
  );
};

export default EventCarousel;
