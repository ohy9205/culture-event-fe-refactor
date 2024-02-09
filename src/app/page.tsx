import HotEventList from "../components/event/HotEventList";
import RecentEventList from "../components/event/RecentEventList";
import ViewEventList from "../components/event/ViewEventList";

export default function Home() {
  return (
    <main className="w-full max-w-[1200px] p-4 md:p-10 flex flex-col gap-[100px]">
      <HotEventList />
      <ViewEventList />
      <RecentEventList />
    </main>
  );
}
