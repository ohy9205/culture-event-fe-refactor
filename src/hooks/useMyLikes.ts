import { useState } from "react";
import useSWR from "swr";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { toggleLikes } from "../apis/event/v2";
import { getMyLikes } from "../apis/user/user";
import useUser from "./useUser";

export const useMyLikes = (eventId: number, likesCount?: number) => {
  const { loggedOut } = useUser();
  const { data, mutate } = useSWR(`likesEvent`, getMyLikes);
  const [count, setCount] = useState(likesCount);

  if (data) {
    responseHandler(data, {});
  }

  // 가능한 백엔드 api로 처리할것
  const isMyLikes = data?.payload?.data?.find(
    (event: any) => event.id === eventId
  )
    ? true
    : false;

  const onToggleLikesHandler = async () => {
    if (loggedOut) {
      return;
    }
    const rs = await toggleLikes(eventId);

    if (rs) {
      const handler = {
        success: () => {
          mutate();
          setCount(rs.payload.eventLikesCount);
        },
      };
      responseHandler(rs, handler);
    }
  };

  return {
    isMyLikes: isMyLikes,
    count,
    onToggleLikesHandler,
  };
};

export default useMyLikes;
