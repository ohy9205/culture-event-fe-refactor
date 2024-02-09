import { APIResponse } from "@/src/types/APIResponse";
import { Event } from "@/src/types/events";
import { API_V1 } from "@/src/utils/data/apiUrl";
import { Fetch } from "@/src/utils/fetch/fetchAdapter";

const url = API_V1;

// 최신순
export async function getRecentEvents(): Promise<APIResponse> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  apiFetch.setCache("reload");
  const rs = await apiFetch.fetching(`${url}/latest`);
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
export async function getHotEvents(): Promise<APIResponse> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  apiFetch.setCache("reload");
  const rs = await apiFetch.fetching(`${url}/likes`);
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
export async function getViewEvents(): Promise<APIResponse> {
  const apiFetch = new Fetch();
  apiFetch.setRevalidate(36000);
  apiFetch.setCache("reload");
  const rs = await apiFetch.fetching(`${url}/views`);
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
): Promise<APIResponse> {
  const apiFetch = new Fetch();
  const rs = await apiFetch.fetching(`${url}/${id}`);

  return rs;
}
