import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { getHotEvents } from "../utils/events";

const HotEventList = async () => {
  const hotEvents = await getHotEvents();
  const HottestEvent = hotEvents && hotEvents[0];
  const otherEvents = hotEvents?.splice(1);

  return (
    <section>
      <h1>타이틀1</h1>
      <div className="flex">
        <Image
          src={HottestEvent?.thumbnail || ""}
          alt={HottestEvent?.title || "포스터"}
          width={100}
          height={100}
        />
        <div className="grid grid-cols-3">
          {otherEvents?.map((event) => (
            <Image
              key={event.id}
              src={event.thumbnail}
              alt={event.title}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
      <Button>
        <Link href={"/events?"}>인기순으로 전체보기</Link>
      </Button>
    </section>
  );
};

export default HotEventList;
