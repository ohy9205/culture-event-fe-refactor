import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { toggleLikes } from "../apis/event/v2";
import { getMyLikes } from "../apis/user/user";
import useUser from "./useUser";

export const useMyLikes = (eventId: number, likesCount?: number) => {
  const router = useRouter();
  const { loggedOut } = useUser();
  const { data, mutate } = useSWR(`likesEvent`, getMyLikes);
  const [count, setCount] = useState(likesCount);

  // response 핸들러
  const responseHandler = (status: number, message: string) => {
    if (status === 403) {
      alert(message);
    } else if (status !== 200 && status !== 401) {
      router.push(`/error/${status}`);
    }
  };

  if (data) {
    responseHandler(data.status, data.message);
  }

  const isMyLikes = data?.payload?.data?.find(
    (event: any) => event.id === eventId
  )
    ? true
    : false;

  const onToggleLikesHandler = async () => {
    if (loggedOut) {
      return;
    }
    const count = await toggleLikes(eventId);
    setCount(count.payload.eventLikesCount);
    mutate();
  };

  return {
    isMyLikes: isMyLikes,
    count,
    onToggleLikesHandler,
  };
};

export default useMyLikes;
