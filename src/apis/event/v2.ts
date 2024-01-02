import { Filter } from "@/src/context/FilterContext";
import { APIResponse } from "@/src/types/APIResponse";
import { authorizedAPIFetch } from "../common/commonAPIFetch";
import { API_V2 } from "../common/url";

// 필터링
export async function getFilteredEvents(
  filter: Filter,
  pagination?: { pageIndex: number; pageSize: number }
): Promise<APIResponse> {
  const { location, category, cost, startDate, endDate, orderBy, keyword } =
    filter;
  const locationQuery = location && `location=${location}&`;
  const categoryQuery = category && `category=${category}&`;
  const costQuery = cost && `isfree=${cost}&`;
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}&`;
  const keywordQuery = keyword && `keyword=${keyword}&`;
  const pageIndexQuery = pagination && `pageIndex=${pagination.pageIndex + 1}&`;
  const pageSizeQuery = pagination && `pageSize=${pagination.pageSize}`;
  const url = `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${keywordQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`;

  const rs = await authorizedAPIFetch(url, "GET");
  const payload = pagination
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
