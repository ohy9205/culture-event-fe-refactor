"use client";

import { FormEvent, useState } from "react";
import useComment from "../hooks/useComment";
import { getFormattedTime } from "../utils/date";
import { addComment, deleteComment, patchComment } from "../utils/events";
import Button from "./Button";

type Props = {
  eventId: number;
};

const Comment = ({ eventId }: Props) => {
  const { eventComments: comments, mutate } = useComment(eventId);
  const [commentInput, setCommentInput] = useState("");
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });

  const onIsModifyHandler = (
    status: boolean,
    commentId: number,
    content?: string
  ) => {
    setIsModify({ status, commentId });
    if (status) {
      setCommentInput(content || "");
    } else {
      setCommentInput("");
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentInput.length === 0 || commentInput === "") {
      return;
    }
    const result = await addComment(commentInput, eventId);
    if (result.code === 200) {
      setCommentInput("");
      mutate();
    }
  };

  const onRemoveHandler = async (commentId: number) => {
    const result = await deleteComment(commentId);
    if (result.code === 200) {
      mutate();
    }
  };

  const onModifyHandler = async (
    e: FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    const result = await patchComment(commentInput, commentId);
    if (result.code === 200) {
      mutate();
      setIsModify({ status: false, commentId: -1 });
      setCommentInput("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-extrabold text-lg border-b-2">Comment</h1>
      <ul className="flex flex-col gap-3">
        {comments?.map(
          ({ id, content, createdAt, User: commenterUser, isMyComment }) => (
            <li key={id} className="bg-slate-50 rounded-lg p-2">
              {/* 수정모드 */}
              {isModify.status && isModify.commentId === id && (
                <form onSubmit={(e) => onModifyHandler(e, id)}>
                  <textarea
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                    }}
                    value={commentInput}
                    className="w-full h-[100px] border resize-none"
                  />
                  <div>
                    <Button
                      size="sm"
                      color="light"
                      onClick={() => onIsModifyHandler(false, -1)}
                    >
                      나가기
                    </Button>
                    <Button size="sm">수정</Button>
                  </div>
                </form>
              )}

              {/* 수정모드 & 수정안하는 코멘트 */}
              {isModify.commentId !== id && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="font-bold">{commenterUser.nick}</div>
                    <div className="text-sm">{getFormattedTime(createdAt)}</div>
                    {/* 수정모드X */}
                    {!isModify.status && isMyComment && (
                      <div className="flex grow gap-2 md:justify-end">
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => onIsModifyHandler(true, id, content)}
                        >
                          수정
                        </Button>
                        <Button size="sm" onClick={() => onRemoveHandler(id)}>
                          삭제
                        </Button>
                      </div>
                    )}
                  </div>
                  <div>{content}</div>
                </div>
              )}
            </li>
          )
        )}
      </ul>

      {!isModify.status && (
        <form onSubmit={onSubmitHandler}>
          <textarea
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            value={commentInput}
            className="w-full h-[100px] border resize-none"
          ></textarea>
          <Button size="sm">댓글</Button>
        </form>
      )}
    </div>
  );
};

export default Comment;
