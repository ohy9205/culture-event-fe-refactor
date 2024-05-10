import useSWR from "swr";
import { getEventDetailWithoutLogin } from "../../apis/event/v1";
import { getEventDetailWithLogin } from "../../apis/event/v2";
import responseHandler from "../../utils/common/responseHandler";
import useAuth from "./useAuth";

const useEventDetail = (eventId: number) => {
  const {
    data: { isLoggedIn },
  } = useAuth();
  const { data } = useSWR(
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
    data: {
      eventDetail: data?.payload.event,
    },
  };
};

export default useEventDetail;
