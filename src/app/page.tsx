import HotEventList from "../components/event/server/HotEventList";
import RecentEventList from "../components/event/server/RecentEventList";
import ViewEventList from "../components/event/server/ViewEventList";

export default function Home() {
  return (
    <main className="w-full max-w-[1200px]">
      <HotEventList />
      <ViewEventList />
      <RecentEventList />
    </main>
  );
}
