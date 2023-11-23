import { DetailEvent, Event, EventThumbnail } from "@/src/types/events";
import { API_V1 } from "../common/url";

// 최신순
export async function getRecentEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const recentEvents = fetch(`${API_V1}/latest`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return recentEvents;
  } catch (e) {}
}

//인기순
export async function getHotEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const hotEvents = fetch(`${API_V1}/likes`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => {
        return data.payload.rows;
      })
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

//조회순
export async function getViewEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const viewEvents = fetch(`${API_V1}/views`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => {
        return data.payload.rows;
      })
      .then((rows) =>
        rows.map((event: Event) => ({
          thumbnail: event.thumbnail,
          id: event.id,
          title: event.title,
        }))
      );

    return viewEvents;
  } catch (e) {}
}

// 상세정보
export async function getEventDetailWithoutLogin(
  id: number
): Promise<DetailEvent | undefined> {
  try {
    const detailEvent = fetch(`${API_V1}/${id}`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return detailEvent;
  } catch {}
}
