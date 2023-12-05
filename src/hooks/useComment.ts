import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";
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

  // response 핸들러
  const responseHandler = (status: number, message: string) => {
    if (status === 200 || status === 201) {
      setCommentInput("");
    } else if (status === 403) {
      alert(message);
    } else if (status === 404) {
      router.push("/error/404");
    } else {
      router.push(`/error/${status}`);
    }
  };

  // comments 데이터 패칭
  const fetchComment = async () => {
    const rs = await getComments(eventId);

    if (rs) {
      responseHandler(rs.status, rs.message);
      if (rs.status === 200) {
        setComments(rs.payload.comments);
      }
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
    responseHandler(rs.status, rs.message);
    fetchComment();
  };

  const onRemoveHandler = async (commentId: number) => {
    const rs = await deleteComment(commentId);
    responseHandler(rs.status, rs.message);
    fetchComment();
  };

  const onModifyHandler = async (
    e: FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    const rs = await patchComment(commentInput, commentId);
    responseHandler(rs.status, rs.message);
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
