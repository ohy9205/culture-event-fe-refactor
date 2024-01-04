import { useState } from "react";
import { responseHandler } from "../apis/common/responseHandler";
import { toggleLikes } from "../apis/event/v2";
import { useAuthContext } from "../context/AuthContext";

export const useLikes = (eventId: number, likesCount?: number) => {
  // event관련된 likes정보를 가져옴, toggle도 가능
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const [count, setCount] = useState(likesCount);

  return {
    get: () => ({
      count,
    }),
    toggle: async () => {
      if (isLoggedIn === undefined || !isLoggedIn) {
        return;
      }

      const rs = await toggleLikes(eventId);

      if (rs) {
        const handler = {
          success: () => {
            setCount(rs.payload.eventLikesCount);
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useLikes;
