import { DetailEvent, Event, EventThumbnail } from "@/src/types/events";
import { APIFetch } from "../common/commonAPIFetch";
import { API_V1 } from "../common/url";

// 최신순
export async function getRecentEvents(): Promise<EventThumbnail[] | undefined> {
  const url = `${API_V1}/latest`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows;

  return data.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));
}

//인기순
export async function getHotEvents(): Promise<EventThumbnail[] | undefined> {
  const url = `${API_V1}/likes`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows;

  return data.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));
}

//조회순
export async function getViewEvents(): Promise<EventThumbnail[] | undefined> {
  const url = `${API_V1}/views`;
  const rs = await APIFetch(url, "GET");
  const data = rs?.payload.events.rows;

  return data.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));
}

// 상세정보
export async function getEventDetailWithoutLogin(
  id: number
): Promise<DetailEvent | undefined> {
  const url = `${API_V1}/${id}`;
  const rs = await APIFetch(url, "GET");

  return rs.payload.event;
}
