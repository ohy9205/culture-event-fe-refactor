import Image from "next/image";
import Link from "next/link";
import { getHotEvents } from "../utils/events";
import Button from "./Button";
import EventDetail from "./EventDetail";
import GridContainer from "./GridContainer";
import ModalToggleCard from "./ModalToggleCard";

const HotEventList = async () => {
  const hotEvents = await getHotEvents();
  const hottestEvent = hotEvents && hotEvents[0];
  const otherEvents = hotEvents?.splice(1);

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl text-center">인기순</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <ModalToggleCard modalContent={<EventDetail id={hottestEvent?.id!} />}>
          <div className="w-full h-[550px]">
            <Image
              src={hottestEvent?.thumbnail || ""}
              alt={hottestEvent?.title || "포스터"}
              width={500}
              height={550}
              className="object-cover w-full h-full"
            />
          </div>
        </ModalToggleCard>
        <div className="flex-grow">
          <GridContainer isReponsive={false}>
            {otherEvents?.map((event) => (
              <ModalToggleCard
                key={event.id}
                modalContent={<EventDetail id={event.id} />}
              >
                <div key={event.id} className="h-[267px]">
                  <Image
                    key={event.id}
                    src={event.thumbnail}
                    alt={event.title}
                    width={550}
                    height={550}
                    className="object-cover w-full h-full"
                  />
                </div>
              </ModalToggleCard>
            ))}
          </GridContainer>
        </div>
      </div>

      <Link
        href={{ pathname: "/event", query: { orderBy: "views" } }}
        className="m-auto"
      >
        <Button>{`인기순으로 전체보기 >`}</Button>
      </Link>
    </section>
  );
};

export default HotEventList;
