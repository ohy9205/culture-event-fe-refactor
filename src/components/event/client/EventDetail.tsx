"use client";

import Image from "next/image";
import Link from "next/link";
import useEventDetail from "../../../hooks/useEventDetail";
import Button from "../../UI/common/Button";
import Comment from "./Comment";
import Likes from "./Likes";
import StaticMap from "./StaticMap";

type Props = {
  id: number;
};

const LIST_STYLE = "w-full flex flex-col md:flex-row md:gap-4";
const LABEL_STYLE = "min-w-[64px] p-4 bg-slate-200 font-bold";
const INFO_STYLE = "flex items-center";

const EventDetail = ({ id }: Props) => {
  const { eventDetail, isLoading } = useEventDetail(id);

  if (eventDetail) {
    const {
      thumbnail,
      title,
      category,
      place,
      eventPeriod,
      fee,
      homePage,
      latitude,
      isFree,
      targetAudience,
      longitude,
      Users: likesUsers,
      views,
      Comments,
    } = eventDetail;

    return (
      <div className="flex flex-col gap-10 p-10">
        <section className="flex flex-col md:flex-row gap-5">
          <Image
            src={thumbnail || ""}
            alt={title || ""}
            width={700}
            height={700}
            className="w-full md:w-2/5 overflow-hidden object-contain rounded-xl"
          />
          <div className="w-full md:w-3/5 p-2 flex flex-col gap-6">
            <h2 className="mb-6 text-xl font-semibold">{title || ""}</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-2">
                <Likes
                  eventId={id}
                  useBackground
                  likesCount={likesUsers.length}
                />

                <div className="flex gap-1 items-center ml-10">
                  <span>조회수</span>
                  <span className="font-semibold">{views}</span>
                </div>
              </li>
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
                <p className={INFO_STYLE}> {targetAudience}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>요금</span>
                <p className={INFO_STYLE}>
                  {fee || (isFree === true ? "무료" : "유료")}
                </p>
              </li>
            </ul>
            <Link href={homePage || "/"} target="_blank" className="w-fit">
              <Button size="lg" color="dark">{`상세정보 보러가기 >`}</Button>
            </Link>
          </div>
        </section>
        <section className="px-5">
          <StaticMap
            longitude={latitude}
            latitude={longitude}
            heightStyle="h-[450px]"
          />
        </section>
        <section>
          <Comment eventId={id} initComments={Comments} />
        </section>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    <div className="flex justify-center items-center">
      내용을 불러올 수 없습니다.
    </div>;
  }
};

export default EventDetail;
