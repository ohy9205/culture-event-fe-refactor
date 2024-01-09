import useSWR from "swr";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyLikes } from "../apis/user/user";
import { useAuthContext } from "../context/AuthContext";

const useMyLikes = () => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const { data, mutate } = useSWR(
    isLoggedIn ? "/likesEvent" : false,
    getMyLikes
  );

  if (data) {
    responseHandler(data, {});
  }

  return {
    data: {
      events: data?.payload?.data,
    },
    // 로그인 하지 않았을 땐 요청이 가지 않도록 처리
    get: () => {
      if (!isLoggedIn) {
        return;
      }
      mutate();
    },
  };
};

export default useMyLikes;
