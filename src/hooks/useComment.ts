import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";
import { responseHandler } from "./../apis/common/commonAPIFetch";
import useUser from "./useUser";

const useComment = (eventId: number, initComments: Comment[]) => {
  const { loggedOut } = useUser();
  const [commentInput, setCommentInput] = useState(``);
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });
  const [comments, setComments] = useState(initComments);
  const router = useRouter();

  // comments 데이터 패칭
  const fetchComment = async () => {
    const rs = await getComments(eventId);

    if (rs) {
      const handler = {
        success: () => setComments(rs?.payload?.comments),
      };
      responseHandler(rs, handler);
    }
  };

  const onIsModifyHandler = (
    status: boolean,
    commentId: number,
    content?: string
  ) => {
    setIsModify({ status, commentId });
    if (status) {
      setCommentInput(content || ``);
    } else {
      setCommentInput("");
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentInput.length === 0 || commentInput === "") {
      return;
    }
    const rs = await addComment(commentInput, eventId);
    if (rs) {
      const handler = {
        success: () => fetchComment(),
      };
      responseHandler(rs, handler);
    }
  };

  const onRemoveHandler = async (commentId: number) => {
    const rs = await deleteComment(commentId);
    if (rs) {
      const handler = {
        success: () => fetchComment(),
      };
      responseHandler(rs, handler);
    }
  };

  const onModifyHandler = async (
    e: FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    const rs = await patchComment(commentInput, commentId);

    if (rs) {
      const handler = {
        success: () => {
          setIsModify({ status: false, commentId: -1 });
          setCommentInput("");
          fetchComment();
        },
      };
      responseHandler(rs, handler);
    }
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
