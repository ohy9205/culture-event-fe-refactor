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
      // 수정모드면 '현재댓글내용'이 textarea기본값으로 들어감
      setCommentInput(content || "");
    } else {
      // 일반모드면 textarea의 내용이 초기화됨
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
        {/* 댓글 목록 */}
        {comments?.map(
          ({ id, content, createdAt, User: commenterUser, isMyComment }) => (
            <li key={id} className="bg-slate-50 rounded-lg p-2">
              {/* 일반모드 */}
              {!isModify.status && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="font-bold">{commenterUser.nick}</div>
                    <div className="text-sm">{getFormattedTime(createdAt)}</div>
                    {/* 내가 쓴 댓글 */}
                    {isMyComment && (
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

              {/* 수정모드 */}
              {isModify.status && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="font-bold">{commenterUser.nick}</div>
                    <div className="text-sm">{getFormattedTime(createdAt)}</div>
                  </div>
                  {/* 수정 안하는 댓글 */}
                  {isModify.commentId !== id && <div>{content}</div>}
                  {/* 수정중인 댓글 */}
                  {isModify.commentId === id && (
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
                </div>
              )}
            </li>
          )
        )}

        {/* 댓글 입력 폼 */}
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default Comment;
