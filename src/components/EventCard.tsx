import Image from "next/image";
import { Event } from "../types/events";

type Props = {
  event: Event;
};

const EventCard = ({
  event: { thumbnail, title, eventPeriod, favorite },
}: Props) => {
  return (
    <div className="flex flex-col">
      <Image
        src={thumbnail}
        alt={`${title} 포스터`}
        width={500}
        height={500}
        className="w-full h-[370px] object-cover"
      />
      <h2>{title}</h2>
      <h3>{eventPeriod}</h3>
      <div>{favorite}</div>
    </div>
  );
};

export default EventCard;
