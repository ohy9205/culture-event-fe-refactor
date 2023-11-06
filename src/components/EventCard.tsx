import Image from "next/image";
import { SimpleEvent } from "../types/events";

type Props = {
  event: SimpleEvent;
};

const EventCard = ({
  event: { thumbnail, title, eventPeriod, views },
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
      <div>{views}</div>
    </div>
  );
};

export default EventCard;
