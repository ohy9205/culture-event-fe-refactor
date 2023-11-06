import Image from "next/image";
import { DetailEvent } from "../types/events";
import Button from "./Button";
import Link from "next/link";
import { getEventDetail } from "../utils/events";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const LIST_STYLE = "w-full flex";
const LABEL_STYLE = "min-w-[64px] p-4 bg-slate-200 mr-4";
const INFO_STYLE = "flex justify-center items-center";

const EventDetail = ({ id }: Props) => {
  const [eventDetail, setEventDetail] = useState<DetailEvent>();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventInfo = await getEventDetail(id);
      setEventDetail(eventInfo);
    };

    fetchEvent();
  }, [id]);

  if (eventDetail) {
    return (
      <div className="p-10">
        <section className="flex gap-5">
          <Image
            src={eventDetail?.thumbnail || ""}
            alt={eventDetail?.title || ""}
            width={700}
            height={700}
            className="object-cover w-2/5 rounded-lg"
          />
          <div className="w-full p-2 flex flex-col gap-6">
            <h2 className="mb-6 text-2xl font-semibold">
              {eventDetail?.title || ""}
            </h2>
            <ul className="flex flex-col gap-4">
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>장르</span>
                <p className={INFO_STYLE}>{eventDetail?.category}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>장소</span>
                <p className={INFO_STYLE}>{eventDetail?.place}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>기간</span>
                <p className={INFO_STYLE}> {eventDetail?.eventPeriod}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>대상</span>
                <p className={INFO_STYLE}> {eventDetail?.targetAudience}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>요금</span>
                <p className={INFO_STYLE}>
                  {eventDetail?.fee ||
                    (eventDetail?.isFree === true ? "무료" : "유료")}
                </p>
              </li>
            </ul>
            <Link href={eventDetail?.homePage || "/"}>
              <Button>{`상세정보 보러가기 >`}</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default EventDetail;
