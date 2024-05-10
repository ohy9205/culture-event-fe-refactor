import { useState } from "react";
import {
  addComment,
  deleteComment,
  patchComment,
} from "../../apis/comment/comment";
import { getComments } from "../../apis/event/v2";
import responseHandler from "../../utils/common/responseHandler";
import { Comment } from "../types/events";

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
      const sortedComments = rs.payload.comments.sort(
        (a: Comment, b: Comment) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      if (rs) {
        const handler = {
          success: () => {
            setComments(sortedComments);
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
      if (confirm("정말 댓글을 삭제 하시겠습니까?")) {
        const rs = await deleteComment(commentId);
        if (rs) {
          responseHandler(rs, {});
        }
      } else {
        return;
      }
    },
    modify: async (commentId: number, content: string) => {
      if (confirm("댓글을 수정 하시겠습니까?")) {
        const rs = await patchComment(content, commentId);

        if (rs) {
          const handler = {
            success: () => {
              setIsModify({ status: false, commentId: -1 });
            },
          };
          responseHandler(rs, handler);
        }
      } else {
        return;
      }
    },
  };
};

export default useComment;
