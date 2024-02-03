import { useEffect, useState } from "react";
import { getMyComments } from "../apis/user/user";
import { MyComment } from "../types/user";
import { responseHandler } from "../utils/common/responseHandler";

const useMyComment = () => {
  const [comments, setComments] = useState<MyComment[]>([]);

  const get = async () => {
    const data = await getMyComments();
    if (data) {
      responseHandler(data, {
        success: () => {
          const sortedData = sortByCreatedAt(data.payload.commentsWithEvents);
          setComments(sortedData);
        },
      });
    }
  };

  useEffect(() => {
    const fetching = async () => {
      await get();
    };
    fetching();
  }, []);

  return {
    data: {
      comments,
    },
    get,
  };
};

const sortByCreatedAt = (comments: MyComment[]) => {
  return comments.sort((a, b) => {
    // updatedAt이 있으면 해당 값을, 없으면 createdAt 값을 사용
    const dateA = new Date(a.updatedAt || a.createdAt);
    const dateB = new Date(b.updatedAt || b.createdAt);

    return dateB.getTime() - dateA.getTime(); // 날짜가 빠른 순으로 정렬
  });
};

export default useMyComment;
