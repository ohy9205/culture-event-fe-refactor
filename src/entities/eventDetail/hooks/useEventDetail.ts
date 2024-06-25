import { responseHandler } from "@/src/shared/lib";
import useSWR from "swr";
import { getEventDetail } from "../api";

const useEventDetail = (eventId: number) => {
  const { data } = useSWR(
    `eventDetail/${eventId}`,
    () => getEventDetail(eventId),
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
