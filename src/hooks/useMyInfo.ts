import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getMyComments } from "../apis/user/user";
import { useAuthContext } from "../context/AuthContext";
import { MyComment } from "../types/user";
import { removeAccessToken } from "../utils/accessToken";
import useMyLikes from "./useMyLikes";

const useMyInfo = () => {
  // useMyLikes 사용 가능
  const { get, mutate } = useMyLikes();
  const [myComments, setMyComments] = useState<MyComment[]>([]);
  const router = useRouter();
  // auth context 로그아웃 가능
  const { resetAuth } = useAuthContext();

  useEffect(() => {
    const commentsFetch = async () => {
      const data = await getMyComments();
      if (data) {
        responseHandler(data, {
          success: () => setMyComments(data.payload.commentsWithEvents),
        });
      }
    };
    commentsFetch();
  }, []);

  return {
    get: () => ({
      likeEvents: get().events,
      comments: myComments,
    }),
    logout: () => {
      removeAccessToken();
      resetAuth();
    },
  };
};

export default useMyInfo;
