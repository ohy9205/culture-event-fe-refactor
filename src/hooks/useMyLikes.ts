import useSWR from "swr";
import { getMyLikes } from "../apis/user/user";

export const useMyLikes = (eventId: number) => {
  const { data, mutate } = useSWR(`likesEvent`, getMyLikes);

  const isMyLikes = data?.find((event: any) => event.id === eventId);

  return {
    isMyLikes: isMyLikes ? true : false,
    mutate,
  };
};

export default useMyLikes;
