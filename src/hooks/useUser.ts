import useSWR from "swr";
import { getUserMe } from "../apis/user/user";

const useUser = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    "userInfo",
    getUserMe
  );

  const loggedOut = data ? false : true;

  return {
    isLoading,
    isValidating,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useUser;
