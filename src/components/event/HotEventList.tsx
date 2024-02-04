import { Event } from "@/src/types/events";
import Image from "next/image";
import Link from "next/link";
import { getHotEvents } from "../../apis/event/v1";
import Button from "../UI/common/Button";
import GridContainer from "../UI/container/GridContainer";
import EventDetailModal from "./EventDetailModal";

const HotEventList = async () => {
  const hotEvents = await getHotEvents();
  const hottestEvent = hotEvents.payload[0];
  const otherEvents = hotEvents.payload.splice(1);

  return (
    <section className="flex flex-col justify-center gap-3">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl text-center">인기순</h1>
        <Link href={{ pathname: "/event", query: { orderBy: "likes" } }}>
          <Button size="md" color="dark">{`인기순 전체보기 >`}</Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <EventDetailModal
          trigger={
            <div className="w-full h-[300px] md:h-[550px]">
              <Image
                src={hottestEvent?.thumbnail || ""}
                alt={hottestEvent?.title || "포스터"}
                width={500}
                height={550}
                className="object-cover w-full h-full"
              />
            </div>
          }
          eventId={hottestEvent?.id}
        />

        <div className="flex-grow">
          <GridContainer isReponsive={false}>
            {otherEvents?.map((event: Event) => (
              <EventDetailModal
                key={event.id}
                trigger={
                  <div className="h-[170px] sm:h-[267px]">
                    <Image
                      key={event.id}
                      src={event.thumbnail}
                      alt={event.title}
                      width={550}
                      height={550}
                      className="object-cover w-full h-full"
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
