import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getUserMe } from "../apis/user/user";

const useUser = () => {
  const router = useRouter();
  const { data, mutate, isLoading, isValidating } = useSWR(
    "userInfo",
    getUserMe
  );

  // response 핸들러
  const responseHandler = (status: number, message: string) => {
    console.log("호출");
    if (!status) {
      return;
    }
    if (status === 403) {
      alert(message);
    } else if (status === 404) {
      router.push("/error/404");
    } else if (status !== 401 && status !== 200) {
      router.push(`/error/${status}`);
    }
  };

  if (data) {
    responseHandler(data.status, data.message);
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
