import {
  Comment,
  DetailEvent,
  SimpleEvent,
  SimpleEventListWithPagination,
} from "@/src/types/events";
import { authorizedAPIFetch } from "../common/commonAPIFetch";
import { API_V2 } from "../common/url";

// 필터링-페이지네이션
export async function getFilteredEvents(
  location: string,
  category: string,
  cost: string,
  startDate: string,
  endDate: string,
  orderBy: string,
  pageIndex: number,
  pageSize: number
): Promise<SimpleEventListWithPagination | undefined> {
  const locationQuery = location && `location=${location}&`;
  const categoryQuery = category && `category=${category}&`;
  const costQuery = cost && `isfree=${cost}&`;
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}&`;
  const pageIndexQuery = `pageIndex=${pageIndex + 1}&`;
  const pageSizeQuery = `pageSize=${pageSize}`;
  const url = `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`;

  const rs = await authorizedAPIFetch(url, "GET");
  const payload = rs.payload;

  return {
    events: payload.events.rows,
    totalPage: payload.totalPage,
  };
}

// 필터링-전체
export async function getFilteredEventsWithoutPagination(
  location: string,
  category: string,
  cost: string,
  startDate: string,
  endDate: string,
  orderBy: string
): Promise<SimpleEvent[] | undefined> {
  const locationQuery = location && `location=${location}&`;
  const categoryQuery = category && `category=${category}&`;
  const costQuery = cost && `isfree=${cost}&`;
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}`;
  const url = `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`;

  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.events;
}

// 상세정보
export async function getEventDetailWithLogin(
  id: number
): Promise<DetailEvent | undefined> {
  const url = `${API_V2}/${id}`;
  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.event;
}

// 해당 이벤트 코멘트
export async function getComments(
  eventId: number
): Promise<Comment[] | undefined> {
  const url = `${API_V2}/${eventId}/comments`;

  const rs = await authorizedAPIFetch(url, "GET");

  return rs.payload.comments;
}

// 좋아요 토글
export async function toggleLikes(eventId: number) {
  const url = `${API_V2}/${eventId}/likes`;
  const rs = await authorizedAPIFetch(url, "POST");

  return rs.payload.eventLikesCount;
}
