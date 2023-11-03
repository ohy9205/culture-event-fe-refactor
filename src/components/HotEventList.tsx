import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { getHotEvents } from "../utils/events";

const HotEventList = async () => {
  const hotEvents = await getHotEvents();
  const HottestEvent = hotEvents && hotEvents[0];
  const otherEvents = hotEvents?.splice(1);

  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-3xl">인기순</h1>
      <div className="flex gap-4">
        <Image
          src={HottestEvent?.thumbnail || ""}
          alt={HottestEvent?.title || "포스터"}
          width={500}
          height={550}
          className="object-cover w-[388px] h-[550px]"
        />
        <div className="grid grid-cols-3 gap-4 flex-grow">
          {otherEvents?.map((event) => (
            <Image
              key={event.id}
              src={event.thumbnail}
              alt={event.title}
              width={550}
              height={550}
              className="object-cover h-[267px]"
            />
          ))}
        </div>
      </div>

      <Link href={"/events?"} className="m-auto">
        <Button>{`인기순으로 전체보기 >`}</Button>
      </Link>
    </section>
  );
};

export default HotEventList;
