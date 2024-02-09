import { APIResponse } from "@/src/types/APIResponse";

import { objectToQueryString } from "@/src/utils/common/objectController";
import { API_V2 } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_V2;
//  필터링
export async function getFilteredEvents(
  queryObj: Record<string, any>,
  cookie?: Record<string, any>
): Promise<APIResponse> {
  const apiFetch = new Fetch(cookie);

  const rs = await apiFetch.fetching(
    `${url}?${objectToQueryString(queryObj, "&")}&pageSize=12`
  );

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
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching(`${url}/${id}`);

  return rs;
}

// 해당 이벤트 코멘트
export async function getComments(eventId: number): Promise<APIResponse> {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching(`${url}/${eventId}/comments`);

  return rs;
}

// 좋아요 토글
export async function toggleLikes(eventId: number): Promise<APIResponse> {
  const apiFetch = new Fetch();
  apiFetch.setMethod("POST");
  const rs = await apiFetch.fetching(`${url}/${eventId}/likes`);

  return rs;
}
