"use client";

import { EventDetail } from "@/src/entities/eventDetail";
import { useModal } from "@/src/entities/modal";
import { MyComment } from "@/src/entities/user/";
import { Comment } from "@/src/shared/components";
import Image from "next/image";

type Props = {
  comments: MyComment[];
};

const MyComments = ({ comments }: Props) => {
  const { open } = useModal();

  return (
    <div className="flex flex-col gap-5 w-full">
      {comments.length === 0 && <p>작성한 댓글이 없습니다.</p>}
      {comments.length > 0 &&
        comments.map(
          ({ eventId, createdAt, updatedAt, Event, content, id }) => (
            <div
              className="shadow-md"
              key={id}
              onClick={() => {
                open(<EventDetail id={eventId} />);
              }}>
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
            </div>
          )
        )}
    </div>
  );
};

export default MyComments;
