import {
  APIResponse,
  ToggleLikesPayload,
  UserLikesPayload,
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

// 유저가 좋아하는 이벤트 목록
export const getMyLikes = async (
  cookie?: Record<string, any>
): Promise<APIResponse<UserLikesPayload>> => {
  const apiFetch = new Fetch(cookie);
  const rs = await apiFetch.fetching<UserLikesPayload>(`${url}/liked-events`);

  return rs;
};
