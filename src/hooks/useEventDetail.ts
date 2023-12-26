import useSWR from "swr";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const { loggedOut } = useUser();
  const { data, isLoading } = useSWR(
    `eventDetail/${eventId}`,
    () =>
      loggedOut
        ? getEventDetailWithoutLogin(eventId)
        : getEventDetailWithLogin(eventId),
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
