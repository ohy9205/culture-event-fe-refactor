import {
  HotEventList,
  RecentEventList,
  ViewEventList,
} from "@/src/entities/eventList";

const Home = () => {
  return (
    <main className="w-full max-w-[1200px] p-4 md:p-10 flex flex-col gap-[100px]">
      <h1>메인페이지</h1>
      <HotEventList />
      <ViewEventList />
      <RecentEventList />
    </main>
  );
};

export default Home;
