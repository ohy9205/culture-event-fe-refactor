import { useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";
import { responseHandler } from "../utils/common/responseHandler";
import useForm from "./useForm";

const useComment = (eventId: number, initComments: Comment[]) => {
  const {
    data: { form },
    changeForm,
    reset,
  } = useForm({ comment: "" });
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });
  const [comments, setComments] = useState(initComments);
  return {
    data: { comments, form, isModify },
    changeForm,
    editMode: {
      on: (commentId: number, content: string) => {
        setIsModify({ status: true, commentId });
        changeForm("comment", content || "");
      },
      off: () => {
        setIsModify({ status: false, commentId: -1 });
        reset();
      },
    },
    get: async () => {
      const rs = await getComments(eventId);

      if (rs) {
        const handler = {
          success: () => {
            setComments(rs.payload.comments);
            reset();
          },
        };
        responseHandler(rs, handler);
      }
    },
    submit: async () => {
      // 객체를 순회하면서 데이터를 validate 하는 로직
      if (
        form.comment.trim().length === 0 ||
        form.comment.trim().comment === ""
      ) {
        return;
      }
      const rs = await addComment(form.comment, eventId);
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
    modify: async (commentId: number) => {
      const rs = await patchComment(form.comment, commentId);

      if (rs) {
        const handler = {
          success: () => {
            setIsModify({ status: false, commentId: -1 });
            reset();
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useComment;
