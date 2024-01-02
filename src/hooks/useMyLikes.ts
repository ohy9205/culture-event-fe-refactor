import useSWR from "swr";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getMyLikes } from "../apis/user/user";

export const useMyLikes = () => {
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
