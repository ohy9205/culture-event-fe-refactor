import Image from "next/image";
import { EventThumbnail } from "../../../types/events";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import MultiCarousel from "../../UI/container/MultiCarousel";
import EventDetail from "../client/EventDetail";

type Props = {
  events?: EventThumbnail[];
};

const EventCarousel = ({ events }: Props) => {
  return (
    <MultiCarousel>
      {events?.map((event) => (
        <ModalToggleCard
          key={event.id}
          modalContent={<EventDetail id={event.id} />}
        >
          <Image
            key={event.id}
            src={event.thumbnail}
            alt={event.title}
            width={600}
            height={600}
            className="object-cover h-[350px]"
          />
        </ModalToggleCard>
      ))}
    </MultiCarousel>
  );
};

export default EventCarousel;
