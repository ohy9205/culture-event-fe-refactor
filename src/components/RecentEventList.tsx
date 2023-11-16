import Image from "next/image";
import MultiCarousel from "./MultiCarousel";
import Button from "./Button";
import Link from "next/link";
import { getRecentEvents } from "../utils/events";
import EventCard from "./EventCard";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl text-center">최신순</h1>
      <MultiCarousel>
        {recentEvents?.map((event) => (
          <EventCard key={event.id} id={event.id}>
            <Image
              key={event.id}
              src={event.thumbnail}
              alt={event.title}
              width={400}
              height={400}
              className="object-cover h-[324px]"
            />
          </EventCard>
        ))}
      </MultiCarousel>
      <Link
        href={{ pathname: "/event", query: { orderBy: "latest" } }}
        className="m-auto"
      >
        <Button>{`최신순으로 전체보기 >`}</Button>
      </Link>
    </section>
  );
};

export default RecentEventList;
