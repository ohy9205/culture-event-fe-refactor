import {
  APIResponse,
  EventDetailPayload,
} from "@/src/shared/types/APIResponse";
import { API_V1 } from "@/src/shared/utils/data/apiUrl";
import Fetch from "@/src/shared/utils/fetch/Fetch";

const url = API_V1;

// 상세정보
export const getEventDetail = async (
  id: number
): Promise<APIResponse<EventDetailPayload>> => {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventDetailPayload>(`${url}/${id}`);

  return rs;
};
