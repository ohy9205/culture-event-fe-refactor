import useSWR from "swr";
import useUser from "./useUser";
import { getComments } from "../utils/events";

const useComment = (eventId: number) => {
  const { user, loggedOut } = useUser();
  const { data, mutate, isLoading } = useSWR(`eventComment/${eventId}`, () =>
    getComments(eventId)
  );

  const isMyComment = data?.find((comment) => comment.User.email === user.email)
    ? true
    : false;

  return {
    eventComments: data,
    mutate,
    isLoading,
    isMyComment,
  };
};

export default useComment;
