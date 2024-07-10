import { EventCarousel } from "@/src/entities/eventCarousel";
import {
  HotEventList,
  getHotEvents,
  getRecentEvents,
  getViewEvents,
} from "@/src/entities/eventList";
import { SectionHeader } from "@/src/shared/components";

const SECTION_STYLE = "flex flex-col justify-center gap-3";

const Home = async () => {
  const { payload: hotEvents } = await getHotEvents();
  const { payload: viewEvents } = await getViewEvents();
  const { payload: recentEvents } = await getRecentEvents();

  return (
    <main className="w-full max-w-[1200px] p-4 md:p-10 flex flex-col gap-[100px]">
      <section className={SECTION_STYLE}>
        <SectionHeader>
          <SectionHeader.Title>인기순</SectionHeader.Title>
          <SectionHeader.LinkButton
            pathname="/event"
            query={{
              orderBy: "likes",
            }}>{`인기순 전체보기 >`}</SectionHeader.LinkButton>
        </SectionHeader>
        <HotEventList list={hotEvents} />
      </section>

      <section className={SECTION_STYLE}>
        <SectionHeader>
          <SectionHeader.Title>조회순</SectionHeader.Title>
          <SectionHeader.LinkButton
            pathname="/event"
            query={{
              orderBy: "views",
            }}>{`조회순 전체보기 >`}</SectionHeader.LinkButton>
        </SectionHeader>
        <EventCarousel events={viewEvents} />
      </section>

      <section className={SECTION_STYLE}>
        <SectionHeader>
          <SectionHeader.Title>최신순</SectionHeader.Title>
          <SectionHeader.LinkButton
            pathname="/event"
            query={{
              orderBy: "latest",
            }}>{`최신순 전체보기 >`}</SectionHeader.LinkButton>
        </SectionHeader>
        <EventCarousel events={recentEvents} />
      </section>
    </main>
  );
};

export default Home;
