import { useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyComments } from "../apis/user/user";
import { MyComment } from "../types/user";

const useMyComment = () => {
  const [comments, setComments] = useState<MyComment[]>([]);

  return {
    data: {
      comments,
    },
    get: async () => {
      const data = await getMyComments();
      if (data) {
        responseHandler(data, {
          success: () => setComments(data.payload.commentsWithEvents),
        });
      }
    },
  };
};

export default useMyComment;
