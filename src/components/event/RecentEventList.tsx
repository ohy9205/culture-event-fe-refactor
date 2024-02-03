import Link from "next/link";
import { getRecentEvents } from "../../apis/event/v1";
import Button from "../UI/common/Button";
import EventCarousel from "./EventCarousel";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl text-center">최신순</h1>
      <EventCarousel events={recentEvents.payload} />
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
