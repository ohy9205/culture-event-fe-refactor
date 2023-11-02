import HotEventList from "../components/HotEventList";
import RecentEventList from "../components/RecentEventList";
import { getAllEvents } from "../utils/events";

export default function Home() {
  return (
    <main>
      <HotEventList />
      <RecentEventList />
    </main>
  );
}
