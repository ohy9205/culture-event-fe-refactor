import SectionHeader from "../../UI/common/SectionHeader";
import { getViewEvents } from "../../event/api/v1";
import EventCarousel from "../../eventCarousel/components/EventCarousel";

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
