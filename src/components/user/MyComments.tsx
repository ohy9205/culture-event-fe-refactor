"use client";

import { MyComment } from "@/src/types/user";
import Image from "next/image";
import Comment from "../event/Comment";
import EventDetailModal from "../event/EventDetailModal";

type Props = {
  comments: MyComment[];
};

const MyComments = ({ comments }: Props) => {
  console.log(comments);
  return (
    <div className="flex flex-col gap-5 w-full">
      {comments &&
        comments.map(
          ({ eventId, createdAt, updatedAt, Event, content, id }) => (
            <div className="shadow-md" key={id}>
              <EventDetailModal
                key={id}
                eventId={eventId}
                trigger={
                  <Comment key={id}>
                    <li className="flex gap-3 h-36 w-full">
                      <div className="w-1/5 relative">
                        <Image
                          src={Event.thumbnail}
                          alt={`${Event.title} 포스터`}
                          style={{ objectFit: "cover" }}
                          fill
                          sizes="300px"
                        />
                      </div>
                      <div className="grow flex flex-col gap-2 truncate">
                        <h1 className="text-lg font-semibold">{Event.title}</h1>
                        <Comment.Period
                          createdAt={createdAt}
                          updatedAt={updatedAt}
                        />
                        <Comment.Content truncate>{content}</Comment.Content>
                      </div>
                    </li>
                  </Comment>
                }
              />
            </div>
          )
        )}
    </div>
  );
};

export default MyComments;
