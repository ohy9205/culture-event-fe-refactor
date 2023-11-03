import HotEventList from "../components/HotEventList";
import RecentEventList from "../components/RecentEventList";

export default function Home() {
  return (
    <main className="w-[1200px]">
      <HotEventList />
      <RecentEventList />
    </main>
  );
}
