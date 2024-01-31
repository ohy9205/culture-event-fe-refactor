import { APIResponse } from "@/src/types/APIResponse";

import { objectToQueryString } from "@/src/utils/objectController/objectController";
import { FetchAdapter } from "../common/FetchAdapter";
import { API_V2 } from "../common/url";

//  필터링
export async function getFilteredEvents(
  queryObj: Record<string, any>,
  cookie?: Record<string, any>
): Promise<APIResponse> {
  const url = `${API_V2}?${objectToQueryString(queryObj, "&")}&pageSize=12`;
  const apiFetch = new FetchAdapter();

  if (cookie) {
    apiFetch.setCookie(cookie);
  }

  const rs = await apiFetch.fetching(url);
  const payload = queryObj.pageIndex
    ? {
        events: rs.payload.events.rows,
        totalPage: rs.payload.totalPage,
      }
    : rs.payload;

  return {
    ...rs,
    payload,
  };
}

// 상세정보
export async function getEventDetailWithLogin(
  id: number
): Promise<APIResponse> {
  const url = `${API_V2}/${id}`;
  const apiFetch = new FetchAdapter();
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 해당 이벤트 코멘트
export async function getComments(eventId: number): Promise<APIResponse> {
  const url = `${API_V2}/${eventId}/comments`;

  const apiFetch = new FetchAdapter();
  const rs = await apiFetch.fetching(url);

  return rs;
}

// 좋아요 토글
export async function toggleLikes(eventId: number): Promise<APIResponse> {
  const url = `${API_V2}/${eventId}/likes`;

  const apiFetch = new FetchAdapter();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching(url);

  return rs;
}
