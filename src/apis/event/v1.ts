import { APIResponse } from "@/src/types/APIResponse";
import { Event } from "@/src/types/events";
import { FetchAdapter } from "../common/FetchAdapter";
import { API_V1 } from "../common/url";

// 최신순
export async function getRecentEvents(): Promise<APIResponse> {
  const url = `${API_V1}/latest`;

  const apiFetch = new FetchAdapter();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching(url);
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
  const url = `${API_V1}/likes`;

  const apiFetch = new FetchAdapter();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching(url);
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
  const url = `${API_V1}/views`;

  const apiFetch = new FetchAdapter();
  apiFetch.setRevalidate(36000);
  const rs = await apiFetch.fetching(url);
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
  const url = `${API_V1}/${id}`;

  const apiFetch = new FetchAdapter();
  apiFetch.setCache("no-store");
  const rs = await apiFetch.fetching(url);

  return rs;
}
