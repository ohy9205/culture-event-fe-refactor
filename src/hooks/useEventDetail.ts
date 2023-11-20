import useSWR from "swr";
import { getEventDetail } from "../utils/events";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const { user, loggedOut } = useUser();
  const { data, mutate, isLoading } = useSWR(`eventDetail/${eventId}`, () =>
    getEventDetail(eventId, loggedOut)
  );

  const isMyLikes = data?.Users.find(
    (likesUser) => likesUser.email === user.email
  )
    ? true
    : false;

  return {
    eventDetail: data,
    mutate,
    isLoading,
    isMyLikes,
  };
};

export default useEventDetail;
