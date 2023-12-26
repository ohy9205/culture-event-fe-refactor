import useSWR from "swr";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getUserMe } from "../apis/user/user";

const useUser = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    "userInfo",
    getUserMe
  );

  if (data) {
    responseHandler(data, {});
  }

  return {
    isLoading,
    isValidating,
    loggedOut: data?.status === 200 ? false : true,
    user: data?.payload.user,
    mutate,
  };
};

export default useUser;
