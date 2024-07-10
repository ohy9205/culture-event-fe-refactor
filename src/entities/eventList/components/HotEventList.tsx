"use client";

import { GridContainer } from "@/src/shared/components";
import Image from "next/image";
import { EventDetail } from "../../eventDetail";
import { useModal } from "../../modal";
import { EventThumbnail } from "../types";

type Props = {
  list: EventThumbnail[];
};

const HotEventList = ({ list }: Props) => {
  const { open } = useModal();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-2/5 h-[550px] relative">
        <Image
          src={list[0]?.thumbnail || ""}
          alt={list[0]?.title || "포스터"}
          style={{ objectFit: "cover" }}
          sizes="500px"
          fill
          priority
          onClick={() => {
            open(<EventDetail id={list[0].id} />);
          }}
        />
      </div>

      <div className="flex-grow">
        <GridContainer isReponsive={false}>
          {list?.slice(1).map((event: EventThumbnail) => (
            <div key={event.id} className="relative h-[267px]">
              <Image
                src={event.thumbnail}
                alt={event.title}
                style={{ objectFit: "cover" }}
                sizes="200px"
                fill
                onClick={() => open(<EventDetail id={event.id} />)}
              />
            </div>
          ))}
        </GridContainer>
      </div>
    </div>
  );
};

export default HotEventList;
