import Image from "next/image";
import MultiCarousel from "./MultiCarousel";
import Button from "./Button";
import Link from "next/link";
import { getRecentEvents } from "../utils/events";

const RecentEventList = async () => {
  const recentEvents = await getRecentEvents();

  return (
    <section>
      <h1>타이틀</h1>
      <MultiCarousel>
        {recentEvents?.map(({ id, title, thumbnail }) => (
          <Image
            key={id}
            src={thumbnail}
            alt={title}
            width={100}
            height={100}
          />
        ))}
      </MultiCarousel>
      <Button>
        <Link href={"/events"}>최신순으로 전체보기</Link>
      </Button>
    </section>
  );
};

export default RecentEventList;
