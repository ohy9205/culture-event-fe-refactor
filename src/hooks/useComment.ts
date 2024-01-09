import { FormEvent, useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { responseHandler } from "../apis/common/responseHandler";
import { getComments } from "../apis/event/v2";
import { useAuthContext } from "../context/AuthContext";
import { Comment } from "../types/events";
import useForm from "./useForm";

const useComment = (eventId: number, initComments: Comment[]) => {
  const {
    data: { form, valid },
    changeForm,
    reset,
  } = useForm({ comment: "" });
  const [isModify, setIsModify] = useState({
    status: false,
    commentId: -1,
  });
  const [comments, setComments] = useState(initComments);
  const {
    state: { isLoggedIn },
  } = useAuthContext();

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
    submit: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 객체를 순회하면서 데이터를 validate 하는 로직
      // if (form.trim().length === 0 || form.trim().comment === "") {
      //   return;
      // }
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
    modify: async (e: FormEvent<HTMLFormElement>, commentId: number) => {
      e.preventDefault();
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
