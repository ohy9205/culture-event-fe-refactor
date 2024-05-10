import HotEventList from "@/src/components/event/HotEventList";
import RecentEventList from "@/src/components/event/RecentEventList";
import ViewEventList from "@/src/components/event/ViewEventList";

const Home = () => {
  return (
    <main className="w-full max-w-[1200px] p-4 md:p-10 flex flex-col gap-[100px]">
      <HotEventList />
      <ViewEventList />
      <RecentEventList />
    </main>
  );
};

export default Home;
