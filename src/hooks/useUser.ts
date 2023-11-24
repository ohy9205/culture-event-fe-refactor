import useSWR from "swr";
import { getUserMe } from "../apis/user/user";

const useUser = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    "userInfo",
    getUserMe
  );

  const loggedOut = data && data.code !== 200;

  return {
    isLoading,
    isValidating,
    loggedOut,
    user: data && data.payload,
    mutate,
  };
};

export default useUser;
