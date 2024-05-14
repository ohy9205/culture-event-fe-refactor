import SectionHeader from "../../UI/common/SectionHeader";
import { getRecentEvents } from "../../event/api/v1";
import EventCarousel from "../../eventCarousel/components/EventCarousel";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section className="flex flex-col justify-center gap-5">
      <SectionHeader>
        <SectionHeader.Title>최신순</SectionHeader.Title>
        <SectionHeader.LinkButton
          pathname="/event"
          query={{
            orderBy: "latest",
          }}>{`최신순 전체보기 >`}</SectionHeader.LinkButton>
      </SectionHeader>
      <EventCarousel events={recentEvents.payload} />
    </section>
  );
};

export default RecentEventList;
