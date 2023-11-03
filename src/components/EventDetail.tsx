import Image from "next/image";
import { Event } from "../types/events";
import Button from "./Button";
import Link from "next/link";

type Props = {
  event: Event;
};

const LIST_STYLE = "w-full flex";
const LABEL_STYLE = "min-w-[64px] p-4 bg-slate-200 mr-4";
const INFO_STYLE = "flex justify-center items-center";

const EventDetail = ({ event }: Props) => {
  const {
    thumbnail,
    category,
    eventPeriod,
    title,
    place,
    targetAudiend,
    fee,
    homePage,
  } = event;
  return (
    <div className="p-10">
      <section className="flex gap-5">
        <Image
          src={thumbnail}
          alt={title}
          width={700}
          height={700}
          className="object-cover w-2/5 rounded-lg"
        />
        <div className="w-full p-2 flex flex-col gap-6">
          <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
          <ul className="flex flex-col gap-4">
            <li className={LIST_STYLE}>
              <span className={LABEL_STYLE}>장르</span>
              <p className={INFO_STYLE}>{category}</p>
            </li>
            <li className={LIST_STYLE}>
              <span className={LABEL_STYLE}>장소</span>
              <p className={INFO_STYLE}>{place}</p>
            </li>
            <li className={LIST_STYLE}>
              <span className={LABEL_STYLE}>기간</span>
              <p className={INFO_STYLE}> {eventPeriod}</p>
            </li>
            <li className={LIST_STYLE}>
              <span className={LABEL_STYLE}>대상</span>
              <p className={INFO_STYLE}> {targetAudiend}</p>
            </li>
            <li className={LIST_STYLE}>
              <span className={LABEL_STYLE}>요금</span>
              <p className={INFO_STYLE}> {fee}</p>
            </li>
          </ul>
          <Link href={homePage}>
            <Button>{`상세정보 보러가기 >`}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
