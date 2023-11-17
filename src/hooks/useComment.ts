import useSWR from "swr";
import { getComments } from "../utils/events";
import useUser from "./useUser";

const useComment = (eventId: number) => {
  const { user } = useUser();

  const { data, mutate, isLoading } = useSWR(`eventComment/${eventId}`, () =>
    getComments(eventId)
  );

  const newCommentData = data?.map((comment) => ({
    ...comment,
    isMyComment: comment.commenter === user.id,
  }));

  return {
    eventComments: newCommentData,
    mutate,
    isLoading,
  };
};

export default useComment;
