import { useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../apis/comment/comment";
import { getComments } from "../apis/event/v2";
import { Comment } from "../types/events";
import { responseHandler } from "../utils/common/responseHandler";

const useComment = (eventId: number, initComments?: Comment[]) => {
  const [comments, setComments] = useState<Comment[] | undefined>(initComments);
  const [isModifyMode, setIsModify] = useState({
    status: false,
    commentId: -1,
  });

  return {
    data: { comments, isModifyMode },
    editMode: {
      on: (commentId: number, content: string) => {
        setIsModify({ status: true, commentId });
      },
      off: () => {
        setIsModify({ status: false, commentId: -1 });
      },
    },
    get: async () => {
      const rs = await getComments(eventId);

      if (rs) {
        const handler = {
          success: () => {
            setComments(rs.payload.comments);
          },
        };
        responseHandler(rs, handler);
      }
    },
    add: async (content: string) => {
      if (content.trim().length === 0 || content.trim() === "") {
        return;
      }
      const rs = await addComment(content, eventId);
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
    modify: async (commentId: number, content: string) => {
      const rs = await patchComment(content, commentId);

      if (rs) {
        const handler = {
          success: () => {
            setIsModify({ status: false, commentId: -1 });
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useComment;
