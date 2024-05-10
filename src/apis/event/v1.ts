import {
  APIResponse,
  EventDetailPayload,
  MainEventsPayload,
} from "@/src/shared/types/APIResponse";
import { Event, EventThumbnail } from "@/src/shared/types/events";
import { API_V1 } from "@/src/utils/data/apiUrl";
import Fetch from "@/src/utils/fetch/Fetch";

const url = API_V1;

// 최신순
export const getRecentEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
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
};

//인기순
export const getHotEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
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
};

//조회순
export const getViewEvents = async (): Promise<
  APIResponse<EventThumbnail[]>
> => {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(21600);
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
};

// 상세정보
export const getEventDetailWithoutLogin = async (
  id: number
): Promise<APIResponse<EventDetailPayload>> => {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching<EventDetailPayload>(`${url}/${id}`);

  return rs;
};
