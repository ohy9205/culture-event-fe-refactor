import {
  APIResponse,
  EventDetailPayload,
  MainEventsPayload,
} from "@/src/types/APIResponse";
import { Event, EventThumbnail } from "@/src/types/events";
import { API_V1 } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_V1;

// 최신순
export async function getRecentEvents(): Promise<
  APIResponse<EventThumbnail[]>
> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${url}/latest`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

//인기순
export async function getHotEvents(): Promise<APIResponse<EventThumbnail[]>> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${url}/likes`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

//조회순
export async function getViewEvents(): Promise<APIResponse<EventThumbnail[]>> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching<MainEventsPayload>(`${url}/views`);
  const data = rs?.payload.events.rows.map((event: Event) => ({
    thumbnail: event.thumbnail,
    id: event.id,
    title: event.title,
  }));

  return {
    ...rs,
    payload: data,
  };
}

// 상세정보
export async function getEventDetailWithoutLogin(
  id: number
): Promise<APIResponse<EventDetailPayload>> {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventDetailPayload>(`${url}/${id}`);

  return rs;
}
