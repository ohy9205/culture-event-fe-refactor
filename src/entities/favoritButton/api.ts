import {
  APIResponse,
  ToggleLikesPayload,
} from "@/src/shared/types/APIResponse";
import { API_V2 } from "@/src/shared/utils/data/apiUrl";
import Fetch from "@/src/shared/utils/fetch/Fetch";

const url = API_V2;

// 좋아요 토글
export const toggleLikes = async (
  eventId: number
): Promise<APIResponse<ToggleLikesPayload>> => {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching<ToggleLikesPayload>(
    `${url}/${eventId}/likes`
  );

  return rs;
};
