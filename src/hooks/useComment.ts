import useSWR from "swr";
import { getComments } from "../utils/events";
import useUser from "./useUser";

const useComment = (eventId: number) => {
  const { user } = useUser();

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
