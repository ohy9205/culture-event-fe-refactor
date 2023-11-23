import useSWR from "swr";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const { user, loggedOut } = useUser();
  const { data, mutate, isLoading } = useSWR(`eventDetail/${eventId}`, () =>
    loggedOut
      ? getEventDetailWithoutLogin(eventId)
      : getEventDetailWithLogin(eventId)
  );

  return {
    eventDetail: data,
    mutate,
    isLoading,
    loginUser: user,
  };
};

export default useEventDetail;
