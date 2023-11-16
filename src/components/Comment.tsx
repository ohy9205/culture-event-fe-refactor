"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { Comment } from "../types/events";
import { getFormattedTime } from "../utils/date";
import Button from "./Button";
import {
  addComment,
  deleteComment,
  getComments,
  patchComment,
} from "../utils/events";
import useUser from "../hooks/useUser";

type Props = {
  eventId: number;
};

const Comment = ({ eventId }: Props) => {
  const [comments, setComments] = useState<Comment[]>();
  const [commentInput, setCommentInput] = useState("");
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });

  const {
    user: { email },
  } = useUser();

  const fetchingData = async () => {
    const data = await getComments(eventId);
    if (data) {
      setComments(data);
    }
  };

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
      fetchingData();
    }
  };

  const onRemoveHandler = async (commentId: number) => {
    const result = await deleteComment(commentId);
    if (result.code === 200) {
      fetchingData();
    }
  };

  const onModifyHandler = async (
    e: FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    const result = await patchComment(commentInput, commentId);
    if (result.code === 200) {
      fetchingData();
      setIsModify({ status: false, commentId: -1 });
      setCommentInput("");
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      <ul>
        {comments?.map(({ id, content, createdAt, User: commenterUser }) => (
          <li key={id}>
            <div className="flex justify-between">
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
                <div className="flex flex-col">
                  <div>{content}</div>
                  <div>{getFormattedTime(createdAt)}</div>
                </div>
              )}

              <div>{commenterUser.nick}</div>
            </div>

            {/* 수정모드X */}
            {!isModify.status && commenterUser.email === email && (
              <div>
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
          </li>
        ))}
      </ul>

      {!isModify.status && (
        <form onSubmit={onSubmitHandler}>
          <textarea
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            value={commentInput}
            className="w-full h-[100px] border resize-none"
          />
          <div>
            <Button size="sm">댓글</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
