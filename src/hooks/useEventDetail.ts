import useSWR from "swr";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const { loggedOut } = useUser();
  const { data, isLoading } = useSWR(`eventDetail/${eventId}`, () =>
    loggedOut
      ? getEventDetailWithoutLogin(eventId)
      : getEventDetailWithLogin(eventId)
  );

  return {
    eventDetail: data,
    isLoading,
  };
};

export default useEventDetail;
