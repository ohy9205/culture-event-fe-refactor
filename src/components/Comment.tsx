"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  const [isModify, setIsModify] = useState(false);
  const {
    user: { email },
  } = useUser();

  const onIsModifyHandler = (status: boolean) => {
    setIsModify(status);
    setCommentInput("");
  };

  const fetchingData = async () => {
    const data = await getComments(eventId);
    if (data) {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

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

  const onModifyHandler = async (commentId: number) => {
    // 코멘트 업뎃
    const result = await patchComment(commentInput, commentId);
    if (result.code === 200) {
      fetchingData();
    }
  };

  return (
    <div>
      <ul>
        {comments?.map(({ id, content, createdAt, User: commenterUser }) => (
          <li key={id}>
            <div className="flex justify-between">
              {isModify && (
                <form onSubmit={onSubmitHandler}>
                  <textarea
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                    }}
                    value={commentInput || content}
                    className="w-full h-[100px] border resize-none"
                  />
                  <div>
                    <Button
                      size="sm"
                      color="light"
                      onClick={() => onIsModifyHandler(false)}
                    >
                      나가기
                    </Button>
                    <Button size="sm" onClick={() => onModifyHandler(id)}>
                      수정
                    </Button>
                  </div>
                </form>
              )}
              {!isModify && <div>{content}</div>}
              <div>{commenterUser.nick}</div>
            </div>
            <div>{getFormattedTime(createdAt)}</div>
            {commenterUser.email === email && (
              <div>
                <Button
                  size="sm"
                  color="light"
                  onClick={() => onIsModifyHandler(true)}
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

      {!isModify && (
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
