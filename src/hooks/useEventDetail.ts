import { useEffect } from "react";
import useSWR from "swr";
import { responseHandler } from "../apis/common/responseHandler";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import { useAuthContext } from "../context/AuthContext";
import { useLikesContext } from "../context/LikesContext";

const useEventDetail = (eventId: number) => {
  const { state } = useAuthContext();
  const { fetching } = useLikesContext();
  const { data } = useSWR(
    `eventDetail/${eventId}`,
    () =>
      state.isLoggedIn
        ? getEventDetailWithLogin(eventId)
        : getEventDetailWithoutLogin(eventId),
    { revalidateOnFocus: false }
  );

  if (data) {
    responseHandler(data, {});
  }

  useEffect(() => {
    const mutate = async () => {
      await fetching();
    };
  }, []);

  return {
    data: {
      eventDetail: data?.payload.event,
    },
  };
};

export default useEventDetail;
