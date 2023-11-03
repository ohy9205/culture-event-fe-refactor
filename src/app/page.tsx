import HotEventList from "../components/HotEventList";
import RecentEventList from "../components/RecentEventList";

export default function Home() {
  return (
    <main>
      <HotEventList />
      <RecentEventList />
    </main>
  );
}
