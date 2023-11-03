import { Event } from "../types/events";

// 전체
export async function getAllEvents() {}

// 최신순
export async function getRecentEvents() {}

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
export async function getFilteredEvents() {}
