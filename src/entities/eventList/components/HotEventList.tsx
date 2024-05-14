import { EventThumbnail } from "@/src/shared/types/events";
import Image from "next/image";
import EventDetailModal from "../../eventDetail/components/EventDetailModal";
import SectionHeader from "../UI/common/SectionHeader";
import GridContainer from "../UI/container/GridContainer";
import { getHotEvents } from "./api/v1";

const HotEventList = async () => {
  const hotEvents = await getHotEvents();
  const hottestEvent = hotEvents.payload[0];
  const otherEvents = hotEvents.payload.splice(1);

  return (
    <section className="flex flex-col justify-center gap-3">
      <SectionHeader>
        <SectionHeader.Title>인기순</SectionHeader.Title>
        <SectionHeader.LinkButton
          pathname="/event"
          query={{
            orderBy: "likes",
          }}>{`인기순 전체보기 >`}</SectionHeader.LinkButton>
      </SectionHeader>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-2/5 h-[550px] relative">
          <EventDetailModal
            trigger={
              <Image
                src={hottestEvent?.thumbnail || ""}
                alt={hottestEvent?.title || "포스터"}
                style={{ objectFit: "cover" }}
                sizes="500px"
                fill
                priority
              />
            }
            eventId={hottestEvent?.id}
          />
        </div>

        <div className="flex-grow">
          <GridContainer isReponsive={false}>
            {otherEvents?.map((event: EventThumbnail) => (
              <EventDetailModal
                key={event.id}
                trigger={
                  <div className="relative h-[267px]">
                    <Image
                      key={event.id}
                      src={event.thumbnail}
                      alt={event.title}
                      style={{ objectFit: "cover" }}
                      sizes="200px"
                      fill
                    />
                  </div>
                }
                eventId={event.id}
              />
            ))}
          </GridContainer>
        </div>
      </div>
    </section>
  );
};

export default HotEventList;
