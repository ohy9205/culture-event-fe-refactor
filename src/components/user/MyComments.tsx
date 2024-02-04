"use client";

import useMyComment from "@/src/hooks/useMyComment";
import Image from "next/image";
import Comment from "../event/Comment";
import EventDetailModal from "../event/EventDetailModal";

const MyComments = () => {
  const {
    data: { comments },
    get,
  } = useMyComment();

  return (
    <div className="flex flex-col gap-3 w-full">
      {comments &&
        comments.map(
          ({ eventId, createdAt, updatedAt, Event, content, id }) => (
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
                    <div className="flex flex-col gap-2 truncate">
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
          )
        )}
    </div>
  );
};

export default MyComments;
