import { useEffect } from "react";
import useSWR from "swr";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyLikes } from "../apis/user/user";
import { useAuthContext } from "../context/AuthContext";

const useMyLikes = () => {
  const { data, mutate } = useSWR(`likesEvent`, getMyLikes);
  const {
    state: { isLoggedIn },
  } = useAuthContext();

  if (data) {
    responseHandler(data, {});
  }

  useEffect(() => {
    if (isLoggedIn === undefined || !isLoggedIn) {
      return;
    }
  }, [isLoggedIn]);

  return {
    data: {
      events: data?.payload?.data,
    },
    get: mutate,
  };
};

export default useMyLikes;
