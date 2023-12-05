import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getEventDetailWithoutLogin } from "../apis/event/v1";
import { getEventDetailWithLogin } from "../apis/event/v2";
import useUser from "./useUser";

const useEventDetail = (eventId: number) => {
  const router = useRouter();
  const { loggedOut } = useUser();
  const { data, isLoading } = useSWR(`eventDetail/${eventId}`, () =>
    loggedOut
      ? getEventDetailWithoutLogin(eventId)
      : getEventDetailWithLogin(eventId)
  );

  const responseHandler = (status: number, message: string) => {
    if (data?.status === 403) {
      alert(data.message);
    } else if (data?.status !== 200) {
      router.push(`/error/${data?.status}`);
    }
  };

  if (data) {
    responseHandler(data.status, data.message);
  }

  return {
    eventDetail: data?.payload.event,
    isLoading,
  };
};

export default useEventDetail;
