import useSWR from "swr";
import { responseHandler } from "../apis/common/responseHandler";
import { getMyLikes } from "../apis/user/user";

const useMyLikes = () => {
  const { data, mutate } = useSWR(`likesEvent`, getMyLikes);

  if (data) {
    responseHandler(data, {});
  }

  return {
    get: () => ({
      events: data?.payload?.data,
    }),
    mutate,
  };
};

export default useMyLikes;
