import { FormEvent, useState } from "react";
import { KeyedMutator } from "swr";
import { addComment, deleteComment, patchComment } from "../apis/comment";
import { DetailEvent } from "../types/events";

const useComment = (
  eventId: number,
  mutate: KeyedMutator<DetailEvent | undefined>
) => {
  const [commentInput, setCommentInput] = useState(``);
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

  return {
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
