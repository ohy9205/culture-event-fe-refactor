"use client";

import useMyComment from "@/src/hooks/useMyComment";
import Image from "next/image";
import ModalToggleCard from "../UI/container/ModalToggleCard";
import Comment from "../event/Comment";
import EventDetail from "../event/EventDetail";

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
            <ModalToggleCard
              modalContent={<EventDetail id={eventId} />}
              key={id}
              onClose={async () => await get()}
            >
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
            </ModalToggleCard>
          )
        )}
    </div>
  );
};

export default MyComments;
