import useSWR from "swr";
import { getEventDetail } from "../utils/events";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const { user, loggedOut } = useUser();
  const { data, mutate, isLoading } = useSWR(`eventDetail/${eventId}`, () =>
    getEventDetail(eventId, loggedOut)
  );

  return {
    eventDetail: data,
    mutate,
    isLoading,
    loginUser: user,
  };
};

export default useEventDetail;
