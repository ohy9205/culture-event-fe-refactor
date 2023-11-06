import { Event } from "../types/events";

// 전체
export async function getAllEvents() {}

// 최신순
export async function getRecentEvents(): Promise<Event[] | undefined> {
  try {
    const recentEvents = fetch(
      "http://127.0.0.1:3030/v1/events?latest=today&pageIndex=1&pageSize=10"
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
      "http://127.0.0.1:3030/v1/events?orderBy=views&pageIndex=1&pageSize=7"
    )
      .then((rs) => rs.json())
      .then((data) => {
        return data.payload.rows;
      });
    return hotEvents;
  } catch (e) {}
}

type Props = {
  filters: {
    location: string;
    category: string;
    cost: string;
    startDate: string;
    endDate: string;
  };
};

// 필터링

export async function getFilteredEvents(
  location?: string,
  category?: string,
  cost?: string,
  startDate?: string,
  endDate?: string
): Promise<Event[] | undefined> {
  const locationQuery =
    location && (location === "지역구" ? "" : `location=${location}&`);
  const categoryQuery =
    category && (category === "카테고리" ? "" : `category=${category}&`);
  const costQuery = cost && (cost === "비용" ? "" : `isfree=${cost}&`);
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}`;

  console.log(
    `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}`
  );

  try {
    const filteredEvents = fetch(
      `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}`
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}
