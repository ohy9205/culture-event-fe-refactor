"use client";

import { MyComment } from "@/src/types/user";
import Image from "next/image";
import Comment from "../event/Comment";
import EventDetailModal from "../event/EventDetailModal";

type Props = {
  comments: MyComment[];
};

const MyComments = ({ comments }: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {comments &&
        sortByCreatedAt(comments).map(
          ({ eventId, createdAt, updatedAt, Event, content, id }) => (
            <div className="shadow-md" key={id}>
              <EventDetailModal
                key={id}
                eventId={eventId}
                trigger={
                  <Comment key={id}>
                    <div className="flex gap-3 h-36 w-full">
                      <Image
                        src={Event.thumbnail}
                        alt="image"
                        width={150}
                        height={150}
                        className="object-cover"
                      />
                      <div className="w-full flex flex-col gap-2 truncate">
                        <h1 className="text-lg font-semibold">{Event.title}</h1>
                        <Comment.Period
                          createdAt={createdAt}
                          updatedAt={updatedAt}
                        />
                        <Comment.Content truncate>{content}</Comment.Content>
                      </div>
                    </div>
                  </Comment>
                }
              />
            </div>
          )
        )}
    </div>
  );
};

const sortByCreatedAt = (comments: MyComment[]) => {
  return comments.sort((a, b) => {
    // updatedAt이 있으면 해당 값을, 없으면 createdAt 값을 사용
    const dateA = new Date(a.updatedAt || a.createdAt);
    const dateB = new Date(b.updatedAt || b.createdAt);

    return dateB.getTime() - dateA.getTime(); // 날짜가 빠른 순으로 정렬
  });
};

export default MyComments;
