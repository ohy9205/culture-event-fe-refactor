import HotEventList from "../components/HotEventList";
import RecentEventList from "../components/RecentEventList";
import ViewEventList from "../components/ViewEventList";

export default function Home() {
  return (
    <main className="w-full max-w-[1200px]">
      <HotEventList />
      <ViewEventList />
      <RecentEventList />
    </main>
  );
}
