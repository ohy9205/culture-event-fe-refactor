import { APIResponse } from "@/src/types/APIResponse";
import { objectToQueryString } from "@/src/utils/objectToQueryString/objectToQueryString";
import {
  authorizedAPIFetch,
  authorizedAPIFetchFromServer,
} from "../common/commonAPIFetch";
import { API_V2 } from "../common/url";

//  필터링
export async function getFilteredEvents(
  queryObj: Record<string, any>,
  at?: string,
  rt?: string
): Promise<APIResponse> {
  const url = `${API_V2}?${objectToQueryString(queryObj)}&pageSize=12`;
  const rs = await authorizedAPIFetchFromServer(url, "GET", at, rt);
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
  // ): Promise<DetailEvent | undefined> {
  const url = `${API_V2}/${id}`;
  const rs = await authorizedAPIFetch(url, "GET");

  return rs;
}

// 해당 이벤트 코멘트
export async function getComments(eventId: number): Promise<APIResponse> {
  const url = `${API_V2}/${eventId}/comments`;

  const rs = await authorizedAPIFetch(url, "GET");

  // return rs.payload.comments;
  return rs;
}

// 좋아요 토글
export async function toggleLikes(eventId: number): Promise<APIResponse> {
  const url = `${API_V2}/${eventId}/likes`;
  const rs = await authorizedAPIFetch(url, "POST");

  return rs;
}
