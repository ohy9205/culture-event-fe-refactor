import { Event } from "../types/events";

// 전체
export async function getAllEvents() {}

// 최신순
export async function getRecentEvents(): Promise<Event[] | undefined> {
  try {
    const recentEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?latest=today&pageIndex=1&pageSize=10"
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return recentEvents;
  } catch (e) {}
}

//인기순
export async function getHotEvents(): Promise<Event[] | undefined> {
  try {
    const hotEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?orderBy=views&pageIndex=1&pageSize=7"
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return hotEvents;
  } catch (e) {}
}

// 필터링
export async function getFilteredEvents(
  location?: string,
  category?: string,
  cost?: string,
  startDate?: string,
  endDate?: string
): Promise<Event[] | undefined> {
  console.log(category, cost, location, startDate, endDate);
  try {
    const filteredEvents = fetch(
      `https://web-production-d139.up.railway.app/v1/events?
      ${category ? `category=${category}&` : ""}
      ${cost ? `isFree=${cost}&` : ""}
      ${location ? `location=${location}&` : ""}
      ${startDate ? `start=${startDate}&` : ""}
      ${endDate ? `end=${endDate}&` : ""}
      `,
      {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}
