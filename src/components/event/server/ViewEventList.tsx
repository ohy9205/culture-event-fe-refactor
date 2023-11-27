import Link from "next/link";
import { getViewEvents } from "../../../apis/event/v1";
import Button from "../../UI/common/Button";
import EventCarousel from "./EventCarousel";

const ViewEventList = async () => {
  const viewEvents = await getViewEvents();

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl text-center">조회순</h1>
      <EventCarousel events={viewEvents} />
      <Link
        href={{ pathname: "/event", query: { orderBy: "views" } }}
        className="m-auto"
      >
        <Button size="lg" color="dark">{`조회순으로 전체보기 >`}</Button>
      </Link>
    </section>
  );
};

export default ViewEventList;
