import { API_V1 } from "@/src/shared/consts";
import { Fetch } from "@/src/shared/fetch";
import { APIResponse } from "@/src/shared/types";
import { DetailEvent } from "../eventList/types";

type EventDetailPayload = {
  event: DetailEvent;
};

const url = API_V1;

// 상세정보
export const getEventDetail = async (
  id: number
): Promise<APIResponse<EventDetailPayload>> => {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventDetailPayload>(`${url}/${id}`);

  return rs;
};
