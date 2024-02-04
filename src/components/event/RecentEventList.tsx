import Link from "next/link";
import { getRecentEvents } from "../../apis/event/v1";
import Button from "../UI/common/Button";
import EventCarousel from "./EventCarousel";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section className="flex flex-col justify-center gap-5">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl text-center">최신순</h1>
        <Link href={{ pathname: "/event", query: { orderBy: "latest" } }}>
          <Button size="md" color="dark">{`최신순 전체보기 >`}</Button>
        </Link>
      </div>
      <EventCarousel events={recentEvents.payload} />
    </section>
  );
};

export default RecentEventList;
