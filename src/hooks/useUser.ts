import useSWR from "swr";
import { postSignin } from "../utils/auth";

const useUser = () => {
  const { data, mutate, error } = useSWR("user", (url) =>
    postSignin(url as any)
  );

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useUser;
