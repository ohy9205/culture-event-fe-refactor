import { FormEvent, useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";

const useComment = (eventId: number, initComments: Comment[]) => {
  const [commentInput, setCommentInput] = useState(``);
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });
  const [comments, setComments] = useState(initComments);

  // comments 데이터 패칭
  const fetchComment = async () => {
    const rs = await getComments(eventId);
    if (rs) {
      setComments(rs);
    }
  };

  const onIsModifyHandler = (
    status: boolean,
    commentId: number,
    content?: string
  ) => {
    setIsModify({ status, commentId });
    if (status) {
      // 수정모드면 '현재댓글내용'이 textarea기본값으로 들어감
      setCommentInput(content || ``);
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
    const rs = await addComment(commentInput, eventId);
    if (rs.commentId) {
      setCommentInput("");
    }
    setCommentInput("");

    fetchComment();
  };

  const onRemoveHandler = async (commentId: number) => {
    const result = await deleteComment(commentId);

    fetchComment();
  };

  const onModifyHandler = async (
    e: FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    const result = await patchComment(commentInput, commentId);
    setIsModify({ status: false, commentId: -1 });
    setCommentInput("");

    fetchComment();
  };

  return {
    comments,
    commentInput,
    setCommentInput,
    isModify,
    onIsModifyHandler,
    onSubmitHandler,
    onRemoveHandler,
    onModifyHandler,
  };
};

export default useComment;
