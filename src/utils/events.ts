import { Event, EventThumbnail } from "../types/events";

// 전체
export async function getAllEvents() {}

// 최신순
export async function getRecentEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const recentEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?latest=today&pageIndex=1&pageSize=10",
      { cache: "no-store" }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return recentEvents;
  } catch (e) {}
}

//인기순
export async function getHotEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const hotEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?orderBy=views&pageIndex=1&pageSize=7",
      { cache: "no-store" }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows)
      .then((rows) =>
        rows.map((event: Event) => ({
          thumbnail: event.thumbnail,
          id: event.id,
          title: event.title,
        }))
      );

    return hotEvents;
  } catch (e) {}
}

// 상세정보
export async function getEventDetail(id: string): Promise<Event | undefined> {
  try {
    const detailEvent = fetch(
      `https://web-production-d139.up.railway.app/v1/events/${id}`
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return detailEvent;
  } catch (e) {}
}

// 필터링
export async function getFilteredEvents(
  location?: string,
  category?: string,
  cost?: string,
  startDate?: string,
  endDate?: string,
  orderBy?: string
): Promise<Event[] | undefined> {
  const locationQuery =
    location && (location === "지역구" ? "" : `location=${location}&`);
  const categoryQuery =
    category && (category === "카테고리" ? "" : `category=${category}&`);
  const costQuery = cost && (cost === "비용" ? "" : `isfree=${cost}&`);
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}`;

  console.log(
    `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`
  );

  try {
    const filteredEvents = fetch(
      `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`,
      { cache: "no-store" }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}
