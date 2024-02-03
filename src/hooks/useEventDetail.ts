import useSWR from "swr";
import { responseHandler } from "../apis/common/responseHandler";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import { useAuthContext } from "../context/AuthContext";

const useEventDetail = (eventId: number) => {
  const { state } = useAuthContext();
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

  return {
    data: {
      eventDetail: data?.payload.event,
    },
  };
};

export default useEventDetail;
