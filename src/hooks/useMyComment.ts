import { useEffect, useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyComments } from "../apis/user/user";
import { MyComment } from "../types/user";

const useMyComment = () => {
  const [comments, setComments] = useState<MyComment[]>([]);

  // myComments 데이터 패칭
  useEffect(() => {
    const commentsFetch = async () => {
      const data = await getMyComments();
      if (data) {
        responseHandler(data, {
          success: () => setComments(data.payload.commentsWithEvents),
        });
      }
    };
    commentsFetch();
  }, []);

  return {
    // 바로 state를 return하는게 아니라,
    get: () => ({
      comments,
    }),
  };
};

export default useMyComment;
