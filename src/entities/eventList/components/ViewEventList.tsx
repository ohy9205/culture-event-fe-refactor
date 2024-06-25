import { SectionHeader } from "@/src/shared/components";
import { EventCarousel } from "../../eventCarousel";
import { getViewEvents } from "../api";

const ViewEventList = async () => {
  const viewEvents = await getViewEvents();

  return (
    <section className="flex flex-col justify-center gap-5">
      <SectionHeader>
        <SectionHeader.Title>조회순</SectionHeader.Title>
        <SectionHeader.LinkButton
          pathname="/event"
          query={{
            orderBy: "views",
          }}>{`조회순 전체보기 >`}</SectionHeader.LinkButton>
      </SectionHeader>
      <EventCarousel events={viewEvents.payload} />
    </section>
  );
};

export default ViewEventList;
