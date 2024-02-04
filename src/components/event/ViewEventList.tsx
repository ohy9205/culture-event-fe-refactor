import Link from "next/link";
import { getViewEvents } from "../../apis/event/v1";
import Button from "../UI/common/Button";
import EventCarousel from "./EventCarousel";

const ViewEventList = async () => {
  const viewEvents = await getViewEvents();

  return (
    <section className="flex flex-col justify-center gap-5">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl text-center">조회순</h1>
        <Link href={{ pathname: "/event", query: { orderBy: "views" } }}>
          <Button size="md" color="dark">{`조회순 전체보기 >`}</Button>
        </Link>
      </div>
      <EventCarousel events={viewEvents.payload} />
    </section>
  );
};

export default ViewEventList;
