import {
  DetailEvent,
  SimpleEvent,
  SimpleEventListWithPagination,
} from "@/src/types/events";
import { getAccessToken } from "@/src/utils/getAccessToken";
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

  const accessToken = getAccessToken();

  // console.log(
  //   `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`
  // );

  try {
    const filteredEvents = fetch(
      `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => ({
        events: data.payload.rows,
        totalPage: data.totalPage,
      }));

    return filteredEvents;
  } catch (e) {}
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

  const accessToken = getAccessToken();

  // console.log(
  //   `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`
  // );

  try {
    const filteredEvents = fetch(
      `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}

// 상세정보
export async function getEventDetailWithLogin(
  id: number
): Promise<DetailEvent | undefined> {
  const accessToken = getAccessToken();
  let detailEvent;

  try {
    detailEvent = await fetch(`${API_V2}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => data.payload);
  } catch {}
  return detailEvent;
}

// 해당 이벤트 코멘트
export async function getComments(
  eventId: number
): Promise<Comment[] | undefined> {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_V2}/${eventId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => {
        return data.comments;
      });

    return result;
  } catch {
    console.log("에러");
  }
}

// 좋아요 토글
export async function toggleLikes(eventId: number) {
  const accessToken = getAccessToken();
  try {
    const result = fetch(`${API_V2}/${eventId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((rs) => rs.json());

    return result;
  } catch {}
}
