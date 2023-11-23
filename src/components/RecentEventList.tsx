import Image from "next/image";
import Link from "next/link";
import { getRecentEvents } from "../apis/event/v1";
import EventDetail from "./EventDetail";
import Button from "./common/Button";
import ModalToggleCard from "./container/ModalToggleCard";
import MultiCarousel from "./container/MultiCarousel";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl text-center">최신순</h1>
      <MultiCarousel>
        {recentEvents?.map((event) => (
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
      <Link
        href={{ pathname: "/event", query: { orderBy: "latest" } }}
        className="m-auto"
      >
        <Button size="lg" color="dark">{`최신순으로 전체보기 >`}</Button>
      </Link>
    </section>
  );
};

export default RecentEventList;
