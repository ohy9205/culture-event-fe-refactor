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
  const fetchComment = async () => {
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
  };

  return {
    changeInput: (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCommentInput(e.target.value);
    },
    submit: async (e: FormEvent<HTMLFormElement>) => {
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
    },
    remove: async (commentId: number) => {
      const rs = await deleteComment(commentId);
      if (rs) {
        const handler = {
          success: () => fetchComment(),
        };
        responseHandler(rs, handler);
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
            fetchComment();
          },
        };
        responseHandler(rs, handler);
      }
    },
    changeModifyMode: () => {
      return {
        on: (commentId: number, content: string) => {
          setIsModify({ status: true, commentId });
          setCommentInput(content || "");
        },
        off: () => {
          setIsModify({ status: false, commentId: -1 });
          setCommentInput("");
        },
      };
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
    data: { comments, commentInput, isModify },
  };
};

export default useComment;
