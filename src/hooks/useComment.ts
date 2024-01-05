import { ChangeEvent, FormEvent, useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { responseHandler } from "../apis/common/responseHandler";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";

const useComment = (eventId: number, initComments: Comment[]) => {
  const [commentInput, setCommentInput] = useState("");
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });
  const [comments, setComments] = useState(initComments);

  // comments 데이터 패칭
  // const fetchComment = async () => {
  //   const rs = await getComments(eventId);

  //   if (rs) {
  //     const handler = {
  //       success: () => {
  //         setComments(rs.payload.comments);
  //         setCommentInput("");
  //       },
  //     };
  //     responseHandler(rs, handler);
  //   }
  // };

  return {
    data: { comments, commentInput, isModify },
    changeInput: (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCommentInput(e.target.value);
    },
    editMode: {
      on: (commentId: number, content: string) => {
        setIsModify({ status: true, commentId });
        setCommentInput(content || "");
      },
      off: () => {
        setIsModify({ status: false, commentId: -1 });
        setCommentInput("");
      },
    },
    get: async () => {
      const rs = await getComments(eventId);

      if (rs) {
        const handler = {
          success: () => {
            setComments(rs.payload.comments);
            setCommentInput("");
          },
        };
        responseHandler(rs, handler);
      }
    },
    submit: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (commentInput.length === 0 || commentInput === "") {
        return;
      }
      const rs = await addComment(commentInput, eventId);
      if (rs) {
        responseHandler(rs, {});
      }
    },
    remove: async (commentId: number) => {
      const rs = await deleteComment(commentId);
      if (rs) {
        responseHandler(rs, {});
      }
    },
    modify: async (e: FormEvent<HTMLFormElement>, commentId: number) => {
      e.preventDefault();
      const rs = await patchComment(commentInput, commentId);

      if (rs) {
        const handler = {
          success: () => {
            setIsModify({ status: false, commentId: -1 });
            setCommentInput("");
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useComment;
