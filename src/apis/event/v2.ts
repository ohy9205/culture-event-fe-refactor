import {
  APIResponse,
  EventCommentsPayload,
  EventDetailPayload,
  FilteredEventsPayload,
  ToggleLikesPayload,
} from "@/src/types/APIResponse";
import { SimpleEvent } from "@/src/types/events";

import { objectToQueryString } from "@/src/utils/common/objectController";
import { API_V2 } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_V2;
const PAGE_SIZE = 12;
//  필터링
export async function getFilteredEvents(
  queryObj: Record<string, any>,
  cookie?: Record<string, any>
): Promise<APIResponse<{ events: SimpleEvent[]; totalPage: number }>> {
  const apiFetch = new Fetch(cookie);

  const rs = await apiFetch.fetching<FilteredEventsPayload>(
    `${url}?${objectToQueryString(queryObj, "&")}&pageSize=${PAGE_SIZE}`
  );

  const payload = {
    events: rs.payload.events.rows,
    totalPage: rs.payload.totalPage,
  };

  return {
    ...rs,
    payload,
  };
}

// 상세정보
export async function getEventDetailWithLogin(
  id: number
): Promise<APIResponse<EventDetailPayload>> {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventDetailPayload>(`${url}/${id}`);

  return rs;
}

// 해당 이벤트 코멘트
export async function getComments(
  eventId: number
): Promise<APIResponse<EventCommentsPayload>> {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventCommentsPayload>(
    `${url}/${eventId}/comments`
  );

  console.log(rs);

  return rs;
}

// 좋아요 토글
export async function toggleLikes(
  eventId: number
): Promise<APIResponse<ToggleLikesPayload>> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching<ToggleLikesPayload>(
    `${url}/${eventId}/likes`
  );

  return rs;
}
