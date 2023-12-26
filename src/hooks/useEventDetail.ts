import useSWR from "swr";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import { useAuthContext } from "../context/AuthContext";

const useEventDetail = (eventId: number) => {
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const { data, isLoading } = useSWR(
    `eventDetail/${eventId}`,
    () =>
      isLoggedIn
        ? getEventDetailWithLogin(eventId)
        : getEventDetailWithoutLogin(eventId),
    { revalidateOnFocus: false }
  );

  if (data) {
    responseHandler(data, {});
  }

  return {
    eventDetail: data?.payload.event,
    isLoading,
  };
};

export default useEventDetail;
